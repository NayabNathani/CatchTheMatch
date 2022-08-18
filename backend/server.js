let appVersion = require("./config/expressconfig").appVersion
let main = require("./config/expressconfig").App()

let path = require("path")

// view engine setup
main.set("views", path.join(__dirname, "./views/"))
main.set("view engine", "ejs")

//Greet api
main.get(`/`, (req, res) => {
  return res.send("API IS WORKING FINE")
})

//Admin
// let {loginAdmin} = require("./models/Admin")
// main.use(loginAdmin)

// User
let {
  registerUser,
  loginUser,
  renderChangePasswordTemplate,
  changePassword,
  profileViewed,
  setFavourite,
  blockUser,
  // reportUser,
  goOnline,
  BlockedUsers,
  FavouriteUsers,
  FavouriteMe,
  visitedProfile,visitedMe,
  updateProfile,
  getUser,
  search,unBlockUser,
  setUnfavourite,
  allUsers,
  checkBlock,checkFavourite,
  unViewUser,reportUser,
  uploadProfile,
  uploadPhoto,
  getPhotos,
  deletePhoto,
  checkAccess,
  requestAccess,
  checkChatroom,
  sendMessage,
  getMessages,
  getChats,
  getRequests,
  changeAccess
} = require("./models/User")
main.use(registerUser)
main.use(loginUser)
main.use(renderChangePasswordTemplate)
main.use(changePassword)
main.use(profileViewed)
main.use(setFavourite)
main.use(blockUser)
// main.use(reportUser)
main.use(goOnline)
main.use(BlockedUsers)
main.use(FavouriteUsers)
main.use(FavouriteMe)
main.use(visitedProfile)
main.use(visitedMe)
main.use(updateProfile)
main.use(getUser)
main.use(search)
main.use(unBlockUser)
main.use(unViewUser)
main.use(setUnfavourite)
main.use(allUsers)
main.use(checkBlock)
main.use(reportUser)
main.use(checkFavourite)
main.use(uploadProfile)
main.use(uploadPhoto)
main.use(getPhotos)
main.use(deletePhoto)
main.use(checkAccess)
main.use(requestAccess)
main.use(checkChatroom)
main.use(sendMessage)
main.use(getMessages)
main.use(getChats)
main.use(getRequests)
main.use(changeAccess)
