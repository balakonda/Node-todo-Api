require('./config/config.js');
const _ = require('lodash');
var mongoose = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate');

var express = require('express');
var bodyParser = require('body-parser');
var { ObjectId } = require('mongodb');


var app = express();

var PORT = process.env.PORT;

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
	
});

app.delete('/todos/:id', (req, res) => {
	if(ObjectId.isValid(req.params.id)) {
		Todo.findByIdAndRemove(req.params.id).then((todo) => {
			if(todo) {
				res.send({todo});
			} else {
				res.status(400).send({message: 'Invalid Object'});
			}
		}).catch((e) => res.status(400).send(e));
	} else {
		res.status(404).send();
	}
});

app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

	if(_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	if(!ObjectId.isValid(id)) {
		return res.status(400).send({message: 'Invalid Object'});
	}


	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if(todo) {
			res.send({todo});
		} else {
			res.status(400).send({message: 'Invalid Object'});
		}
	}).catch((e) => res.status(404).send(e));
	
});


//Users
app.post('/users', (req, res) => {
	//console.log(req.body);
	var body = _.pick(req.body, ['email', 'password']);
	var user = new User(body);
	//console.log(user);
	// user.save().then((doc) => {
	// 	console.log(doc)
	// 	res.send(doc);
	// }, (e) => {
	// 	res.status(400).send(e);
	// });
	user.save().then((res) => {
		console.log(res);
		return user.generateAuthToken();
	}).then((token) => {
		console.log('token');
		console.log(res);
		res.header('x-auth', token).send(user);
	}).catch((e) => {
		res.status(400).send(e);
	});
});

app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});

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
