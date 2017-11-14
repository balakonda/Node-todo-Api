const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err) {
		return console.log(err);
	}
	console.log('Connected');
	// db.collection('Todos').deleteMany({age:34}).then((res) => {
	// 	console.log(res);
	// }, (err) => {
	// 	console.log(err);
	// });
	db.collection('Todos').findOneAndDelete({id:1}).then((res) => {
		console.log(res);
	});
	db.close();
});