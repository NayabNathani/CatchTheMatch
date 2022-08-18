import React, { Component, useEffect } from 'react'
import ResponsiveDrawer from '../../components/drawer'
// import SearchIcon from '@material-ui/icons/Search';
// import CancelIcon from '@material-ui/icons/Cancel';
import { CardHeader, Avatar, IconButton, } from '@material-ui/core'
import MyCard from '../../components/card'
// import './assets/app.css'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { CircularProgress } from '@material-ui/core'
import Footer from '../../components/footer/index'
import { getAllUsers, checkBlockApi, checkFavouriteApi, setUnfavourite, getChatsApi, getUser } from '../../networking/api'
import { socket } from '../../networking/socket'
import moment from 'moment'
import './assets/css/app.css'
export default class Chatrooms extends Component {
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
        }
        socket.on('all-online-users', (people) => {
            console.log(people, 'got users from socket');
            this.setState({ onlineUsers: people })
            // this.getUsers();
        })
    }
    getChats = (me) => {
        // const {me} = this.state;
        console.log(me, 'meee')
        var token = this.props.location.state.token;
        var obj = { user_1: me.user_id };
        getChatsApi(token, obj).then((res) => {
            console.log(res, 'res in get chats');
            this.setState({ chats: res.result });
            var chats = [];
            res.result.map((e) => {
                console.log(e, 'each chat');
                if (e.user_1 !== me.user_id) {
                    getUser(token, { userId: e.user_1 }).then((user) => {
                        console.log(user, 'user milaa')
                        chats.push({ ...e, user: user.userData });
                        this.setState({ chats });
                    })
                } else {
                    getUser(token, { userId: e.user_2 }).then((user) => {
                        console.log(user, 'user milaa')
                        chats.push({ ...e, user: user.userData });
                        this.setState({ chats });
                    })
                }
            })
            console.log(this.state.chats, 'chatssss');
        })
            .catch((e) => {
                console.log(e, 'err in get chats');
            })


    }

    componentDidMount() {
        console.log("component did mount chala in Chatsssss", this.props.location.state)
        if (socket.connected) {
            console.log(socket.id, 'already connected in home page')
        } else {
            socket.on("connect", () => {
                console.log(socket.id, "connection made in home page");

            })
        }
        var me = this.props.location.state && this.props.location.state.userData;
        this.setState({ me });
        this.getChats(me);



    }
    goToChatbox=(e)=>{
        this.props.history.push('/panel/chatbox',{...this.props.location.state, user:e.user});
    }

    render() {
        const myGender = this.props.location.state.userData && this.props.location.state.userData.gender;
        return (
            <ResponsiveDrawer userData={this.props.location.state}>
                <div className='chatrooms-main-div'>                
                    <div className='chats-list-head'>
                        Chats
                            </div>
                    <div className='chats-list-div'>
                        {
                            this.state.chats && this.state.chats[0] && this.state.chats[0].user && this.state.chats.map((e) => {
                                console.log(e, 'chat item');
                                return <div onClick={()=>this.goToChatbox(e)} className='chatroom-item'>
                                            <div className='chatroom-profile-name-div'>
                                                <div className='chatroom-profile-div'>
                                                    <img src={e.user && e.user.profile ? `http://localhost:9000/${e.user.profile}`: require('../../assets/user.png')}/>
                                                </div>
                                                <div className='chatroom-item-name'> {e.user && e.user.username}</div>    
                                             </div>
                                             <div className='chatroom-online-status-div'>
                                                 {e.user && (e.user.is_online === 'true') ? 'Online' : moment(e.user && e.user.last_scene).fromNow()}
                                             </div>
                                        </div>
                                
                                // <CardHeader className='item-card' onClick={()=>this.goToChatbox(e)}
                                //     avatar={
                                //         <Avatar className='profile-pic-div' aria-label="recipe">
                                //             {e.user.profile && <img src={`http://localhost:9000/${e.user.profile}`} />}
                                //         </Avatar>
                                //     }
                                //     action={
                                //         <div className='online-status-div'>
                                            // {e.user.is_online === 'true' ? 'Online' : moment(e.user.last_scene).fromNow()}
                                //         </div>
                                //     }
                                //     title={e.user.username}
                                //     subheader={e.user.tagline}
                                // />
                            })
                        }
                    </div>               
                </div>
                <Footer />
            </ResponsiveDrawer>
        )
    }


}
