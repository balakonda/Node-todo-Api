const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var data = {
	id: 4
};
// var token = jwt.sign(data, '123String');
// var decoded = jwt.verify(token, '123Strin');
// console.log(decoded);

var password = 'password!';

// bcrypt.genSalt(2, (err, salt) => {
// 	bcrypt.hash(password, salt, (err, hash) => {
// 		console.log(hash);
// 	});
// });

var hashpwd = '$2a$04$bdrOrv4p/NgJbMZYIRMSpusSWyo3AsBNGcoWgxr43rOnP3szx.CjO';

bcrypt.compare(password, hashpwd, (err, res) => {
	if(res) {
		console.log(res);
	}
});
//jwt.verify()
//jwt.sign()

// var text = "Hi This is Balakonda";
// var hash = SHA256(text).toString();

// console.log(hash);

// var data = {
// 	id: 4
// };

// var token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data)+ 'somesecret').toString()
// };

// var resultHash = SHA256(JSON.stringify(data)+ 'somesecret').toString();
// console.log(resultHash);
// if(token.hash === resultHash) {
// 	console.log('No change');
// } else {
// 	console.log('Data Corrupted');
// }
