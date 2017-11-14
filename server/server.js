var mongoose = require('./db/mongoose.js');
var { Todo } = require('./models/todo.js');

var express = require('express');
var bodyParser = require('body-parser');
var { ObjectId } = require('mongodb');

var app = express();

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


app.post('/todos', (req, res) => {
	console.log(req.body);
	var todo = new Todo({
		text: req.body.text,
		completed: req.body.completed,
		completedAt: req.body.completedAt
	});
	console.log(todo);
	todo.save().then((doc) => {
		console.log(doc)
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos', (req, res) => {
	console.log(req.body);
	Todo.find().then((todos) => {
		res.send({ todos });
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos/:id', (req, res) => {
	if(ObjectId.isValid(req.params.id)) {
		Todo.findById(req.params.id).then((todo) => {
			if(todo) {
				res.send({ todo });
			} else {
				res.status(400).send({message: 'Invalid Object'});
			}
		}).catch((e) => {
			res.status(400).send(e);
		});
	} else {
		res.status(404).send();
	}
	
})

app.listen(PORT, () => {
	console.log(`Started at ${PORT}`);
})

module.exports = { app };

// var newTodo = new Todo({
// 	text: 'New Cook1'
// });

// newTodo.save().then((res) => {
// 	console.log(res);
// }, (err) => {
// 	console.log(err);
// });
