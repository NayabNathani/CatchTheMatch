const jwt = require("jsonwebtoken")

const getToken = (data, secret, expiresIn) => {
  return jwt.sign(
    {
      data,
    },
    secret,
    {expiresIn}
  )
}

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret, (err, decoded) => {
    return err ? err : decoded
  })
}

module.exports = JWT = {
  getToken,
  verifyToken,
}
