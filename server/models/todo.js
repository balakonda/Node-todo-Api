var mongoose = require('mongoose');
var Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		trim: true,
		minlength: 5
	},
	completed: {
		type: Boolean,
		default: true
	},
	completedAt: {
		type: Number,
		default: null
	}
});

module.exports = {Todo};