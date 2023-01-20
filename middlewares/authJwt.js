const jwt = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (ACCESS_KEY, SECRET_TOKEN) => {
    var token = jwt.sign(ACCESS_KEY, SECRET_TOKEN, { expiresIn: 86400 });
    return token;
  },
  verifyAccessToken: (ACCESS_KEY, SECRET_TOKEN) => {
    jwt.verify(ACCESS_KEY, SECRET_TOKEN, (err, user) => {
      if (error) {
        return false;
      } else {
        return user;
      }
    });
  },
  sessionRequired: (stoken, atoken) => {
    if (stoken != "" && stoken != null && atoken != "" && atoken != null) {
      return true;
    } else {
      return false;
    }
  },
};
