const express = require("express")

module.exports = {
  router: express.Router(),
  App: () => {
    const app = express()
    const {jsonParser, urlEncodedParser} = require("../config/bodyParser")
    const port = 9000 || process.env.PORT

    // static folders
    app.use("/public/uploads", express.static("./public/uploads/"))

    //including body-parser to app ....
    app.use(jsonParser, urlEncodedParser)

    // middleware to avoid CORS ....
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*")
      res.header("Access-Control-Allow-Headers", "*")
      res.header("Access-Control-Allow-Credentials", true)
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
      next()
    })

    let server = app.listen(port, (e) => {
      e
        ? console.log(`Server Cannot Start On Port ${port}`, e)
        : console.log(`Server Started On Port ${port}`)
    })

    const io = require("socket.io").listen(server)

    let {getSocket} = require("../models/Chat")

    io.on("connection", (socket) => {
      console.log("We got a Socket", socket.id)
      getSocket(socket, io)
    })

    return app
  },
  appVersion: process.env.npm_package_version,
}
