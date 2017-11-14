const {ObjectID} = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');

var id = '5a0b04282d91c334295cfeff';

if(!ObjectID.isValid(id)) {
	return console.log('Invalid Id');
}
// Todo.find({
// 	_id: id
// }).then((todos) => {

// 	console.log(todos);
// });

// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	if(!todo) {
// 		return console.log('Id not found');
// 	}
// 	console.log(todo);
// });

Todo.findById(id).then((todo) => {
	if(!todo) {
		return console.log('Id not found');
	}
	console.log(todo);
}).catch((e) => console.log(e));