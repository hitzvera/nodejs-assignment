const { User, userToken } = require("../../models");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  await User.create({
    username,
    email,
    password: hashPassword,
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

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );

    await userToken.create({
      id: crypto.randomUUID(),
      userId: user.id,
      token,
    });

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    // Handle any errors that occur during the async operations
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
