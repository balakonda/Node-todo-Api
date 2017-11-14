const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err) {
		return console.log('Unable to connect');
	}
	console.log('Connected');
	var collection = db.collection('Todos');
	//console.log(collection);
	collection.find({age: 34}).toArray().then((docs) => {
		console.log('Todos');
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log('Unable to fetch' + err);
	});

	//db.close();
});