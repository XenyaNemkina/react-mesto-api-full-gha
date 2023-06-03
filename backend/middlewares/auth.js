const { checkToken } = require('../helpers/jwt');
const UnauthorizedError = require('../errors/UnautorizedError');

module.exports = (req, res, next) => {
  console.log(req.headers.authorization);
  if (req.headers.authorization === undefined) {
    return next(new UnauthorizedError('Авторизуйтесь'));
  }
  const token = req.headers.authorization.replace('Bearer ', '') || req.cookies.jwt;
  let payload;
  try {
    payload = checkToken(token);
  } catch (err) {
    return next(new UnauthorizedError('Авторизуйтесь'));
  }
  req.user = payload;
  return next();
};
