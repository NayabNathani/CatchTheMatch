import React, { Component, useEffect } from 'react'
import ResponsiveDrawer from '../../components/drawer'
// import SearchIcon from '@material-ui/icons/Search';
// import CancelIcon from '@material-ui/icons/Cancel';
// import { TextField,OutlinedInput,InputAdornment,IconButton, } from '@material-ui/core'
import MyCard from '../../components/card'
// import './assets/app.css'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { BottomNavigation, Button, CircularProgress,Snackbar } from '@material-ui/core'
import Footer from '../../components/footer/index'
import { getAllUsers, checkBlockApi, checkFavouriteApi, setUnfavourite, checkChatroomApi, sendMessageApi, getMessagesApi } from '../../networking/api'
import { socket } from '../../networking/socket'
import { Avatar, CardHeader,IconButton } from '@material-ui/core'
import moment from 'moment'
import SendIcon from '@material-ui/icons/Send';
import './assets/css/app.css'
import MuiAlert from '@material-ui/lab/Alert';
const abusiveRegex = /\b(shit|fuck|pagal|dafa|lesbian|gay|shemale|[http])\b/igms
const urlRegex = /(([a-z]|\d|\+|-|\.)):(\/\/(((([a-z]|\d|-|\.|_|~|[\x00A0-\xD7FF\xF900-\xFDCF\xFDF0-\xFFEF])|(%[\da-f]{2})|[!\$&'\(\)\\+,;=]|:)@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.||~|[\x00A0-\xD7FF\xF900-\xFDCF\xFDF0-\xFFEF])|(%[\da-f]{2})|[!\$&'\(\)\\+,;=]))(:\d*)?)(\/(([a-z]|\d|-|\.||~|[\x00A0-\xD7FF\xF900-\xFDCF\xFDF0-\xFFEF])|(%[\da-f]{2})|[!\$&'\(\)\\+,;=]|:|@))|(\/((([a-z]|\d|-|\.|_|~|[\x00A0-\xD7FF\xF900-\xFDCF\xFDF0-\xFFEF])|(%[\da-f]{2})|[!\$&'\(\)\\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\x00A0-\xD7FF\xF900-\xFDCF\xFDF0-\xFFEF])|(%[\da-f]{2})|[!\$&'\(\)\\+,;=]|:|@)))?)|((([a-z]|\d|-|\.|_|~|[\x00A0-\xD7FF\xF900-\xFDCF\xFDF0-\xFFEF])|(%[\da-f]{2})|[!\$&'\(\)\\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\x00A0-\xD7FF\xF900-\xFDCF\xFDF0-\xFFEF])|(%[\da-f]{2})|[!\$&'\(\)\\+,;=]|:|@)))|((([a-z]|\d|-|\.|_|~|[\x00A0-\xD7FF\xF900-\xFDCF\xFDF0-\xFFEF])|(%[\da-f]{2})|[!\$&'\(\)\\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\x00A0-\xD7FF\xF900-\xFDCF\xFDF0-\xFFEF])|(%[\da-f]{2})|[!\$&'\(\)\\+,;=]|:|@)|[\xE000-\xF8FF]|\/|\?))?(\#((([a-z]|\d|-|\.|_|~|[\x00A0-\xD7FF\xF900-\xFDCF\xFDF0-\xFFEF])|(%[\da-f]{2})|[!\$&'\(\)\\+,;=]|:|@)|\/|\?))?/igms
export default class Chatbox extends Component {
    constructor() {
        super();
        this.state = {
            flag: false,
            allUsers: [],
            onlineUsers: [],
            flag: false,
            loading: true,
            loader: true,
            message: '',
            allMessages: [],
            typing: '',
            me: null,
            otherUser: null,
            snackBarOpen: false,
            snackBarMsg: '',
            snackBarType: '',
        }
    }

    componentDidMount() {
        console.log("component did mount chala", this.props.location.state)
        var me = this.props.location.state.userData;
        var otherUser = this.props.location.state.user;
        this.setState({ me, otherUser });
        if (socket.connected) {
            console.log(socket.id, 'already connected in home page')
        } else {
            socket.on("connect", () => {
                console.log(socket.id, "connection made in home page");
            })
        }
        var roomId = `${me.user_id}${otherUser.user_id}`.split('').sort().join('');
        this.setState({ roomId });
        console.log(roomId, 'roomID');
        socket.emit('create-room', me.user_id, roomId);
        // var user = this.props.location.state && this.props.location.state.userData;

        socket.on('connectToRoom', (roomName) => {
            console.log('You are in room no. ', roomName)
        })
        socket.on('recieve-private-message', (message) => {
            console.log('message aaya bhai', message);
            let { allMessages } = this.state;
            var newMessages = [...allMessages, message];
            // allMessages.append(message);
            this.setState({ allMessages: newMessages });
        })
        socket.on('someone-is-typing', userId => {
            console.log(userId, 'msg in someone is typin');
            if (userId === this.state.otherUser.user_id) {
                this.setState({ typing: `${this.state.otherUser.username} is typing...` });
            }

        })
        socket.on('not-typing', () => {

            console.log('msg in someone is not typing');
            // typingPara.style.display="none"
            this.setState({ typing: '' });
        })

        this.getMessages(me.user_id, otherUser.user_id);
        this.scrollToBottom();
        document.getElementById('input').addEventListener('keydown',(e)=>{
            console.log(e.key,e.keyCode,'ketttt')
            if (e.keyCode === 13) { 
                this.sendMessage();
        }
        })

    }
    getMessages = (user_1, user_2) => {
        // const  {me,otherUser} =this.state;
        var token = this.props.location.state.token;
        var obj = { user_1, user_2 };
        getMessagesApi(token, obj).then((res) => {
            console.log(res, 'res in get messages');
            this.setState({ allMessages: res.result });
        })
            .catch((e) => {
                console.log(e, 'err');
            })
    }
    sendMessage = () => {

        const { me, otherUser, message, roomId } = this.state;
        var token = this.props.location.state.token;
        var abusiveMessage = message.match(abusiveRegex);
        var urlMessage = message.match(urlRegex);
        if (message !== '' || message !== ' ') {
            if(abusiveMessage){
                this.snackBar("Cannot use Abusive Words","error")
                this.setState({message:''});
            }
            else if(urlMessage){
                this.snackBar("Cannot send URLs","error");
                this.setState({message:''});
            }
            else{               
            var msgObj = { sender: me.user_id, reciever: otherUser.user_id, message };
            var obj = { user_1: me.user_id, user_2: otherUser.user_id, chatId: this.state.roomId };
            socket.emit("send-private-message", roomId, msgObj);
            checkChatroomApi(token, obj).then((res) => {
                console.log(res, 'res in send message');
                if (res.success) {
                    sendMessageApi(token, msgObj).then((res) => {
                        this.setState({message:''});
                        console.log(res, 'res after message saved');
                        this.scrollToBottom();
                    })
                        .catch((e) => {
                            console.log(e, 'err in message sent')
                        })
                } 
            }).catch(e => {
                console.log(e, 'err in send message');
            })
        }
        }
    }
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }
      componentDidUpdate(){
          this.scrollToBottom();
      }
      
    snackBar(msg, type) {
        this.setState({ snackBarOpen: true, snackBarType: type, snackBarMsg: msg })
    }
    snackBarHandle = () => {
        this.setState({ snackBarOpen: false })
    }

    render() {
        // const myGender = this.props.location.state.userData && this.props.location.state.userData.gender; 
        const { me, otherUser } = this.state;
        return (
            <ResponsiveDrawer userData={this.props.location.state}>
                <Snackbar open={this.state.snackBarOpen} autoHideDuration={6000} onClose={this.snackBarHandle}>
                    <MuiAlert elevation={6} variant="filled" onClose={this.snackBarHandle} severity={this.state.snackBarType}>
                        {this.state.snackBarMsg}
                    </MuiAlert>
                </Snackbar>
                <div className='chatbox-div'>
                    <div className='chatbox-head'>
                        <div className='chatbox-profile-pic-div'>
                            <img src={otherUser && otherUser.profile ? `http://localhost:9000/${otherUser.profile}` : require('../../assets/user.png')} />
                        </div>
                         &nbsp; {otherUser && otherUser.username}
                    </div>
                    <div className='all-messages-div'>
                        {
                            this.state.allMessages && this.state.allMessages.map((e) => {
                                if (e.sender === me.user_id) {
                                    return <div className='message-div-reverse'>
                                        <div className='message-text-div-reverse'>
                                            <p>{e.message}</p>
                                        </div>
                                        <div style={{fontSize:12,color:'#333333'}}> {moment(e.timestamp).fromNow()} </div>
                                    </div>
                                } else {
                                    return <div className='message-div'>
                                        <div className='message-text-div'>
                                            <p>{e.message}</p>
                                        </div>
                                        <div style={{fontSize:12,color:'#333333'}}> {moment(e.timestamp).fromNow()} </div>
                                    </div>
                                }
                            })
                        }
                        <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                    </div>
                    <div className='typing-div'>
                        {this.state.typing}
                    </div>
                    
                    <div className='message-input-div'>
                        <input
                            id='input'
                            className='my-message-input'
                            onKeyUp={() => { socket.emit("typing", this.state.roomId, me.user_id) }}
                            onBlur={() => { socket.emit("not-typing", this.state.roomId, me.user_id) }}
                            value={this.state.message}
                            placeholder='Type here...'
                            onChange={(event) => { this.setState({ message: event.target.value }) }} />
                        <Button className='sendbtn' onClick={this.sendMessage}>
                            <SendIcon fontSize={'large'}/>
                        </Button>
                    </div>
                </div>
                <Footer />
            </ResponsiveDrawer>
        )
    }


}
