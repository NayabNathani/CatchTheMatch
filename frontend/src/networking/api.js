import {ip} from '../config/config'
// const ipAddress ="192.168.43.96";
const base_url = `http://${ip}:9000/www.secondzoja.com/v1`

export const signUp=async (userObj)=>{
    Object.entries(userObj).forEach(entry=>{
        console.log(entry,"entry")
    })
    // var signupCreds = {email:userObj.email, password:userObj.password} 
    var res =await fetch(`${base_url}/register-user`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userObj),
    })
    return res.json()

}

export const signIn=async (userObj)=>{
    Object.entries(userObj).forEach(entry=>{
        console.log(entry,"entry")
    })
    var res =await fetch(`${base_url}/login-user`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userObj),
    })
    return res.json()

}

export const forgetPassword = async (userObj)=>{
    Object.entries(userObj).forEach(entry=>{
        console.log(entry,"entry")
    })
    var res =await fetch(`${base_url}/forget-password`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userObj),
    })
    return res.json()

}
export const getAllUsers = async (token)=>{

    
 var res =await fetch(`${base_url}/all-users`, {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "authorization":`Bearer ${token}`
        },
    })
    return res.json()
}

export const getBlockedUsers = async (token,userId)=>{

    
    var res =await fetch(`${base_url}/blocked-users`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify({userId})
       })
       return res.json()
   }

   
export const getFavouriteUsers = async (token,userId)=>{

    
    var res =await fetch(`${base_url}/favourite-users`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify({userId})
       })
       return res.json()
   }

      
export const getFavouriteMe = async (token,userId)=>{

    
    var res =await fetch(`${base_url}/favourite-me`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify({userId})
       })
       return res.json()
   }

   export const getVisitedProfile = async (token,userId)=>{

    
    var res =await fetch(`${base_url}/visited-profile`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify({userId})
       })
       return res.json()
   }

   export const getVisitedMe = async (token,userId)=>{

    
    var res =await fetch(`${base_url}/visited-me`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify({userId})
       })
       return res.json()
   }

   export const blockUser = async (token,obj)=>{
    var res =await fetch(`${base_url}/profile/block`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify(obj)
       })
       return res.json()
   }
   export const reportUser = async (token,obj)=>{
    var res =await fetch(`${base_url}/profile/report`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify(obj)
       })
       return res.json()
   }

   export const favouriteUser = async (token,obj)=>{
    var res =await fetch(`${base_url}/profile/favourite`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify(obj)
       })
       return res.json()
   }

   export const sendDataToDB = async (token,obj)=>{
    var res =await fetch(`${base_url}/profile/updateProfile`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify(obj)
       })
       return res.json()
   }

   export const getUser = async (token,obj)=>{
    var res =await fetch(`${base_url}/getUser`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify(obj)
       })
       return res.json()
   }
   export const searchUsers = async (token,obj)=>{
    var res =await fetch(`${base_url}/search`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify(obj)
       })
       return res.json()
   }

   export const profileViewed = async (token,obj)=>{
    var res =await fetch(`${base_url}/profile/viewed`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify(obj)
       })
       return res.json()
   }
   export const unblock = async (token,obj)=>{
    var res =await fetch(`${base_url}/profile/unblock`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify(obj)
       })
       return res.json()
   }
   export const unViewApi = async (token,obj)=>{
    var res =await fetch(`${base_url}/profile/unView`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify(obj)
       })
       return res.json()
   }

   export const setUnfavourite = async (token,obj)=>{
    var res =await fetch(`${base_url}/profile/unfavourite`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify(obj)
       })
       return res.json()
   }
   export const checkBlockApi = async (token,obj)=>{
    var res =await fetch(`${base_url}/checkblock`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify(obj)
       })
       return res.json()
   }
   export const checkFavouriteApi = async (token,obj)=>{
    var res =await fetch(`${base_url}/checkFavourite`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify(obj)
       })
       return res.json()
   }

   export const uploadProfileApi = async (token,file,uid)=>{
       let form = new FormData();
       console.log(file,'fileee in frontend')
       form.append('profile',file);
       form.append('uid',uid);
    var res =await fetch(`${base_url}/uploadProfile`, {
           method:"POST",
           headers:{
            //    "Content-Type":"multipart/form-data",
               "authorization":`Bearer ${token}`
           },
           body:form
       })
       return res.json()
   }
   export const uploadPhotoApi = async (token,file,{uid,type})=>{
       let form = new FormData();
       console.log(`uploading ${type} picture`);
       console.log(file,'file in upload file')
       form.append('photo',file);
       form.append('uid',uid);
       form.append('type',type);
    var res =await fetch(`${base_url}/uploadPhoto`, {
           method:"POST",
           headers:{
            //    "Content-Type":"multipart/form-data",
               "authorization":`Bearer ${token}`
           },
           body:form
       })
       return res.json()
   }
   export const getPhotosApi = async (token,obj)=>{
    var res =await fetch(`${base_url}/getPhotos`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify(obj)
       })
       return res.json()
   }
   export const deletePhotoApi = async (token,obj)=>{
    var res =await fetch(`${base_url}/deletePhoto`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify(obj)
       })
       return res.json()
   }
   export const checkAccessApi = async (token,obj)=>{
    var res =await fetch(`${base_url}/checkAccess`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify(obj)
       })
       return res.json()
   }
    export const requestAccessApi = async (token,obj)=>{
    var res =await fetch(`${base_url}/requestAccess`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify(obj)
       })
       return res.json()
   }
    export const checkChatroomApi = async (token,obj)=>{
    var res =await fetch(`${base_url}/checkChatroom`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify(obj)
       })
       return res.json()
   }
    export const sendMessageApi = async (token,obj)=>{
    var res =await fetch(`${base_url}/sendMessage`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify(obj)
       })
       return res.json()
   }
    export const getMessagesApi = async (token,obj)=>{
    var res =await fetch(`${base_url}/getMessages`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify(obj)
       })
       return res.json()
   }
    export const getChatsApi = async (token,obj)=>{
    var res =await fetch(`${base_url}/getChats`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify(obj)
       })
       return res.json()
   }
    export const getRequestsApi = async (token,obj)=>{
    var res =await fetch(`${base_url}/getRequests`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify(obj)
       })
       return res.json()
   }
    export const changeAccessApi = async (token,obj)=>{
    var res =await fetch(`${base_url}/changeAccess`, {
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               "authorization":`Bearer ${token}`
           },
           body:JSON.stringify(obj)
       })
       return res.json()
   }