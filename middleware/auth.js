const jwt = require('jsonwebtoken');
const { getUserById } = require('../services/users');

/**Entiendo que este middleware se esta ejecutando en index.js con... app.use(authMiddleware(secret));
 * entonces al llegar al request el request no tiene de por si el userToken decodificado
 * Y al llegar al middleware en isAuthenticated ya exista esta propiedad
 */
module.exports = (secret) => (req, resp, next) => {
  console.log("headers", req.headers)
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return next(403);
    }
    getUserById(decodedToken.id)
    .then(user => {
      if(!user){
        return resp.status(404).json({ message: 'User not found'})
      }
      req.userToken = decodedToken
      return next()
    })
    .catch(() => next(403))
    // TODO: Verificar identidad del usuario usando `decodeToken.uid`
  });
};

//Con el !! estamos buscando que se retorne el equivalente booleano de req.userToken
module.exports.isAuthenticated = (req) => !!req.userToken;
  // TODO: decidir por la informacion del request si la usuaria esta autenticada

module.exports.isAdmin = async (req) => {
  try {
    let isAdmin = false;
    const { role } = await getUserById(req.userToken.id)
    if(role === 'admin') isAdmin = true;
    return isAdmin;
  } catch (error) {
    console.log({ error })
    throw new Error("User not found");
  }
}
  // TODO: decidir por la informacion del request si la usuaria es admin


module.exports.requireAuth = (req, resp, next) => (
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : next()
);

module.exports.requireAdmin = (req, resp, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : (!module.exports.isAdmin(req))
      ? next(403)
      : next()
);
