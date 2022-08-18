import React, { Component,useEffect } from 'react'
import ResponsiveDrawer from '../../components/drawer'
// import SearchIcon from '@material-ui/icons/Search';
// import CancelIcon from '@material-ui/icons/Cancel';
// import { TextField,OutlinedInput,InputAdornment,IconButton, } from '@material-ui/core'
import MyCard from '../../components/card'
import './assets/css/otherUsers.css'
import Footer from '../../components/footer/index'
import {getBlockedUsers,getFavouriteUsers,getFavouriteMe,getVisitedMe,getVisitedProfile,searchUsers,unblock,setUnfavourite,unViewApi} from '../../networking/api'
import {socket } from '../../networking/socket'
import MuiAlert from '@material-ui/lab/Alert';
import {Snackbar} from '@material-ui/core'

export default class OtherUser extends Component {
 constructor(){
     super();
    this.state={
        flag:false,
        allUsers:[],
        userListHead:'',
        blockedUsers:[],
        FavouriteUsers:[],
        FavouriteMe:[],
        visitedProfiles:[],
        visitedMe:[],
        searchedUsers:[],
        snackBarOpen: false,
        snackBarMsg: '',
        snackBarType: '',
        loader:true,
    }
 }
    

 snackBar(msg, type) {
    this.setState({ snackBarOpen: true, snackBarType: type, snackBarMsg: msg })
}
snackBarHandle = () => {
    this.setState({ snackBarOpen: false })
}
 gotoDetails(profile){
    this.props.history.push('/panel/profile',{me:this.props.location.state, user:profile  });
}
    componentDidMount(){
        // console.log("component did mount chala",this.props.location.state)
        if(this.props.category === 'blocked'){
            this.setState({userListHead:'Blocked Users'});
            this.getblockedUser();
        }
        else if(this.props.category === 'favourites'){
            this.setState({userListHead:'My Favourites'});
            this.getFavouriteUsers()
        }
        else if(this.props.category === 'favouriteMe'){
            this.setState({userListHead:'favourite Me'});
            this.getFavouriteMe()
        }
        else if(this.props.category === 'visitedProfiles'){
            this.setState({userListHead:'Visited Profiles'});
            this.getvisitedProfile()
        }
        else if(this.props.category === 'visitedMe'){
            this.setState({userListHead:'Visited Me'});
            this.getvisitedMe()
        }
        else if(this.props.category==='search'){
            this.setState({userListHead:'Advanced Search'});
            // var values = this.props.location.state.obj;
            // console.log("values",this.props.location.state)
            console.log('searching',this.props.location.state.users);
            this.setState({searchedUsers:this.props.location.state.users,loader:false})
            // this.search()
        }
        
    }
    componentWillMount(){
        // this.props.history.replace('', null);
    }
    getblockedUser(){
        var token = this.props.location.state.token
        var userId = this.props.location.state.userData.user_id
        getBlockedUsers(token,userId)
        .then((data)=>{
            console.log(data,'data in get block user')
            this.setState({blockedUsers:data.userData})
            this.setState({loader:false})
        })
        .catch((e)=>{
            console.log(e,'err in get block user')
        })
    }
    getFavouriteUsers(){
        var token = this.props.location.state.token
        var userId = this.props.location.state.userData.user_id
        getFavouriteUsers(token,userId)
        .then((data)=>{
            this.setState({loader:false})
            console.log(data,'data in get favourite user')
            this.setState({FavouriteUsers:data.userData})
        })
        .catch((e)=>{
            console.log(e,'err in get block user')
        })
    }
    getFavouriteMe(){
        var token = this.props.location.state.token
        var userId = this.props.location.state.userData.user_id
        getFavouriteMe(token,userId)
        .then((data)=>{
            console.log(data,'data in get favourite me')
            this.setState({FavouriteMe:data.userData})
            this.setState({loader:false})
        })
        .catch((e)=>{
            console.log(e,'err in get favourie me')
        })
    }
    getvisitedProfile(){
        var token = this.props.location.state.token
        var userId = this.props.location.state.userData.user_id
        getVisitedProfile(token,userId)
        .then((data)=>{
            console.log(data,'data in get visited profile')
            this.setState({visitedProfiles:data.userData}) 
            this.setState({loader:false})
        })
        .catch((e)=>{
            console.log(e,'err in get visited profile')
        })
    }
    getvisitedMe(){
        var token = this.props.location.state.token
        var userId = this.props.location.state.userData.user_id
        getVisitedMe(token,userId)
        .then((data)=>{
            console.log(data,'data in get visited me')  
            this.setState({loader:false})
            this.setState({visitedMe:data.userData})
        })
        .catch((e)=>{
            console.log(e,'err in get favourie me')
        })
    }

        myUnblock=(blocked_id)=>{
        var token = this.props.location.state.token
        var blocker_id = this.props.location.state.userData.user_id
        console.log("unblocking");
        var obj={blocker_id,blocked_id}
        unblock(token,obj).then((data)=>{
          console.log("data in unblock",data)
          this.snackBar("User Unblocked Successfully", "success");
          this.getblockedUser()
        }).catch((e)=>{
          console.log(e,'err in unbvlock')
        })
      }

      unfavourite=(favourite_choosed_id)=>{
        var token = this.props.location.state.token
        var favourite_chooser_id = this.props.location.state.userData.user_id
        var obj ={favourite_chooser_id,favourite_choosed_id}
        setUnfavourite(token,obj).then((data)=>{
            console.log(data,'data')
            this.snackBar("User Unfavourited Successfully", "success");
            this.getFavouriteUsers();
        }).catch((e)=>{
            console.log(e,'errrr')
        })
    }
    unViewProfile=(profile_viewed_uid)=>{
        var token = this.props.location.state.token;
        var profile_viewer_uid =  this.props.location.state.userData.user_id;
        var obj = {profile_viewer_uid,profile_viewed_uid};
        console.log(obj,'objjj')
        unViewApi(token,obj).then((data)=>{
            console.log(data,'data');
            this.snackBar("User UnViewed Successfully", "success");
            this.getvisitedProfile();
        }).catch((e)=>{
            console.log(e,'errrr')
        })
    }
    goToChat=(user)=>{
        this.props.history.push('/panel/chatbox',{...this.props.location.state,user});
    }
    render() {
        var myId = this.props.location.state.userData.user_id
        var myGender = this.props.location.state.userData.gender;
        let profileViewedFlag=false;
        let blockedFlag=false;
        let favouritesFlag=false;
        let getFavouriteMeFlag=false;
        let visitedMeFlag = false;
        let searchFlag = false;
        var loaderFlag = true;
        return (
            <ResponsiveDrawer userData={this.props.location.state}>
                <Snackbar open={this.state.snackBarOpen} autoHideDuration={6000} onClose={this.snackBarHandle}>
                    <MuiAlert elevation={6} variant="filled" onClose={this.snackBarHandle} severity={this.state.snackBarType}>
                        {this.state.snackBarMsg}
                    </MuiAlert>
                </Snackbar>
                        <div className='users-list-head'>
                            {this.state.userListHead}
                        </div>
                <div className='home-page-div'>   
                    <div className='users-list-div'>
                        {this.props.category === 'blocked' &&
                             this.state.blockedUsers && this.state.blockedUsers.map((e,i)=>{
                                loaderFlag=false;
                                console.log(e.is_online)
                                if(myGender!==e.gender){
                                    blockedFlag=true;
                                    return <MyCard goToChat={()=>this.goToChat(e)} user={e}  type="blocked" key={i} online={e.is_online} click={this.gotoDetails.bind(this,e)} 
                                    unblockFunc={this.myUnblock} userId={e.user_id} username={e.username} location='Gulshan-e-Iqbal,Karachi ,Sindh' age={23} tagline="tagline here"/>
                                }
                            })
                        }
                        {this.props.category === 'favourites' &&
                            this.state.FavouriteUsers &&  this.state.FavouriteUsers.map((e,i)=>{
                                console.log(e.is_online)
                                loaderFlag=false;
                                if(myGender!==e.gender){
                                    favouritesFlag=true;
                                    return <MyCard goToChat={()=>this.goToChat(e)} user={e} type="unfavourite" unfavouriteFunc={this.unfavourite} userId={e.user_id} key={i} online={e.is_online} click={this.gotoDetails.bind(this,e)} username={e.username} location='Gulshan-e-Iqbal,Karachi ,Sindh' age={23} tagline="tagline here"/>
                                }
                            })
                        }
                         {this.props.category === 'favouriteMe' &&
                            this.state.FavouriteMe && this.state.FavouriteMe.map((e,i)=>{
                                console.log(e.is_online)
                                loaderFlag=false;
                                if(myGender!==e.gender){
                                    getFavouriteMeFlag=true;
                                    return <MyCard goToChat={()=>this.goToChat(e)} user={e} key={i} online={e.is_online} click={this.gotoDetails.bind(this,e)} username={e.username} location='Gulshan-e-Iqbal,Karachi ,Sindh' age={23} tagline="tagline here"/>
                                }
                            })
                        }
                            {this.props.category === 'visitedProfiles' &&
                            this.state.visitedProfiles && this.state.visitedProfiles.map((e,i)=>{
                                console.log(e.is_online)
                                if(this.props.location.state.userData.user_id !== e.user_id){
                                    if(myGender!==e.gender){
                                        loaderFlag=false;
                                        profileViewedFlag=true;
                                        return <MyCard goToChat={()=>this.goToChat(e)} user={e} userId={e.user_id} type={"visitedProfiles"} unViewProfile={this.unViewProfile} key={i} online={e.is_online} click={this.gotoDetails.bind(this,e)} username={e.username} location='Gulshan-e-Iqbal,Karachi ,Sindh' age={23} tagline="tagline here"/>
                                    }
                                }
                            })
                        }
                            {this.props.category === 'visitedMe' &&
                           this.state.visitedMe && this.state.visitedMe.map((e,i)=>{
                                console.log(e.is_online)
                                if(myGender!==e.gender){
                                    loaderFlag=false;
                                    visitedMeFlag=true;
                                    return <MyCard goToChat={()=>this.goToChat(e)} key={i} user={e} online={e.is_online} click={this.gotoDetails.bind(this,e)} username={e.username} location={e.address} age={23} tagline={e.tagline}/>
                                }
                            }) }
                        {
                            this.props.category === 'search' && 
                            // this.state.searchedUsers && this.state.searchedUsers.length===0 ? 'No User with these features' 
                             this.state.searchedUsers &&  this.state.searchedUsers.map((e,i)=>{
                                 if(myGender!==e.gender && myId!==e.user_id){
                                    loaderFlag=false;
                                    searchFlag=true;
                                    return <MyCard goToChat={()=>this.goToChat(e)}  key={i} user={e} online={e.is_online} click={this.gotoDetails.bind(this,e)} username={e.username} location={e.address} age={e.age} tagline={e.tagline}/>
                                }
                            
                            })
                        }
                        {
                        !profileViewedFlag && !blockedFlag && !favouritesFlag && !getFavouriteMeFlag && !visitedMeFlag && !searchFlag && !this.state.loader &&
                        <div>
                            No user related to this tab    
                        </div>

                        }
                        {this.state.loader && 
                            <div className='loader-div'>
                                <img className='loader-img' src={require('../../assets/loader.gif')}/>
                            </div>}
                        
                            
                    </div>

                </div>
                {/* <div style={{bottom:'0px'}}> */}
                <Footer/>
                {/* </div> */}
            </ResponsiveDrawer>
        )
    }


}
