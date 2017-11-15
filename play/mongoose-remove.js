const {ObjectID} = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');

//Todo.remove({}); //removes entire collection
//Todo.findOneAndRemove
//Todo.findByIdAndRemove
// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

Todo.findByIdAndRemove('5a0c39aec405db54239d93e1').then((res) => {
	console.log('res' + res);
}).catch((e) => console.log(e));