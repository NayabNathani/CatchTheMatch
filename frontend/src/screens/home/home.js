import React, { Component,useEffect } from 'react'
import ResponsiveDrawer from '../../components/drawer'
// import SearchIcon from '@material-ui/icons/Search';
// import CancelIcon from '@material-ui/icons/Cancel';
// import { TextField,OutlinedInput,InputAdornment,IconButton, } from '@material-ui/core'
import MyCard from '../../components/card'
import '../home/home.css'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import {CircularProgress} from '@material-ui/core'
import Footer from '../../components/footer/index'
import {getAllUsers,checkBlockApi,checkFavouriteApi,setUnfavourite} from '../../networking/api'
import {socket } from '../../networking/socket'

export default class Home extends Component {
 constructor(){
     super();
    this.state={
        flag:false,
        allUsers:[],
        onlineUsers:[],
        flag:false,
        loading:true,
        loader:true,
    }
    // socket.on('all-online-users',(people)=>{
    //     console.log(people,'people')
    //     this.setState({allUsers:people})
    // })
    // socket.on("socket-disconnect",(key)=>{
    //     console.log("disconnected",key)
    //     var userId = this.props.location.state.userData.user_id;
    //     socket.emit("go-offline",{userId});
    // })
    // socket.on('disconnect',()=>{
    //     console.log('disconnected')
    //     var userId = this.props.location.state.userData.user_id;
    //     socket.emit("go-offline",{userId});
        
    // })
    socket.on('all-online-users',(people)=>{
        console.log(people,'got users from socket');
        this.setState({onlineUsers:people})
        this.getUsers();
    })
 }
    
//  unfavourite=(favourite_choosed_id)=>{
//     var token = this.props.location.state.token
//     var favourite_chooser_id = this.props.location.state.userData.user_id
//     var obj ={favourite_chooser_id,favourite_choosed_id}
//     setUnfavourite(token,obj).then((data)=>{
//         console.log(data,'data');
//         this.getFavouriteList();
//     }).catch((e)=>{
//         console.log(e,'errrr')
//     })
//   }
    
    gotoDetails(profile){
        this.props.history.push('/panel/profile',{me:this.props.location.state, user:profile  });
    }
    componentDidMount(){
        // console.log("component did mount chala",this.props.location.state)
        if(socket.connected){
            console.log(socket.id,'already connected in home page')
        }else{
            socket.on("connect",()=>{
                console.log(socket.id,"connection made in home page");
                
            })
        }
        var user = this.props.location.state && this.props.location.state.userData
        user && socket.emit("go-online",{userId:user.user_id});
        // socket.on('disconnect',()=>{
        //     console.log("disconnect called")
        // var user = this.props.location.state && this.props.location.state.userData
        //     socket.emit('go-offline',{userId:user.user_id})
        // })
        this.getUsers();

        window.addEventListener('beforeunload', (ev) => {
            var user = this.props.location.state && this.props.location.state.userData
            console.log("unload chala")
            socket.emit('go-offline',{userId:user.user_id})
         })
         this.getBlockedList();
         this.getFavouriteList();
        // if(user.is_online==='false'){
        // }
       
        
        
    }
    getUsers(){
        var token = this.props.location.state.token;
        getAllUsers(token).then((data)=>{
            // console.log(data,'all users')
            this.setState({loading:false})
            this.setState({allUsers:data.userData,loader:false})
        })
        .catch((e)=>{
            console.log("get all users error",e)
        })
    }
    checkOnline(id){
        // const {onlineUsers} = this.state;
        for(var i=0;i<this.state.onlineUsers.length;i++){
            if(this.state.onlineUsers[i] === id){
                // console.log(true,'user online')
                return true;
            }
        }
        // console.log(true,'user offline')
        return false;
    }
    getBlockedList=async () =>{
        var token = this.props.location.state.token;
        var blocker_id = this.props.location.state.userData.user_id;
        await checkBlockApi(token,{blocker_id}).then((data)=>{
            console.log(data,'data in check block')
            if(data.message==='success'){
               this.setState({blockedUsers:data.userData})
            } 
        })
        .catch((e)=>{
            console.log(e,'err in block check')
        })
    }
    getFavouriteList=async () =>{
        var token = this.props.location.state.token;
        var favourite_chooser_id = this.props.location.state.userData.user_id;
        await checkFavouriteApi(token,{favourite_chooser_id}).then((data)=>{
            console.log(data,'data in fav block')
            if(data.message==='success'){
               this.setState({favouriteUsers : data.userData})
            } 
        })
        .catch((e)=>{
            console.log(e,'err in block check')
        })
    }
    checkBlocked=(blocked_id)=>{
        // const {blockedUsers} = this.state;
        for(var i=0;i<this.state.blockedUsers.length; i++){
            if(this.state.blockedUsers[i].blocked_id===blocked_id){
                return true;
            }
        }
        return false;
    }
    checkFavourite=(favourite_choosed_id)=>{
        for(var i=0;i<this.state.favouriteUsers.length; i++){
            if(this.state.favouriteUsers[i].favourite_choosed_id===favourite_choosed_id){
                return true;
            }
        }
        return false;
    }
    goToChat=(user)=>{
        this.props.history.push('/panel/chatbox',{...this.props.location.state,user});
    }
    render() {
        let flag=false;
        const myGender = this.props.location.state.userData && this.props.location.state.userData.gender; 
        return (
            <ResponsiveDrawer userData={this.props.location.state}>
                        <div className='online-users-list-head'>
                            Online Users
                        </div>
                <div className='home-page-div'>   
                        {/* <CircularProgress style={!this.state.loading && {display:'none'}}/> */}
                        {this.state.loader && <div className='loader-div'>
                                <img className='loader-img' src={require('../../assets/loader.gif')}/>
                            </div>}
                    <div className='users-list-div'>
                        {this.state.allUsers && this.state.favouriteUsers && this.state.blockedUsers && this.state.allUsers.map((e,i)=>{
                            var userId = this.props.location.state.userData.user_id;
                            if(userId!==e.user_id && myGender!==e.gender){
                                if(e.is_online=='true'){
                                    flag=true;
                                    console.log(e,'eeeee')
                                    if(this.checkBlocked(e.user_id)){
                                        return <MyCard 
                                        goToChat={()=>this.goToChat(e)}
                                        user={e} type={"blockedUser"} key={i} online={e.is_online} click={this.gotoDetails.bind(this,e)} username={e.username} location={e.address} age={e.age} tagline={e.tagline}/>
                                    }
                                    else if(this.checkFavourite(e.user_id)){
                                        return <MyCard 
                                        user={e}
                                        goToChat={()=>this.goToChat(e)}
                                        type={'favouriteUser'} key={i} online={"true"} click={this.gotoDetails.bind(this,e)} username={e.username} location={e.address} age={e.age} tagline={e.tagline}/>
                                    }
                                    else{
                                        return <MyCard goToChat={()=>this.goToChat(e)} user={e} key={i} online={"true"} click={this.gotoDetails.bind(this,e)} username={e.username} location={e.address} age={e.age} tagline={e.tagline}/>
                                    }
                                }

                            }
                            
                        }) }
                        {
                            !flag && !this.state.loading && 
                            <div style={{fontSize:24,fontWeight:'500',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                <SentimentVeryDissatisfiedIcon fontSize={'large'}/>
                                No User Online Right Now
                            </div>
                        }
                    
                            
                    </div>

                </div>
                <Footer/>
            </ResponsiveDrawer>
        )
    }


}
