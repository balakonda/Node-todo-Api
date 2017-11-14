//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err) {
		return console.log('Unable to connect' + JSON.stringify(err));
	}
	console.log('Successfully Connected');

	db.collection('Todos').insertOne({
		text: 'Something 2',
		id: 2,
		age: 34,
		name: 'Myself'
	}, (err, result) => {
		if(err) {
			return console.log(JSON.stringify(err));
		}
		console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
	});
	db.close();
});