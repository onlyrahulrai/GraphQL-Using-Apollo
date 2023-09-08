import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../../utils/validators.js";
import User from "../../models/User.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/functions.js";
import { checkAuth } from "../../utils/common.js";

const userResolver = {
  Query: {
    userDetails: async (_, args, context) => {
      const { userId } = checkAuth(context);

      return await User.findOne({ _id: userId }).then((user) => {
        const { password, _id: id, ...rest } = Object.assign({}, user.toJSON());

        return {
          id,
          ...rest,
        };
      });
    },
  },
  Mutation: {
    registerUser: async (_, args) => {
      const { valid, errors } = validateRegisterInput(args);

      if (!valid) {
        throw new GraphQLError(JSON.stringify(errors));
      }

      return User.findOne({ email: args.email })
        .then((user) => {
          if (user) {
            errors.email = "User is already exist.";
            throw new GraphQLError(JSON.stringify(errors));
          }

          if (args.password) {
            return bcrypt
              .hash(args.password, 10)
              .then((hashPassword) => {
                const { firstname, lastname, email, role } = args;

                const user = new User({
                  firstname,
                  lastname,
                  email,
                  password: hashPassword
                });

                if (role) {
                  user.role = role;
                }

                // return save result as a response
                return user
                  .save()
                  .then((user) => {
                    const access = generateAccessToken({
                      userId: user.id,
                      username: user.username,
                      role: user.role,
                    });

                    const refresh = generateRefreshToken({
                      userId: user.id,
                      username: user.username,
                      role: user.role,
                    });

                    const { password, _id: id, __v, ...rest } = Object.assign(
                      {},
                      user.toJSON()
                    );

                    return { id, ...rest, access, refresh };
                  })
                  .catch((err) => {
                    errors.email = "Couldn't create an account!";
                    throw new GraphQLError(JSON.stringify(errors));
                  });
              })
              .catch((err) => {
                errors.password = "Password isn't valid.";
                throw new GraphQLError(JSON.stringify(errors));
              });
          }
        })
        .catch((error) => {
          throw new GraphQLError(error.message);
        });
    },
    loginUser: async (_, args) => {
      const { valid, errors } = validateLoginInput(args);

      if (!valid) {
        throw new GraphQLError(JSON.stringify(errors));
      }

      return User.findOne({ email: args.email })
        .then((user) => {
          const errors = {};

          if (!user) {
            errors.email = "Please provide a valid email address.";
            throw new GraphQLError(JSON.stringify(errors));
          }

          if (args.password) {
            return bcrypt
              .compare(args.password, user.password)
              .then((passwordCheck) => {
                if (!passwordCheck) {
                  errors.password =
                    "The password that you've entered is incorrect.";
                  throw new GraphQLError(JSON.stringify(errors));
                }

                const access = generateAccessToken({
                  userId: user.id,
                  username: user.username,
                  role: user.role,
                });

                const refresh = generateRefreshToken({
                  userId: user.id,
                  username: user.username,
                  role: user.role,
                });

                const { password, _id: id, ...rest } = Object.assign(
                  {},
                  user.toJSON()
                );

                return {
                  id,
                  access,
                  refresh,
                  ...rest,
                };
              });
          }
        })
        .catch((error) => {
          throw new GraphQLError(error.message);
        });
    },
  },
};

export default userResolver;
