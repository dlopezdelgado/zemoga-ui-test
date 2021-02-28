const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, resp = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return resp.status(401).json({
      ok: false,
      msg: 'There is no token to validate',
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid;
    req.name = name;
  } catch (error) {
    return resp.status(401).json({
      ok: false,
      msg: 'Invalid token',
    });
  }

  next();
};

module.exports = {
  validateJWT,
};
