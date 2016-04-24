var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var User = mongoose.model('User');

exports.initApp = function(app) {
  app.get('/auth/users/:id', function(req, res, next) {
    console.log('id: '+ req.params.id);

    User.findById(ObjectId(req.params.id), '-password -salt').lean().exec(function(err, userDoc) {
      if (err) {
        res.status(500).json({message: 'Internal error.'});
        console.error(err);
        return next();
      }
      if (userDoc) {
        res.json(userDoc);
      } else {
        res.status(404).json({message: 'User not found.'});
      }
    });
  });

  app.get('/auth/users', function(req, res, next) {
    var query;
    if(req.query.userId) {
      query = {userId: req.query.userId};
    }

    if(query) {
      User.findOne(query, 'userId').lean().exec(function(err, userDoc) {
        console.log('getting user');
        if (err) {
          res.status(500).json({message: 'Internal error.'});
          console.error(err);
          return next();
        }

        if(userDoc) {
          res.json(userDoc);
        } else {
          res.status(404).json({message: 'User not found.'});

        }
      });
    } else {
      res.status(400).json({message: 'Bad request.'});
    }
  });

  app.post('/auth/users', function(req, res, next) {
    console.log(req.body);
    var user = new User(req.body);

    user.save(function(err) {
      if(err) {
        res.status(400).json(err);
      } else {
        res.status(200).json({message: 'Ok.'});
      }
    });
  });
};
