const { PrismaClient } = require("@prisma/client");

class PrismaDbClient {
  prisma = new PrismaClient();

  getUser = async (id) => {
    console.log("I got called with ", id);
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      console.log({ user });
      return user;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  changeAuthStatus = async (userId) => {
    try {
      const { isLoggedIn } = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      return this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          isLoggedIn: !isLoggedIn,
          lastActiveTime: new Date(),
        },
      });
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  updateUser = async (_, { updateProfileInput }, { userId }) => {
    const { name, profileDescription: description } = updateProfileInput;
    try {
      return this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ...(name && { name }),
          ...(description && { description }),
        },
      });
    } catch (e) {
      console.log(e);
      return e;
    }
  };
}

module.exports = {
  PrismaDbClient,
};
