const { User, Task } = require("../../models");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  await User.create({
    username,
    email,
    password,
  })
    .then((user) => {
      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({
          message: "Email already exists.",
        });
      } else {
        res.status(500).json({
          message: err.message,
        });
      }
    });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  await User.findOne({ where: { email } }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  });
};
