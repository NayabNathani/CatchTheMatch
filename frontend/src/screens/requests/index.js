import React, { Component, useEffect } from 'react'
import ResponsiveDrawer from '../../components/drawer'
// import SearchIcon from '@material-ui/icons/Search';
// import CancelIcon from '@material-ui/icons/Cancel';
import { CardHeader, Avatar, IconButton, Button,Snackbar } from '@material-ui/core'
import MyCard from '../../components/card'
// import './assets/app.css'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { CircularProgress } from '@material-ui/core'
import Footer from '../../components/footer/index'
import { getRequestsApi, getUser, changeAccessApi} from '../../networking/api'

import MuiAlert from '@material-ui/lab/Alert';
import { socket } from '../../networking/socket'
import moment from 'moment'
import './assets/css/app.css'
export default class Requests extends Component {
    constructor() {
        super();
        this.state = {
            flag: false,
            allUsers: [],
            onlineUsers: [],
            flag: false,
            loading: true,
            loader: true,
            me: null,
            requests:[],
            snackBarOpen: false,
            snackBarMsg: '',
            snackBarType: '',
        }
        socket.on('all-online-users', (people) => {
            console.log(people, 'got users from socket');
            this.setState({ onlineUsers: people })
            // this.getUsers();
        })
    }
    snackBar(msg, type) {
        this.setState({ snackBarOpen: true, snackBarType: type, snackBarMsg: msg })
    }
    snackBarHandle = () => {
        this.setState({ snackBarOpen: false })
    }

    componentDidMount() {
        console.log("component did mount chala in requests", this.props.location.state);
        if (socket.connected) {
            console.log(socket.id, 'already connected in home page')
        } else {
            socket.on("connect", () => {
                console.log(socket.id, "connection made in home page");
            })
        }
        var me = this.props.location.state && this.props.location.state.userData;
        this.setState({ me });
        this.getRequests(me);
    }

    getRequests=(me)=>{
    var obj = {access_provider:me.user_id};
    var token  = this.props.location.state.token;
    getRequestsApi(token,obj).then((res)=>{
        console.log(res,'res in requests');
        if(res.success){
            var requests=[];
            res.result.map((e) => {
                console.log(e, 'each request');
                    getUser(token, { userId: e.access_reciever }).then((user) => {
                        console.log(user, 'user milaa');
                        requests.push({ ...e, user: user.userData });
                        this.setState({ requests });
                    })
            })
            console.log(this.state.requests,'request');
        }
    })
    .catch(e=>{
        console.log(e,'err in  request access');
    })

    }
    changeAccess=(e,accessVal)=>{
    // e.access = accessVal;
    var  obj = {access_provider:e.access_provider, access_reciever:e.access_reciever, access:accessVal};
    var token  = this.props.location.state.token;
        console.log(e,'ee in change access');
        changeAccessApi(token,obj).then((res)=>{
            console.log(res,'resss in change access');
            this.snackBar("Access Successfully Changed", "success");
            this.getRequests(this.state.me);
        })
        .catch(e=>{
            console.log(e,'err in change access');
            this.snackBar("Something went wrong", "error");
        })
    }
    render() {
        const myGender = this.props.location.state.userData && this.props.location.state.userData.gender;
        return (
            <ResponsiveDrawer userData={this.props.location.state}>
                <Snackbar open={this.state.snackBarOpen} autoHideDuration={6000} onClose={this.snackBarHandle}>
                    <MuiAlert elevation={6} variant="filled" onClose={this.snackBarHandle} severity={this.state.snackBarType}>
                        {this.state.snackBarMsg}
                    </MuiAlert>
                </Snackbar>
                <div className='chatrooms-main-div'>                
                    <div className='chats-list-head'>
                        Private Photos Access Requests
                            </div>
                    <div className='chats-list-div'>
                        {
                            this.state.requests && this.state.requests.length &&this.state.requests[0].user && this.state.requests.map((e) => {
                                console.log(e, 'chat item');
                                return <div className='request-item'>
                                            <div className='chatroom-profile-name-div'>
                                                <div className='chatroom-profile-div'>
                                                    <img src={`http://localhost:9000/${e.user.profile}`}/>
                                                </div>
                                                <div className='chatroom-item-name'> {e.user.username}</div>    
                                             </div>
                                              
                                            { (e.access === null) && <div className='request-item-buttons-div'>
                                                <Button onClick={()=>this.changeAccess(e,true)}>
                                                    Accept
                                                </Button>
                                                <Button onClick={()=>this.changeAccess(e,false)}>
                                                    Reject
                                                </Button>
                                             </div>
                                             }
                                              
                                            { (e.access === 1) && <div className='request-item-buttons-div'>
                                                <Button onClick={()=>this.changeAccess(e,false)}>
                                                    Remove Access
                                                </Button>
                                             </div>
                                             }
                                              
                                            { (e.access === 0) && <div className='request-item-buttons-div'>
                                                <Button onClick={()=>this.changeAccess(e,true)}>
                                                    Accept
                                                </Button>
                                             </div>
                                             }
                                        </div>
                            })
                        }
                    </div>               
                </div>
                <Footer />
            </ResponsiveDrawer>
        )
    }


}
