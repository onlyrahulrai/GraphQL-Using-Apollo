import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

export const checkAuth = (context) => {
  //   console.log(" Context ",context)

  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    // Bearer ....
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        return user;
      } catch (err) {
        throw new GraphQLError("Invalid/Expired token", {
          extensions: {
            code: "Authentication Failed",
            http: {
              status: 401,
            },
          },
        });
      }
    }
    throw new GraphQLError("Authentication token must be 'Bearer [token]", {
      extensions: {
        code: "Authentication Failed",
        http: {
          status: 401,
        },
      },
    });
  }
  throw new GraphQLError("Authorization header must be provided", {
    extensions: {
      code: "Authentication Failed",
      http: {
        status: 401,
      },
    },
  });
};
