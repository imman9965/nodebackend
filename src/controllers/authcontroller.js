const AuthService = require("../service/authservice");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  try {
    const user = await AuthService.register(req.body);
    const token = generateToken(user.id);
    res.status(201).json({ message: "Registered", user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await AuthService.login(req.body);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user.id);
    req.session.userId = user.id;
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
