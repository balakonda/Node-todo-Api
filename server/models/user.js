const mongoose = require('mongoose');
const validator = require('validator');


var User = mongoose.model('User', {
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