const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		minlength: 1,
		trim: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not valid email address'
		}
	},
	password: {
		type: String,
		minlength: 6,
		required: true
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

UserSchema.methods.toJSON = function() {
	var user = this;
	var UserObject = user.toObject();

	return _.pick(UserObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

	user.tokens.push({access, token});
	console.log('generateAuthToken');
	console.log(user);
	//user.email = 'asdasd@gmail.com';
	return user.save().then((res) => {
		return token;
	});
}

UserSchema.statics.findByToken = function (token) {
	var User = this;
	var decoded;
	try {
		decoded = jwt.verify(token, 'abc123');
	} catch (e) {
		console.log(e);
		// return new Promise((resolve, reject) => {
		// 	reject(e);
		// });
		return Promise.reject(e);
	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
};

//mongoose middleware
UserSchema.pre('save', function(next) {
		var user = this;

		if(user.isModified('password')) {
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(user.password, salt, (err, hash) => {
					user.password = hash;
					next();
				});
			});
		} else {
			next();
		}
});
var User = mongoose.model('User', UserSchema);

module.exports = { User };
