import User from '../models/user.model';

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  // const user = new User({
  //   username: req.body.username,
  //   mobileNumber: req.body.mobileNumber
  // });

  // user.save()
  //   .then(savedUser => res.json(savedUser))
  //   .catch(e => next(e));

  console.log(req.body);

  var new_user = new User({
    name: req.body.name,
    email: req.body.email
  });

  new_user.password = new_user.generateHash(req.body.password);
  new_user.save(function(err){
    if(err){
        res.json({ status:false, message: err });
    }else{
        res.json({ status:true, message: 'User created!' });
    }
  });

}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const user = req.user;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

function login(req, res){

  User.findOne({'email': req.body.email}, function(err, user) {
    if(!err){
      if(user != null){
        if (user.validPassword(req.body.password)) {
          res.json({ status: true, message: 'success', data: user })
        } else {
          res.json({ status: false, message: 'Email and password not matched'})
        }
      }else{
        res.json({ status: false, message: 'Email and password not matched'})
      }
    }
  });

}

export default { load, get, create, update, list, remove, login };
