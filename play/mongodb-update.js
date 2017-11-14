const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err) {
		return console.log('Error');
	}
	db.collection('Todos').findOneAndUpdate({
		id: 4
	}, {
		$set: {
			text1: 'newThing1'
		},
		$inc: {
			id: 3
		}
	}, {
		returnOriginal: false
	}).then((res) => {
		console.log(res);
	}, (err) => {

	});
	db.close();
});