import { BrowserRouter, Route } from "react-router-dom";
import React from 'react'
import * as Routes from '../screens/index'
// import io from "socket.io-client";
// const ENDPOINT = "http://192.168.1.105:9000";
// const socket = io(ENDPOINT)
// const socket = 'dasdasd'

function Navigation(){
    return(
     <BrowserRouter>
        <Route exact path='/' component={Routes.Login} />
        <Route path='/signup' component={Routes.Signup} />
        <Route path='/panel/users' component={(props)=>{return <Routes.Home  {...props}
        //  socket={socket}
         />}} />
        <Route path='/panel/profile' component={(props)=>{return <Routes.DetailedView  {...props} />}} />
        <Route path='/panel/myprofile' component={Routes.MyProfile} />
        <Route path='/panel/search' component={Routes.AdvanceSearch} />
        <Route path='/panel/blocked' component={(props)=>{return <Routes.OtherUsers {...props}  category='blocked' />}} />
        <Route path='/searchresults' component={(props)=>{return <Routes.OtherUsers {...props}  category='search' />}} />
        <Route path='/panel/favourites' component={(props)=>{return <Routes.OtherUsers {...props}  category='favourites' />}} />
        <Route path='/panel/favouriteMe' component={(props)=>{return <Routes.OtherUsers {...props}  category='favouriteMe' />}} />
        <Route path='/panel/visitedProfiles' component={(props)=>{return <Routes.OtherUsers {...props}  category='visitedProfiles' />}} />
        <Route path='/panel/visitedMe' component={(props)=>{return <Routes.OtherUsers {...props}  category='visitedMe' />}} />
        <Route path='/panel/chats' component={(props)=>{return <Routes.Chatrooms {...props} />}} />
        <Route path='/panel/chatbox' component={(props)=>{return <Routes.Chatbox {...props} />}} />
        <Route path='/panel/requests' component={(props)=>{return <Routes.Requests {...props} />}} />
     </BrowserRouter>
 )
}

export default Navigation
