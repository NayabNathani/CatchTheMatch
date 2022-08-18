const {router} = require("../config/expressconfig")
const {sql, pool} = require("../config/dbConfig")
var upload = require("../config/multer")
var {mail} = require("../components/NodeMail/Mail")

//Methods
var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 9)
}
String.random = function (length, suffix) {
  let radom13chars = function () {
    return suffix + Math.random().toString(16).substring(2, 15).toUpperCase()
  }
  let loops = Math.ceil(length / 13)
  return new Array(loops)
    .fill(radom13chars)
    .reduce((string, func) => {
      return string + func()
    }, "")
    .substring(0, length)
}

// Apis

const loginAdmin = router.post("/login-admin", async (req, res) => {
  let {username, password} = req.body
  await sql.selectQuery(
    "admin",
    {username, password},
    (result, isError) => {
      if (isError == false && result.length > 0) {
        res.json({message: "admin logged in", data: result[0]})
      } else if (isError == false && result.length == 0) {
        res.json({message: "No such admin"})
      } else {
        res.json({error: result})
      }
    },
    null,
    false
  )
  return res
})

module.exports = {
  loginAdmin,
}
