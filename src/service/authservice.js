const db = require("../service/postgres");
const bcrypt = require("bcryptjs");

const AuthService = {
  register: async ({ username, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const users = await db.callProcedure("create_user", { username, email, password: hashedPassword });
    return users[0];
  },

  login: async ({ email, password }) => {
    const users = await db.callProcedure("find_user_by_email", { email });
    if (!users.length) return null;

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    return match ? user : null;
  },
};

module.exports = AuthService;
