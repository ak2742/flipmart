const jwt = require("jsonwebtoken")
const secret = process.env.JWT_SECRET

const auth = async (req, res, next) => {
  try {
    const token = req.header("authToken")
    const authenticated = jwt.verify(token, secret)
    req.user = authenticated.user
    next()
  } catch (error) {
    res.status(401).send({ error: "Forbidden" })
  }
}

module.exports = auth