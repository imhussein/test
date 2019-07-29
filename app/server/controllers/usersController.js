const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const validateRegisterInput = require("../validation/regisetrInputValidation");
const gravatar = require("gravatar");

exports.registerUser = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  const { name, email, password, username } = req.body;
  if (isValid) {
    User.findOne({
      username: req.body.username
    })
      .then(user => {
        if (user) {
          errors.username = "Username Exists";
          return res.status(400).json({
            errors
          });
        }
      })
      .catch(err => {
        return res.status(400).json({
          err
        });
      });
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        if (user) {
          errors.email = "Email Exists";
          return res.status(400).json({
            errors
          });
        }
      })
      .catch(err => {
        return res.status(400).json({
          err
        });
      });
    const avatar = gravatar.url(user.email, {
      s: "200",
      r: "pg",
      d: "mm"
    });
    const newUser = {
      name,
      email,
      password,
      username,
      role: "user",
      status: "inactive",
      avatar
    };
    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        new User(newUser)
          .save()
          .then(user => {
            return res.json({
              user
            });
          })
          .catch(err => {
            return res.status(400).json({
              err
            });
          });
      });
    });
  } else {
    return res.status(400).json({
      errors
    });
  }
};
