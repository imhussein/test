const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validateLoginInput = require("../validation/loginInputValidation");
const bcryptjs = require("bcryptjs");
const { secretOrKey } = require("../config/default.json");

exports.loginUser = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  const { email, password } = req.body;
  if (isValid) {
    User.findOne({
      email
    })
      .then(user => {
        if (!user) {
          errors.nouser = "User Not Found";
          return res.status(400).json({
            errors
          });
        } else {
          bcryptjs
            .compare(password, user.password)
            .then(isMatch => {
              if (isMatch) {
                const payload = {
                  name: user.name,
                  email: user.email,
                  avatar: user.avatar,
                  username: user.username,
                  status: user.status,
                  role: user.role
                };
                jwt.sign(
                  payload,
                  secretOrKey,
                  { expiresIn: 3600 * 24 * 7 },
                  (err, token) => {
                    return res.status(200).json({
                      success: true,
                      token
                    });
                  }
                );
              } else {
                errors.password = "Password Incorrect";
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
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    return res.status(400).json({
      errors
    });
  }
};
