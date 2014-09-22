var mongoose = require('mongoose');
var passport = require('passport');
exports.users = require('../controllers/users');
exports.User = mongoose.model('User');
exports.posts = require('../controllers/posts');
exports.Post = mongoose.model('Post');
