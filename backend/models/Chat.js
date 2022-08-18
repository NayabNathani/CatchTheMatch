const {router} = require("../config/expressconfig")
const {sql} = require("../config/dbConfig")
var upload = require("../config/multer")

// const getMAC = require("getmac").default()

var people = []

String.random = function (length) {
  let radom13chars = function () {
    return "MSCR-" + Math.random().toString(16).substring(2, 15).toUpperCase()
  }
  let loops = Math.ceil(length / 13)
  return new Array(loops)
    .fill(radom13chars)
    .reduce((string, func) => {
      return string + func()
    }, "")
    .substring(0, length)
}

const getAllUsers=async ()=>{
  
}

// const checkUnknownMacExists = router.post(
//   "/get-room",
//   upload.single("chat-image"),
//   (req, res) => {
//     // console.log(req.body)
//     let {doctorId, patientId} = req.body
//     sql.customQuery(
//       `SELECT * FROM rooms WHERE (patient_id='${patientId}' AND doctor_id='${doctorId}')`,
//       (sQResult, isError) => {
//         if (isError == true) {
//           return res.json({message: "Room fetching failed", e: sQResult})
//         } else if (isError == false && sQResult.length == 0) {
//           let roomId = String.random(16)
//           sql.insertQuery(
//             "rooms",
//             {
//               room_id: roomId,
//               patient_id: patientId,
//               doctor_id: doctorId,
//             },
//             (iQResult, isError) => {
//               if (isError == true) {
//                 return res.json({message: "Room creation failed", e: iQResult})
//               }
//               return res.json({message: "Room created", roomId})
//             }
//           )
//         } else if (isError == false && sQResult.length > 0) {
//           return res.json({
//             message: "Room exists",
//             roomId: sQResult[0].room_id,
//           })
//         }
//       }
//     )
//   }
// )

// const getSocket = (socket, io) => {

//   socket.on("go-online", ({userId}) => {
//     people[userId] = socket.id
//     sql.updateQuery(
//       "user",
//       {is_online: "true"},
//       async (uQResult, isError) => {
//         console.log(uQResult, "THIS IS UQ RESULT")
//         let allResults = []
//         Object.entries(people).forEach((entry) => {
//           allResults.push(entry[0])
//         })
//         if (allResults.length == Object.keys(people).length) {
//           sql.customQuery(
//             `SELECT * FROM user WHERE user_id  IN  ('${allResults}')`,
//             (cQResult, isError) => {
//               // if (isError == false) {
//               console.log(cQResult, "dsfsf")
//               // }
//             }
//           )
//         }
//       },
//       null,
//       true
//     )

//     // a string key
//     socket.broadcast.emit("all-online-users", people)
//   })
  
const getSocket = (socket, io) => {
  
  // socket.on("go-online", ({userId}) => {
  //   people[userId] = socket.id
  //   sql.updateQuery(
  //     "user",
  //     {is_online: "true"},
  //     async (uQResult, isError) => {
  //       console.log(uQResult, "THIS IS UQ RESULT")
  //       if(!isError){
  //         console.log("status changed to online")
  //       }
  //     },
  //     'user_id',
  //     userId
  //   )
  //   sql.selectQuery(
  //     "user",
  //     {},
  //     (sQResult, isError2) => {
  //       if(!isError2){
  //         console.log(sQResult,'all users result');
  //         socket.emit("all-online-users", sQResult)
  //       }
  //     },
  //     null,
  //     true
  //   )
  //   // a string key
  // })
  socket.on("go-online", ({userId}) => {
    const index = people.indexOf(userId)
    if(index===-1){
      people.push(userId)
    }
    
    sql.updateQuery(
      "user",
      {is_online: "true"},
      async (uQResult, isError) => {
        if(!isError){
          socket.emit("all-online-users", people)
          socket.broadcast.emit("all-online-users", people)
          console.log(uQResult, "user online result")
        }
        let allResults = []
        Object.entries(people).forEach((entry) => {
          allResults.push(entry[0])
        })
      },
      'user_id',
      userId
    )

    // a string key
  })

  socket.on("go-offline", ({userId}) => {
    const index = people.indexOf(userId)
    if(index>-1){
      people.splice(index,1);
    }
    console.log('go-offline fired');
    
    sql.updateQuery(
      "user",
      {is_online: "false",last_scene:Date()},
      async (uQResult, isError) => {
        console.log(uQResult, "THIS IS UQ RESULT")
        if(!isError){
          socket.broadcast.emit("all-online-users", people)
          console.log("status changed to offline")
          // sql.selectQuery(
          //   "user",
          //   {},
          //   (sQResult, isError2) => {
          //     if(!isError2){
          //       console.log(sQResult,'all users result');
          //     }
          //   },
          //   null,
          //   true
          // )
        }
      },
      'user_id',
      userId
    )
    
    // a string key
  })

  socket.on("open-room", (roomId, id) => {
    id = socket.id
    if(io.nsps['/'].adapter.rooms["room"] && io.nsps['/'].adapter.rooms["room"].length > 1) {
      socket.join("room-"+roomno);
    }else{
      io.sockets.adapter.add(id, roomId)
      socket.join("room-"+roomno);
    }
  })

  socket.on('create-room',(userId,roomId)=>{
    console.log(userId,roomId,'userId and RoomId');
      socket.join(roomId)
      io.sockets.in(roomId).emit('connectToRoom', roomId);
  })
 
  socket.on('send-private-message',(roomId,message)=>{
    console.log(roomId,message,'message sent');
    io.to(roomId).emit("recieve-private-message",message);
  })

  socket.on("typing",(roomName,userId)=>{
    console.log(`${userId} is typing`);
    socket.to(roomName).emit('someone-is-typing', userId);
  })
  socket.on("not-typing",(roomName,userId)=>{
    console.log('typing stoped')
    socket.to(roomName).emit('not-typing');
  })
  socket.on(
    "message",
    ({roomId, senderId, recieverId, message, messageDate, messageTime}) => {
      // console.log(
      //   roomId,
      //   senderId,
      //   recieverId,
      //   message,
      //   messageDate,
      //   messageTime
      // )
      
        socket.broadcast
          .to(recieverId)
          .emit("message-from-user", {message, messageDate, messageTime})
      
      sql.customQuery(
        `INSERT INTO chat (room_id,message_sender_id,message_reciever_id, message,message_date,message_time) VALUES('${roomId}','${senderId}','${recieverId}','${message}','${messageDate}','${messageTime}') `,
        (cQResult, isError) => {
          console.log(cQResult)
        }
      )
    }
  )

  function deleteByVal(val) {
    for (var key in people) {
      if (people[key] == val) {
        sql.updateQuery(
          "user",
          {is_online: "false"},
          (uQResult, isError) => {
            socket.broadcast.emit("socket-disconnect", key)
            delete people[key]
            delete io.sockets.adapter.rooms[socket.id] // ---- delete user from the online room
          },
          "user_id",
          key
        )
      }
    }
  }

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id)
    deleteByVal(socket.id) 
    socket.emit("all-online-users", people)// delete from pepople object and online room
    socket.broadcast.emit("all-online-users", people)// delete from pepople object and online room
    // console.log(people)
    // socket.broadcast.emit("online-users", people)
  })
}

module.exports = {
  // checkUnknownMacExists,
  getSocket,
}
