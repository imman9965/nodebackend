const db = require("../service/postgres");

const UserService = {
  createUser: async ({ username, email, password }) => {
    return await db.callProcedure("create_user", { username, email, password });
  },
  getAllUsers: async () => {
    return await db.callProcedure("get_all_users");
  },
  getUserById: async (id) => {
    const users = await db.callProcedure("get_user_by_id", { id });
    return users[0];
  },
  updateUser: async (id, { username, email }) => {
    const users = await db.callProcedure("update_user", { id, username, email });
    return users[0];
  },
  deleteUser: async (id) => {
    await db.callProcedure("delete_user", { id });
    return true;
  },
};

module.exports = UserService;
