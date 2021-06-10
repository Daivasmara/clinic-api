const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error('Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    const { SECRET_KEY } = process.env;
    jwt.verify(token, SECRET_KEY);

    next();
  } catch (err) {
    res.status(401);
    next(new Error('Unauthorized'));
  }
};

module.exports = auth;
