import React, { Component } from 'react'
import ResponsiveDrawer from '../../components/drawer'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import StarIcon from '@material-ui/icons/Star';
import ReportIcon from '@material-ui/icons/Report';
import BlockIcon from '@material-ui/icons/Block';
import TabPanel from '../../components/tabs/index'
import { Tooltip, Snackbar } from '@material-ui/core'
// import CheckIcon from '@material-ui/icons/Check';
// import CloseIcon from '@material-ui/icons/Close';
import Footer from '../../components/footer/index'
import { socket } from '../../networking/socket'
import MuiAlert from '@material-ui/lab/Alert';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { Fab, TextField,IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import moment from 'moment'
import { blockUser, favouriteUser, sendDataToDB, getUser, uploadProfileApi } from '../../networking/api'
import './assets/css/myprofile.css'

export default class MyProfile extends Component {
    state = {
        user: {},
        snackBarOpen: false,
        snackBarMsg: '',
        snackBarType: '',
        editTagline: false,
        tagline: '',
    }
    componentDidMount() {
        // console.log("comp did mount in detailview")
        if (socket.connected) {
            console.log(socket.id, 'already connected in detail page')
        } else {
            socket.on("connect", () => {
                console.log(socket.id, "connection made in detail page")
            })
        }
        this.getUser();
        console.log(this.props.location.state, 'props in my profile')
        // this.setState({ user: this.props.location.state.userData })

    }
    getUser = () => {
        console.log(this.props.location.state, 'prrops state')
        var token = this.props.location.state.userData.token;
        var userId = this.props.location.state.userData.user_id;
        getUser(token, { userId }).then((data) => {
            console.log(data, 'user');
            this.setState({ user: data.userData, tagline: data.userData.tagline })
        }).catch((e) => {
            console.log(e, 'error')
        })
    }
    handleFile(e) {
        var userId = this.props.location.state.userData.user_id;
        this.setState({ file: { ...e.target.files[0], uid: userId } });
    }

    snackBar(msg, type) {
        this.setState({ snackBarOpen: true, snackBarType: type, snackBarMsg: msg })
    }
    snackBarHandle = () => {
        this.setState({ snackBarOpen: false })
    }
    updateProfile = () => {
        var token = this.props.location.state.userData.token;
        const { tagline } = this.state;
        var obj = { tagline };
        var body = { id: this.props.location.state.userData.user_id, updateBody: obj };
        sendDataToDB(token, body).then((e) => {
            console.log(e, 'data in body')
            this.setState({ editTagline: false })
            this.getUser();
        })
            .catch((err) => {
                console.log(err, 'error in body')
                this.setState({ editTagline: false })
            })
    }
    uploadProfile = (file) => {
        var token = this.props.location.state.userData.token;
        var uid = this.props.location.state.userData.user_id;
        console.log(uid, 'userId');
        // const { file } = this.state;
        uploadProfileApi(token, file, uid).then((res) => {
            this.snackBar("Profile Updated Successfully","success");
            this.getUser();
            console.log(res, 'res');
        })
            .catch((e) => console.log(e, 'err'))
    }

    render() {
        const { user } = this.state;
        return (
            <ResponsiveDrawer userData={this.props.location.state}>
                <Snackbar open={this.state.snackBarOpen} autoHideDuration={6000} onClose={this.snackBarHandle}>
                    <MuiAlert elevation={6} variant="filled" onClose={this.snackBarHandle} severity={this.state.snackBarType}>
                        {this.state.snackBarMsg}
                    </MuiAlert>
                </Snackbar>
                <div className='detailedView'>
                    <div className='profile-info'>
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            <div className='profile-pic-div'>
                                <img alt='profile-pic' className='profile-pic' src={user.profile ? `http://localhost:9000/${user.profile}` : require('../../assets/user.png')} />
                            </div>
                            <div>
                                    <input onChange={(e) =>{
                                        this.uploadProfile(e.target.files[0]);
                                    }} 
                                accept="image/*" style={{display:'none'}} id="icon-button-file" type="file" />
                                    <label htmlFor="icon-button-file">
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <Tooltip title='Upload Profile Picture'>
                                                <PhotoCamera fontSize={"large"} />
                                            </Tooltip>
                                        </IconButton>
                                    </label>
                            </div>
                        </div>
                        <div className='info-div'>
                            <div className='info-text'> {user && user.username}</div>
                            {
                                this.state.editTagline ?
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className='table-field-value'>
                                        <TextField
                                            value={this.state.tagline}
                                            onChange={(t) => this.setState({ tagline: t.target.value })}
                                            id="outlined-basic" label="Enter Tagline"
                                        />
                                             &nbsp;
                                        <div>
                                            <Fab onClick={this.updateProfile} size={'small'} color="primary" aria-label="Save">
                                                <CheckIcon />
                                            </Fab>&nbsp;
                                        <Fab onClick={() => this.setState({ editTagline: false })} size={'small'} color="secondary" aria-label="Save">
                                                <CloseIcon />
                                            </Fab>
                                        </div>
                                    </div>
                                    : <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className='info-text'> {user && user.tagline}  &nbsp; <Tooltip onClick={() => { this.setState({ editTagline: true }) }} title='Edit' aria-label="Edit">
                                        <EditIcon />
                                    </Tooltip> </div>
                            }
                            <div className='info-text'> {user && user.city},{user.state},{user.country}</div>
                            <div className='info-text'> {user && user.is_online === 'true' ? "Online" : moment(user.last_scene).fromNow()}</div>
                        </div>
                    </div>
                    <div className='tabs-div'>
                        <TabPanel updateProfile={(data) => {
                            this.getUser();
                        }} userData={this.props.location.state} />
                    </div>
                </div>
                <Footer />
            </ResponsiveDrawer >
        )


    }

}