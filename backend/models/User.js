const { router, appVersion } = require("../config/expressconfig")
const { sql } = require("../config/dbConfig")
var upload = require("../config/multer")
var JWT = require("../config/jwt")
const fs = require("fs");
const BASE_DIR = require("../server")
var { mail } = require("../components/NodeMail/Mail");
const { json } = require("body-parser");
// const e = require("express")

//generate Id random function
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

//generate minutes between two times
function timeDifference(d, dd) {
  var minute = 60 * 1000,
    hour = minute * 60,
    day = hour * 24,
    month = day * 30,
    ms = Math.abs(d - dd)

  var months = parseInt(ms / month, 10)

  ms -= months * month

  var days = parseInt(ms / day, 10)

  ms -= days * day

  var hours = parseInt(ms / hour, 10)

  ms -= hours * hour
  var minutes = parseInt(ms / minute, 10)

  return [
    months + " months",
    days + " days",
    hours + " hours",
    minutes + " minutes",
  ].join(", ")
}

const registerUser = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/register-user`,
  (req, res) => {
    let {
      username,
      email,
      password,
      gender,
      dateOfBirth,
      profileCreatedBy,
      accept_polygamy, age
    } = req.body
    let userId = String.random(16, "CTMU-") // SZCU means CatchTheMatch user
    let user = {
      user_id: userId,
      gender,
      username,
      date_of_birth: dateOfBirth,
      profile_created_by: profileCreatedBy,
      email,
      password,
      accept_polygamy, age, last_scene: new Date(),
      verified: true,
      admin_approved: true
    }
    var q = `select * from user where email = "${email}" OR username = "${username}"`
    sql.customQuery(q, (result, err) => {
      if (!err) {
        if (result.length === 0) {
          sql.insertQuery("user", user, (iQResult, isError) => {
            if (isError == true) {
              res.json({ signal: "error", message: "Something Went Wrong" });
            //console.log(iQResult)
            } else {
              res.json({ signal: "", message: "Registration Successfull!" })
              // mail("verify", { id: userId, email }).then((status) => {
              //   status == "success"
              //     ? res.json({ signal: "verificationEmailSent", message: "Verification Email has been sent to your Email Address" })
              //     : res.json({ signal: "error", message: "Something Went Wrong" });
              // })
              //   .catch((e) => {
              //     console.log(e, 'err');
              //     res.json({ signal: 'error', message: 'something went wrong' });
              //   })
            }
          })
          console.log(result, 'result in if')
        }
        else if (result[0].email === email) {
          res.json({ signal: "repeatedEmail", message: "This Email is already in use" });
        }
        else if (result[0].username === username) {
          res.json({ signal: "repeatedUserName", message: "This Username is already in use" });
        }
      } else {
        res.json({ message: 'something went wrong' });
        console.log(result, 'result in else');
      }
    })

    return res
  }
)

const verify = router.get(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/verify-user/:user_id`,
  (req, res) => {
    let { user_id } = req.params
    sql.updateQuery(
      "user",
      { verified: "true" },
      (result, isError) => {
        isError == true
          ? console.log(result)
          : res.send(`WILL RETURN TO HOMEPAGE`)
      },
      "user_id",
      user_id
    )
  }
)

const forgetPassword = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/forget-password`,
  async (req, res) => {
    //   what we are doing
    // 1. recieve user email then send an api on email that renders a reset password view
    let { email } = req.body
    await sql.selectQuery(
      "user",
      { email, verified: "true", admin_approved: "true" },
      (sQResult, isError) => {
        if (isError == false && sQResult.length > 0) {
          mail("resetPasswordLink", { id: sQResult[0].user_id, email }).then(
            (status) => {
              if (status == "success") {
                let gen_time = new Date().toLocaleString()
                sql.insertQuery(
                  "reset_password_links",
                  {
                    user_id: `${sQResult[0].user_id}`,
                    gen_time,
                    exp_time: 15,
                  },
                  (isError, iQResult) => {
                    if (isError == false) {
                      res.json({ message: "resetPasswordLinkSent" })
                    }
                  }
                )
              }
            }
          )
        } else if (isError == false && sQResult.length == 0) {
          res.json({ message: "no such email exists" })
        } else {
          res.json({ error: sQResult })
        }
      },
      null,
      false
    )
    return res
  }
)

const loginUser = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/login-user`,
  async (req, res) => {

    let { email, password } = req.body
    console.log(email, password)
    await sql.selectQuery(
      "user",
      {
        email, password,
        // verified: "true", admin_approved: "true" 
      },
      (sQResult, isError) => {
        console.log(sQResult, 'sqResult in login');
        if (isError == false && sQResult.length > 0) {
          let token = JWT.getToken(sQResult[0], "allah", "24h")
          if (sQResult[0].verified !== 'true') {
            res.json({ message: "User is not verified" })
          }
          else if (sQResult[0].admin_approved !== 'true') {
            res.json({ message: "User is not approved by admin yet" });
          }
          else {
            res.json({ message: "Login success", userData: sQResult[0], token })
          }
        } else if (isError == false && sQResult.length == 0) {
          res.json({ message: "no such user" })
        } else {
          res.json({ error: sQResult })
        }
      },
      null,
      false
    )
    return res
  }
)

const allUsers = router.get(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/all-users`,
  async (req, res) => {
    let token = req.headers.authorization.split(" ")[1]
    await sql.selectQuery(
      "user",
      {},
      (sQResult, isError) => {
        if (isError == false && sQResult.length > 0) {
          let tokenVerified = JWT.verifyToken(token, "allah")
          tokenVerified.data
            ? res.json({ status: 200, message: "success", userData: sQResult })
            : res.json({ message: "invalid token" })
        } else if (isError == false && sQResult.length == 0) {
          res.json({ message: "no such  user" })
        } else {
          res.json({ error: sQResult })
        }
      },
      null,
      true
    )
    return res
  }
)
const BlockedUsers = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/blocked-users`,
  async (req, res) => {
    let { userId } = req.body;
    let token = req.headers.authorization.split(" ")[1]
    await sql.selectQuery(
      "block",
      { blocker_id: userId },
      (sQResult, isError) => {
        if (isError == false && sQResult.length > 0) {
          let tokenVerified = JWT.verifyToken(token, "allah")
          if (tokenVerified.data) {
            console.log(sQResult, 'blocked users list')
            var q = sQResult.length > 1 ? `SELECT * FROM user WHERE user_id IN (${sQResult.map(e => { return `"${e.blocked_id}"` })})`
              : `SELECT * FROM user WHERE user_id = "${sQResult[0].blocked_id}"`
            console.log(q, 'qqqq')
            sql.customQuery(
              q,
              (sQResult2, isError2) => {
                if (isError2 == false) {
                  console.log("sqResult2", sQResult2)
                  res.json({ status: 200, message: "success", userData: sQResult2 })
                }
                else {
                  res.json({ error: sQResult2 })
                }
              },
            )
          } else {
            res.json({ message: "invalid token" })
          }
        } else if (isError == false && sQResult.length == 0) {
          res.json({ message: "no such  user" })
        } else {
          res.json({ error: sQResult })
        }
      },
      null,
      false
    )
    return res
  }
)

const FavouriteUsers = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/favourite-users`,
  async (req, res) => {
    let { userId } = req.body;
    let token = req.headers.authorization.split(" ")[1]
    await sql.selectQuery(
      "favourites",
      { favourite_chooser_id: userId },
      (sQResult, isError) => {
        if (isError == false && sQResult.length > 0) {
          let tokenVerified = JWT.verifyToken(token, "allah")
          if (tokenVerified.data) {
            console.log(sQResult, 'favourites users list')
            var q = sQResult.length > 1 ? `SELECT * FROM user WHERE user_id IN (${sQResult.map(e => { return `"${e.favourite_choosed_id}"` })})`
              : `SELECT * FROM user WHERE user_id = "${sQResult[0].favourite_choosed_id}"`
            console.log(q, 'qqqq')
            sql.customQuery(
              q,
              (sQResult2, isError2) => {
                if (isError2 == false) {
                  console.log("sqResult2", sQResult2)
                  res.json({ status: 200, message: "success", userData: sQResult2 })
                }
                else {
                  res.json({ error: sQResult2 })
                }
              },
            )
          } else {
            res.json({ message: "invalid token" })
          }
        } else if (isError == false && sQResult.length == 0) {
          res.json({ message: "no favourite users" })
        } else {
          res.json({ error: sQResult })
        }
      },
      null,
      false
    )
    return res
  }
)

const FavouriteMe = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/favourite-me`,
  async (req, res) => {
    let { userId } = req.body;
    let token = req.headers.authorization.split(" ")[1]
    await sql.selectQuery(
      "favourites",
      { favourite_choosed_id: userId },
      (sQResult, isError) => {
        if (isError == false && sQResult.length > 0) {
          let tokenVerified = JWT.verifyToken(token, "allah")
          if (tokenVerified.data) {
            console.log(sQResult, 'favourites users list')
            var q = sQResult.length > 1 ? `SELECT * FROM user WHERE user_id IN (${sQResult.map(e => { return `"${e.favourite_chooser_id}"` })})`
              : `SELECT * FROM user WHERE user_id = "${sQResult[0].favourite_chooser_id}"`
            console.log(q, 'qqqq')
            sql.customQuery(
              q,
              (sQResult2, isError2) => {
                if (isError2 == false) {
                  console.log("sqResult2", sQResult2)
                  res.json({ status: 200, message: "success", userData: sQResult2 })
                }
                else {
                  res.json({ error: sQResult2 })
                }
              },
            )
          } else {
            res.json({ message: "invalid token" })
          }
        } else if (isError == false && sQResult.length == 0) {
          res.json({ message: "no favourite users" })
        } else {
          res.json({ error: sQResult })
        }
      },
      null,
      false
    )
    return res
  }
)

const visitedProfile = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/visited-profile`,
  async (req, res) => {
    let { userId } = req.body;
    let token = req.headers.authorization.split(" ")[1]
    await sql.selectQuery(
      "recently_viewed_profiles",
      { profile_viewer_uid: userId },
      (sQResult, isError) => {
        if (isError == false && sQResult.length > 0) {
          let tokenVerified = JWT.verifyToken(token, "allah")
          if (tokenVerified.data) {
            console.log(sQResult, 'favourites users list')
            var q = sQResult.length > 1 ? `SELECT * FROM user WHERE user_id IN (${sQResult.map(e => { return `"${e.profile_viewed_uid}"` })})`
              : `SELECT * FROM user WHERE user_id = "${sQResult[0].profile_viewed_uid}"`
            console.log(q, 'qqqq')
            sql.customQuery(
              q,
              (sQResult2, isError2) => {
                if (isError2 == false) {
                  console.log("sqResult2", sQResult2)
                  res.json({ status: 200, message: "success", userData: sQResult2 })
                }
                else {
                  res.json({ error: sQResult2 })
                }
              },
            )
          } else {
            res.json({ message: "invalid token" })
          }
        } else if (isError == false && sQResult.length == 0) {
          res.json({ message: "no visited users" })
        } else {
          res.json({ error: sQResult })
        }
      },
      null,
      false
    )
    return res
  }
)

const visitedMe = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/visited-me`,
  async (req, res) => {
    let { userId } = req.body;
    let token = req.headers.authorization.split(" ")[1]
    await sql.selectQuery(
      "recently_viewed_profiles",
      { profile_viewed_uid: userId },
      (sQResult, isError) => {
        if (isError == false && sQResult.length > 0) {
          let tokenVerified = JWT.verifyToken(token, "allah")
          if (tokenVerified.data) {
            console.log(sQResult, 'favourites users list')
            var q = sQResult.length > 1 ? `SELECT * FROM user WHERE user_id IN (${sQResult.map(e => { return `"${e.profile_viewer_uid}"` })})`
              : `SELECT * FROM user WHERE user_id = "${sQResult[0].profile_viewer_uid}"`
            console.log(q, 'qqqq')
            sql.customQuery(
              q,
              (sQResult2, isError2) => {
                if (isError2 == false) {
                  console.log("sqResult2", sQResult2)
                  res.json({ status: 200, message: "success", userData: sQResult2 })
                }
                else {
                  res.json({ error: sQResult2 })
                }
              },
            )
          } else {
            res.json({ message: "invalid token" })
          }
        } else if (isError == false && sQResult.length == 0) {
          res.json({ message: "no visited users" })
        } else {
          res.json({ error: sQResult })
        }
      },
      null,
      false
    )
    return res;
  }
)

const goOnline = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/user/go-online`,
  (req, res) => {
    console.log(req.body)
    let { uid } = req.body

    let values = {
      online_user_id: uid,
      // report_date: date,
      // report_time: time,
    }
    sql.selectQuery(
      "online_users",
      { online_user_id: uid },
      (sQResult, isError) => {
        isError == false && sQResult.length > 0
          ? res.json({ message: "user already online" })
          : sql.insertQuery("online_users", values, (iQResult, isError) => {
            isError == false
              ? res.send("user online")
              : res.send(`cant make user online \n ${iQResult}`)
          })
      },
      null,
      false
    )
    return res
  }
)

const renderChangePasswordTemplate = router.get(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/forget-password/:userId`,
  async (req, res) => {
    let { userId } = req.params
    //   what we are doing
    // 1. recieve user email then send an api on email that renders a reset password view
    res.render("reset-password-template", { id: userId })
    return res
  }
)

const changePassword = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/change-password`,
  (req, res) => {
    let { id, newPassword } = req.body
    sql.selectQuery(
      "reset_password_links",
      { user_id: id },
      async (sQResult, isError) => {
        if (isError == false && sQResult.length > 0) {
          sQResult = await sQResult.filter((result) => {
            return (
              new Date(result.gen_time).toLocaleDateString() ==
              new Date().toLocaleDateString() &&
              timeDifference(new Date(result.gen_time), new Date())
                .split(",")[3]
                .split(" ")[1] < 15
            )
          })
          if (sQResult.length > 0) {
            sql.updateQuery(
              "user",
              { password: newPassword },
              (uQResult, isError) => {
                // console.log(isError)
                if (isError == false) {
                  res.json({ message: "updated password successfully" })
                }
              },
              "user_id",
              id
            )
          } else {
            res.json({ e: "link expired" })
          }
        }
      },
      null,
      false
    )

    return res
  }
)

// need a unique record id and the values of data to be updated should not be null not any one of them also --- IMPORTANT!
const updateUser = router.post(
  "/update-user",
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
    {
      name: "clinic1Images",
      maxCount: 4,
    },
  ]),
  (req, res) => {
    // console.log(req.files)
    // console.log(req.body)

    let updatedData = req.body
    if (updatedData.clinics && req.files["clinic1Images"]) {
      console.log("CHALAAA")
      let tempClinicImagesArray = []
      req.files["clinic1Images"].forEach((clinicImage) => {
        // console.log(clinicImage)
        let relativeClinicImageContainer = clinicImage.path
        let relativeClinicImagePath = relativeClinicImageContainer.replace(
          /[\\]/gm,
          "/"
        )
        tempClinicImagesArray.push(relativeClinicImagePath)
      })
      tempClinicImagesArray
      req.files["clinic1Images"] = tempClinicImagesArray
      // console.log(tempClinicImagesArray)
      // console.log(req.files["clinicImages"])

      updatedData.clinics = JSON.parse(updatedData.clinics)

      updatedData.clinics[0].clinic_images = req.files["clinic1Images"]

      updatedData.clinics = JSON.stringify(updatedData.clinics)
    } else {
      console.log("Nae challa")
    }

    if (req.files["profileImage"]) {
      console.log("PROFILE CHALLAA")
      let relativeProfileImageContainer = req.files[
        "profileImage"
      ][0].path.toString()

      let relativeProfileImagePath = relativeProfileImageContainer.replace(
        /[\\]/gm,
        "/"
      )
      updatedData.profile_image = relativeProfileImagePath
    } else {
      console.log("Nae challaaaaaaaaaaaa")
    }

    sql.updateQuery(
      "doctor",
      req.body.id,
      updatedData,
      (uQResult, uQError) => {
        console.log(uQResult)
        if (uQError == true) {
          return res.json({ message: "Update Profile Failed", e: uQResult })
        } else {
          console.log("Success", uQResult)
          // sql.selectQuery(
          //   "doctor",
          //   {id: "MS-97B0W1MVU58A4LWR-D"},
          //   (sQResult, sQError) => {
          //     if (sQError == true) {
          //       return res.json({
          //         message: "Select Updated Profile Failed",
          //         e: sQResult,
          //       })
          //     }
          //     return res.json({updatedDoctor: sQResult[0]})
          //   }
          // )
        }
      },
      null,
      null
    )
  }
)

const profileViewed = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/profile/viewed`,
  async (req, res) => {
    // console.log(req.headers.authorization.split(" "))
    let token = req.headers.authorization.split(" ")[1]
    let verify = JWT.verifyToken(token, "allah")
    console.log(verify["expiredAt"] ? "EXPIRED TOKEN" : "NOT EXPIRED YET")
    console.log(req.body, 'body')
    let { uid, uidOfProfile } = req.body
    let date = new Date().toISOString()
    let time = new Date().toLocaleTimeString()
    let values = {
      profile_viewer_uid: uid,
      profile_viewed_uid: uidOfProfile,
      view_date: date,
      view_time: time,
    }
    sql.selectQuery(
      "recently_viewed_profiles",
      { profile_viewed_uid: uidOfProfile },
      (sQResult, isError) => {
        isError == false && sQResult.length > 0
          ? res.json({ message: "profile already viewed" })
          : sql.insertQuery(
            "recently_viewed_profiles",
            values,
            (iQResult, isError) => {
              isError == false
                ? res.json({ message: "added to recently viewed" })
                : res.json({ message: `cant add to recently viewed \n ${iQResult}` })
            }
          )
      },
      null,
      false
    )
    return res
  }
)

const setFavourite = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/profile/favourite`,
  (req, res) => {
    console.log(req.body)
    let { uid, favourite_uid } = req.body
    // let date = new Date().toISOString()
    // let time = new Date().toLocaleTimeString()
    let values = {
      favourite_chooser_id: uid,
      favourite_choosed_id: favourite_uid,
      // fav_date: date,get
      // fav_time: time,
    }
    sql.selectQuery(
      "favourites",
      { favourite_choosed_id: favourite_uid },
      (sQResult, isError) => {
        isError == false && sQResult.length > 0
          ? res.json({ message: "profile already favourite" })
          : sql.insertQuery("favourites", values, (iQResult, isError) => {
            isError == false
              ? res.json({ message: "added to favourites" })
              : res.send({ message: `cant add to favourites \n ${iQResult}` })
          })
      },
      null,
      false
    )

    return res
  }
)

const setUnfavourite = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/profile/unfavourite`,
  (req, res) => {
    console.log(req.body)
    let { favourite_chooser_id, favourite_choosed_id } = req.body;
    sql.customQuery(
      `DELETE from favourites Where favourite_chooser_id = "${favourite_chooser_id}" AND favourite_choosed_id = "${favourite_choosed_id}"`,
      (sQResult, isError) => {
        if (isError === false) {
          res.json({ message: "user unfavourited" })
        }
        else {
          res.json({ message: 'something went wrong' })
        }
      }
    )
    return res
  }
)

const blockUser = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/profile/block`,
  (req, res) => {
    console.log(req.body)
    let { blocker_uid, blocked_uid } = req.body
    // let date = new Date().toISOString()
    // let time = new Date().toLocaleTimeString()
    let values = {
      blocker_id: blocker_uid,
      blocked_id: blocked_uid,
      // block_date: date,
      // block_time: time,
    }
    sql.selectQuery(
      "block",
      { blocked_id: blocked_uid },
      (sQResult, isError) => {
        isError == false && sQResult.length > 0
          ? res.json({ message: "profile already blocked" })
          : sql.insertQuery("block", values, (iQResult2, isError2) => {
            isError2 === false
              ? res.send({ message: "user blocked" })
              : res.json({ message: `cant block user \n ${iQResult2}` })
          })
      },
      null,
      false
    )
    return res
  }
)
const reportUser = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/profile/report`,
  (req, res) => {
    console.log(req.body)
    let { reporter_id, reported_id, report_message } = req.body

    let values = {
      reporter_id, reported_id, report_reason: report_message
    };
    console.log(values, 'values in report')
    sql.selectQuery(
      "report",
      { reporter_id: reporter_id, reported_id: reported_id },
      (sQResult, isError) => {
        // console.log(sQResult,'sqResult')
        (isError == false && sQResult.length !== 0)
          ? res.json({ message: "profile already reported" })
          : sql.insertQuery("report", values, (iQResult2, isError2) => {
            isError2 === false
              ? res.send({ message: "user reported" })
              : res.json({ message: `cant report user \n ${iQResult2}` })
          })
      },
      null,
      false
    )
    return res
  }
)

const unBlockUser = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/profile/unblock`,
  (req, res) => {
    console.log(req.body)
    let { blocker_id, blocked_id } = req.body;
    sql.customQuery(
      `DELETE from block Where blocker_id = "${blocker_id}" AND blocked_id = "${blocked_id}"`,
      (sQResult, isError) => {
        if (isError === false) {
          res.json({ message: "user unblocked" })
        }
        else {
          res.json({ message: 'something went wrong' })
        }
      }
    )
    return res
  }
)
const unViewUser = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/profile/unView`,
  (req, res) => {
    console.log(req.body, 'unviewed Body')
    let { profile_viewer_uid, profile_viewed_uid } = req.body;
    sql.customQuery(
      `DELETE from recently_viewed_profiles Where profile_viewer_uid = "${profile_viewer_uid}" AND profile_viewed_uid = "${profile_viewed_uid}"`,
      (sQResult, isError) => {
        if (isError === false) {
          res.json({ message: "user unviewed" })
        }
        else {
          res.json({ message: 'something went wrong' })
        }
      }
    )
    return res
  }
)

// const reportUser = router.post(
//   `/www.secondzoja.com/v${appVersion.charAt(0)}/profile/report`,
//   (req, res) => {
//     console.log(req.body)
//     let {reporter_uid, reported_uid} = req.body
//     // let date = new Date().toISOString()
//     // let time = new Date().toLocaleTimeString()
//     let values = {
//       reporter_id: reporter_uid,
//       reported_id: reported_uid,
//       // report_date: date,
//       // report_time: time,
//     }
//     sql.selectQuery(
//       "report",
//       {reported_id: reported_uid, reporter_id:reporter_uid},
//       (sQResult, isError) => {
//         isError == false && sQResult.length > 0
//           ? res.json({message: "profile already reported"})
//           : sql.insertQuery("report", values, (iQResult, isError) => {
//               isError == false
//                 ? res.send("user reported")
//                 : res.send(`cant report user \n ${iQResult}`)
//             })
//       },
//       null,
//       false
//     )
//     return res
//   }
// )

const updateProfile = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/profile/updateProfile`,
  (req, res) => {
    // console.log(req.body)
    let me = req.body.id
    let obj = req.body.updateBody
    sql.updateQuery(
      "user",
      obj,
      (sQResult, isError) => {
        if (isError === false) {
          res.json({ message: 'profile updated' })
        } else {
          res.json({ message: 'profile didnot updated' })
        }
      },
      "user_id",
      me
    )
    return res
  }
)

const getUser = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/getUser`,
  (req, res) => {
    console.log(req.body, 'req.body in get User')
    let { userId } = req.body
    sql.selectQuery(
      "user",
      { user_id: userId },
      (sQResult, isError) => {
        if (isError === false) {
          res.json({ message: 'success', userData: sQResult[0] })
        } else {
          res.json({ message: 'user not found' })
        }
      },
      null,
      false
    )
    return res
  }
)
const search = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/search`,
  (req, res) => {
    // console.log(req.body)
    let values = req.body;
    var ageQ = '', heightQ = '';
    if (values.ageStart && values.ageEnd) {
      ageQ = `age BETWEEN ${values.ageStart} AND ${values.ageEnd}`
    } else if (values.ageStart) {
      ageQ = `age > ${values.ageStart}`
    } else if (values.ageEnd) {
      ageQ = `age < ${values.ageEnd}`
    }
    if (values.heightStart && values.heightEnd) {
      heightQ = `AND height BETWEEN ${values.heightStart} AND ${values.heightEnd}`
    } else if (values.heightStart) {
      heightQ = `AND height > ${values.ageStart}`
    } else if (values.heightEnd) {
      heightQ = `AND height < ${values.ageEnd}`
    }
    delete values['ageStart'];
    delete values['ageEnd'];
    delete values['heightStart'];
    delete values['heightEnd'];
    var q = `SELECT * FROM user WHERE `;
    Object.keys(values).map((key, i) => {
      var valueReplaced = [];
      console.log(Object.values(values)[i], 'obj values');
      console.log(key, 'key');
      console.log("true at ", key);
      Object.values(values)[i].map((e) => {
        valueReplaced.push(`"${e}"`);
      });
      console.log(valueReplaced, 'value replaced before join');
      // valueReplaced = valueReplaced.join('');   
      console.log(valueReplaced, key, 'key value Replaced');
      q += key + " IN " + "(" + valueReplaced + ") AND ";
    })
    q += `${ageQ} ${heightQ}`;
    // var q =`SELECT * FROM user WHERE ${Object.keys(values).map((key, i) => {
    //   var valueReplaced=[];
    //   console.log(Object.values(values)[i],'obj values');
    //   console.log(key,'key');
    //     console.log("true at ",key);
    //   Object.values(values)[i].map((e)=>{
    //     valueReplaced.push(`"${e}"`);
    //   });
    //   console.log(valueReplaced,'value replaced before join');
    //   // valueReplaced = valueReplaced.join('');   
    //   console.log(valueReplaced,key,'key value Replaced') ;
    //   return key + " IN " + "("  + valueReplaced + ") AND";
    // })} ${ageQ} ${heightQ}`;
    console.log(q, 'query string')

    sql.customQuery(
      q,
      (sQResult, isError) => {
        if (isError === false) {
          res.json({ message: 'success', userData: sQResult })
        } else {
          res.json({ message: 'user not found' })
        }
      }
    )
    return res
  }
)
const checkBlock = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/checkBlock`,
  (req, res) => {
    // console.log(req.body)
    let { blocker_id } = req.body
    sql.selectQuery(
      "block",
      { blocker_id },
      (sQResult, isError) => {
        if (isError === false) {
          res.json({ message: 'success', userData: sQResult })
        } else {
          res.json({ message: 'user not found' })
        }
      },
      null,
      false
    )
    return res
  }
)
const checkFavourite = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/checkfavourite`,
  (req, res) => {
    // console.log(req.body)
    let { favourite_chooser_id } = req.body
    sql.selectQuery(
      "favourites",
      { favourite_chooser_id },
      (sQResult, isError) => {
        if (isError === false) {
          res.json({ message: 'success', userData: sQResult })
        } else {
          res.json({ message: 'user not found' })
        }
      },
      null,
      false
    )
    return res
  }
)

const uploadProfile = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/uploadProfile`
  ,
  upload.single('profile'),
  (req, res) => {
    console.log(__dirname, 'dirname')
    var profile = req.file;
    var uid = req.body.uid;
    var path = req.file.path.replace(/[\\]/gm, '/');
    var updatedData = { profile: path };
    sql.updateQuery('user', updatedData, (result, err) => {
      if (!err) {
        console.log(result);
        res.json({ message: 'profileuploaded', data: result })
      } else {
        res.json({ message: 'something went wrong', data: result })
      }
    }, 'user_id', uid
    )



    // multer store files in specific folder

    // var path = profile.path.replace(profile.filename, "")
    // var source = `${path}\\${profile.filename}`;
    // var dest = `${path}${uid}\\profile\\`;
    // // console.log(profile, 'profile');
    // if (fs.existsSync(`${path}${uid}\\profile\\`)) {
    //   // console.log('folder exist');
    //   var source = `${path}\\${profile.filename}`;
    //   var dest = `${path}${uid}\\profile\\${profile.filename}`;
    //   fs.copyFile(source, dest, (err) => {
    //     console.log(err, 'err in fs copy')
    //   })
    // } else {
    //   console.log('file doesnot exist');
    //   console.log(path, "PAAAAAAATh")
    //   fs.mkdir(`${path}${uid}\\profile\\`, { recursive: true }, (err, path) => {
    //     console.log(err, 'err');
    //     if (!err) {
    //       var source = `${path}\\${profile.filename}`;
    //       var dest = `${path}${uid}\\profile\\${profile.filename}`;
    //       console.log(source, dest, 'src dest');
    //       fs.copyFile(source, dest, (err2) => {
    //         console.log(err2, 'err ')
    //       })
    //     }
    //     console.log(path, 'success path');
    //   })
    // }

    //  sql.insertQuery
  }
)
const uploadPhoto = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/uploadPhoto`,
  upload.single('photo'),
  (req, res) => {
    var uid = req.body.uid;
    var type = req.body.type;
    console.log('uploading photos in dbbbb');
    // console.log(req.file,'fileeeee in user.js');
    // req.file.filename = req.body.uid + new Date(Date.now());
    // console.log(req.file,'file after');
    var oldFile = req.file.path.replace(/[\\]/gm, '/');
    var imgType = req.file.mimetype.replace('image/', '', () => {
      // console.log('done');
    })
    var newFile = req.file.path.replace(/[\\]/gm, '/');
    newFile = newFile.replace(req.file.filename, uid + '_' + Date.now() + '.' + imgType, (e) => {
      // console.log(e,'eeee')
    });
    // console.log(oldFile,'oldFIle')
    // console.log(newFile,'newFIle')
    fs.rename(oldFile, newFile, (err) => {
      // console.log(err,'err');
      if (!err) {
        var obj = { user_id: uid, photoUrl: newFile, type }
        sql.insertQuery('photos', obj, (result, isErr) => {
          // console.log(isErr,result,'err result');
          if (!isErr) {
            res.json({ success: true, message: 'image uploaded successfully' });
          } else {
            res.json({ success: false, message: 'image upload failed' });
          }
        })
      }
    })
  }
)

const getPhotos = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/getPhotos`,
  // upload.single('photo'),
  (req, res) => {
    var uid = req.body.uid;
    var type = req.body.type;
    console.log(req.body, 'bodyy');
    var obj = { user_id: uid, type };
    sql.selectQuery('photos', obj, (result, err) => {
      // console.log(result,err,'result err');
      if (!err) {
        res.json({ success: true, result });
      }
      else {
        res.json({ success: false });
      }
    }, null, false)
  }
)

const deletePhoto = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/deletePhoto`,
  (req, res) => {
    var photoUrl = req.body.photoUrl;
    console.log(req.body, 'bodyy');
    // var filePath = `public/uploads/${photoUrl}`;
    fs.unlink(photoUrl, (err) => {
      console.log(err, 'err in rm file')
    })
    sql.customQuery(`DELETE FROM PHOTOS WHERE (photoUrl="${photoUrl}")`, (result, err) => {
      console.log(result, err, 'result err');
      if (!err) {
        res.json({ success: true, message: 'photo deleted successfully' });
      }
      else {
        res.json({ success: false });
      }
    })
  }
)
const checkAccess = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/checkAccess`,
  // upload.single('photo'),
  (req, res) => {
    var access_reciever = req.body.access_reciever;
    var access_provider = req.body.access_provider;
    console.log(req.body, 'bodyy in check access');
    var obj = { access_reciever, access_provider };
    sql.selectQuery('access', obj, (result, err) => {
      console.log(result, err, 'result err im check access');
      if (!err && result.length != 0) {
        res.json({ success: true, result: result[0] });
      }
      else {
        res.json({ success: false });
      }
    }, null, false)
  }
)
const requestAccess = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/requestAccess`,
  // upload.single('photo'),
  (req, res) => {
    var obj = req.body;
    console.log(req.body, 'boduuuuu');
    sql.selectQuery('access', obj, (result, err) => {
      if (!err && result.length !== 0) {
        res.json({ sucess: false, message: 'request is already sent' });
      } else {
        sql.insertQuery('access', obj, (result2, err2) => {
          if (!err2) {
            res.json({ success: true, message: 'request sent sucessfully' });
          }
          else {
            res.json({ success: false });
          }
        }, null, false)
      }
    })

  }
)
const checkChatroom = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/checkChatroom`,
  (req, res) => {
    var user_1 = req.body.user_1;
    var user_2 = req.body.user_2;
    var chatId = req.body.chatId;
    console.log(req.body, 'bodyy in check chatroom');
    // var obj = {access_reciever,access_provider};
    var q = `select * from chatroom where (user_1="${user_1}" AND user_2="${user_2}") OR (user_1="${user_2}" AND user_2="${user_1}")`
    sql.customQuery(q, (result, err) => {
      console.log(result, err, 'result err im check chatroom');
      if (!err && result.length != 0) {
        res.json({ success: true, message: 'chatroom already existed' });
      }
      else {
        var obj = { user_1, user_2, chatId };
        sql.insertQuery('chatroom', obj, (result, err) => {
          if (!err) {
            res.json({ success: true, message: 'chatroom created' });
          }
        })
      }
    })
  }
)
const sendMessage = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/sendMessage`,
  (req, res) => {
    var sender = req.body.sender;
    var reciever = req.body.reciever;
    var message = req.body.message;
    var timestamp = new Date();
    console.log(req.body, 'bodyy in check chatroom');
    var obj = { sender, reciever, message, timestamp };
    sql.insertQuery('messages', obj, (result, err) => {
      if (!err) {
        res.json({ success: true, message: 'message sent successfully' });
      }
    })
  }
)
const getMessages = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/getMessages`,
  (req, res) => {
    var user_1 = req.body.user_1;
    var user_2 = req.body.user_2;
    var q = `select * from messages where (sender="${user_1}" AND reciever="${user_2}") OR (sender="${user_2}" AND reciever="${user_1}")`
    sql.customQuery(q, (result, err) => {
      if (!err) {
        res.json({ success: true, result });
      } else {
        res.json({ success: false });
      }
    })
  }
)
const getChats = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/getChats`,
  (req, res) => {
    var user_1 = req.body.user_1;
    var q = `select * from chatroom where (user_1="${user_1}" OR user_2="${user_1}")`
    sql.customQuery(q, (result, err) => {
      if (!err) {
        res.json({ success: true, result });
      } else {
        res.json({ success: false });
      }
    })
  }
)
const getRequests = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/getRequests`,
  (req, res) => {
    var obj = req.body;
    console.log(req.body, 'body in get requests');
    sql.selectQuery('access', obj, (result, err) => {
      if (!err && result.length !== 0) {
        res.json({ success: true, result });
      } else {
        res.json({ success: false });
      }
    }, null, false)

  }
)
const changeAccess = router.post(
  `/www.secondzoja.com/v${appVersion.charAt(0)}/changeAccess`,
  (req, res) => {
    var obj = req.body;
    console.log(req.body, 'body in get requests');
    var q = `update access set access=${obj.access} 
    where (access_provider="${obj.access_provider}" AND access_reciever="${obj.access_reciever}")`
    sql.customQuery(q, (result, err) => {
      if (!err) {
        res.json({ success: true, message: 'access updated' });
      } else {
        res.json({ success: false });
      }
    }, null, false)

  }
)

module.exports = {
  registerUser,
  loginUser,
  changePassword,
  renderChangePasswordTemplate,
  updateUser,
  BlockedUsers,
  profileViewed,
  setFavourite,
  blockUser,
  // reportUser,
  FavouriteUsers,
  goOnline,
  FavouriteMe,
  visitedProfile, visitedMe, updateProfile,
  getUser, search, unBlockUser, setUnfavourite,
  allUsers,
  checkBlock,
  checkFavourite, unViewUser,
  reportUser,
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

}

// MySQL QUERY for getting recently viewed profiles
// SELECT MAX(view_date) AS view_date FROM recently_viewed_profiles WHERE profile_viewer_uid = 'SZ-qwerty12'
