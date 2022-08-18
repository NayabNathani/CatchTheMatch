const fs = require("fs");
var multer = require("multer")

// var upload = multer({ dest: 'uploads/', limits: 52428800 })

var storage =  multer.diskStorage({
        destination: `./public/uploads`,
        filename: function (req, file, cb) {
          console.log(file,'fileeeeee');
          cb(null, file.originalname)
        },
      })      

  

const upload = multer({
  storage: storage,
  limits: 52428800,
})

module.exports = upload
