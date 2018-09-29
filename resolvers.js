const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
}

exports.resolvers = {
  Query: {
    getCurrentUser: async (root, args, {currentUser, User}) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({ username: currentUser.username })
      return user;

    }
  },

  Mutation: {
    signinUser: async (root, {username, password}, { User }) => {
      const user = await User.findOne({username});
      if (!user) {
        throw new Error('User not found');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error('Incorrect password');
      }

      return { token: createToken(user, process.env.SECRET, '1hr')};

    },
    signupUser: async (root, { username, email, password, console }, { User }) => {
      const user = await User.findOne({ username});
      if (user) {
        throw new Error('User Already exists');
      }
      const newUser = await new User({
        username,
        email,
        password,
        console
      }).save()
      
      return { token: createToken(newUser, process.env.SECRET, "1hr") }
    }
  }
};