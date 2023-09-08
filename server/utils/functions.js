import jwt from "jsonwebtoken";
const accessTokenExpiryTime = "1d";
const refreshTokenExpiryTime = "7d";

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: accessTokenExpiryTime,
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: refreshTokenExpiryTime,
  });
};


export {generateAccessToken,generateRefreshToken}