import React, { Component } from 'react'
import ResponsiveDrawer from '../../components/drawer'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import StarIcon from '@material-ui/icons/Star';
import ReportIcon from '@material-ui/icons/Report';
import BlockIcon from '@material-ui/icons/Block';
import TabPanel from '../../components/otherTab/index'
import { Tooltip, Snackbar,Modal,TextField, Button } from '@material-ui/core'
// import CheckIcon from '@material-ui/icons/Check';
// import CloseIcon from '@material-ui/icons/Close';
import Footer from '../../components/footer/index'
import { socket } from '../../networking/socket'
import MuiAlert from '@material-ui/lab/Alert';
import moment from 'moment'
import { blockUser, favouriteUser, profileViewed, reportUser } from '../../networking/api'
import './detailedView.css'

export default class DetailedView extends Component {
    state = {
        user: {},
        snackBarOpen: false,
        snackBarMsg: '',
        snackBarType: '',
        modal:false,
        report_message:'',
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
        console.log(this.props.location.state, 'props')
        this.setState({ user: this.props.location.state.user })
        this.setView()
    }
    blockUser = () => {
        var blocker_uid = this.props.location.state.me.userData.user_id;
        var blocked_uid = this.state.user.user_id
        var obj = { blocker_uid, blocked_uid }
        console.log(obj, 'objjj')
        var token = this.props.location.state.me.token;
        blockUser(token, obj).then((data) => {
            console.log("dataaaa in block", data)
            if (data.message === 'user blocked') {
                this.snackBar("User Blocked", "success");
            } else {
                this.snackBar("User Already Blocked", "success");
            }
        })
            .catch((e) => {
                console.log(e, 'e')
            })

    }
    setFavourite = () => {
        var uid = this.props.location.state.me.userData.user_id;
        var favourite_uid = this.state.user.user_id
        var obj = { uid, favourite_uid }
        console.log(obj, 'objjj')
        var token = this.props.location.state.me.token;
        favouriteUser(token, obj).then((data) => {
            console.log("dataaaa in favourite", data)
            if (data.message === 'added to favourites') {
                this.snackBar("User Added to Favourites", "success");
            } else {
                this.snackBar("User Already in Favourites", "success");
            }
        })
            .catch((e) => {
                console.log(e, 'e')
            })

    }
    setReport = () => {
        this.setState({modal:true})
    }
    setView = () => {
        var uid = this.props.location.state.me.userData.user_id;
        var uidOfProfile = this.props.location.state.user.user_id
        var obj = { uid, uidOfProfile }
        console.log(obj, 'objjjj in set view')
        var token = this.props.location.state.me.token;
        console.log('setting view');
        profileViewed(token, obj).then((data) => {
            console.log("data in set view", data);
        })
            .catch((e) => {
                console.log(e, 'errr')
            })
    }
    snackBar(msg, type) {
        this.setState({ snackBarOpen: true, snackBarType: type, snackBarMsg: msg })
    }
    snackBarHandle = () => {
        this.setState({ snackBarOpen: false })
    }
    report=()=>{
        this.setState({modal:false})
        var reporter_id = this.props.location.state.me.userData.user_id;
        var reported_id = this.props.location.state.user.user_id;
        var report_message = this.state.report_message;
        var token = this.props.location.state.token;
        reportUser(token,{reporter_id,reported_id,report_message}).then((data)=>{
            console.log(data,'data in report');
            if (data.message === 'user reported') {
                this.snackBar("User Reported Successfully", "success");
            } else {
                this.snackBar("User Already in Reported list", "success");
            }
            
        })
        .catch((err)=>{
            this.snackBar("Something went wrong", "error");
            console.log(err,'err in report')
        })
    }

    render() {
        const { user } = this.state;
        return (
            <ResponsiveDrawer userData={this.props.location.state.me}>
                
                <Snackbar open={this.state.snackBarOpen} autoHideDuration={6000} onClose={this.snackBarHandle}>
                    <MuiAlert elevation={6} variant="filled" onClose={this.snackBarHandle} severity={this.state.snackBarType}>
                        {this.state.snackBarMsg}
                    </MuiAlert>
                </Snackbar>
                <div className='detailedView'>
                    <div className='profile-info'>
                        <div className='profile-pic-div'>
                            <img alt='profile-pic' className='profile-pic' src={require('../../assets/user.png')} />
                        </div>
                        <div className='info-div'>
                            <div className='info-text'> {user && user.username}</div>
                            <div className='info-text'> {user && user.tagline}</div>
                            <div className='info-text'> {user && user.city},{user.state},{user.country}</div>
                            <div className='info-text'> {user && user.is_online === 'true' ? "Online" : `Last seen: ${moment(user.last_scene).fromNow()}`}</div>
                        </div>
                        <div className='icons-div'>
                            <div>
                                <Tooltip title="Send Message" aria-label="Send Message">
                                    <ChatBubbleIcon className='icons-div-icons' fontSize='large' />
                                </Tooltip>
                                <Tooltip onClick={this.setFavourite} title='Favorite' aria-label="Favorite">
                                    <FavoriteIcon className='icons-div-icons' fontSize='large' />
                                </Tooltip>
                            </div>
                            <div>
                                {/* <StarIcon className='icons-div-icons' fontSize='large' /> */}
                                <Tooltip onClick={this.setReport} title='Report' aria-label="Report">
                                    <ReportIcon className='icons-div-icons' fontSize='large' />
                                </Tooltip>
                                <Tooltip onClick={this.blockUser} title='Block User' aria-label="Block User">
                                    <BlockIcon className='icons-div-icons' fontSize='large' />
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <div className='tabs-div'>
                        <TabPanel userData={this.props.location.state} />
                    </div>
                    {/* <div className='floating-buttons-div'>
                        <div className='floating-btn-div'>
                            <Fab color="primary" aria-label="add">
                                <CheckIcon className='floating-btns'/>
                            </Fab>
                        </div>
                        <div className='floating-btn-div'>
                            <Fab color="secondary" aria-label="add">
                                <CloseIcon className='floating-btns' />
                            </Fab>
                        </div>
                    </div> */}
                </div>
                <Modal
                style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}
                    open={this.state.modal}
                    onClose={()=>{this.setState({modal:false})}}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className='modal-div'>
                        <div className='modal-head'>
                            Report User
                        </div> 
                        <div className="modal-form-text">
                            Enter your Reason to report the user
                        </div>
                        <div className='modal-content'>
                        <TextField
                        fullWidth
                    value={this.state.report_message}
                    onChange={(t)=>this.setState({report_message:t.target.value})}
                    id="outlined-multiline-static"
                    label="Reason"
                    rows={4}
                    multiline
                    variant="outlined"
                  />
                        </div>
                        <div className='modal-footer'>
                            <Button onClick={this.report} color="secondary" variant="contained">Report</Button>
                            <Button onClick={()=>{this.setState({modal:false})}} color="secondary" variant="outlined">Cancel</Button>
                        </div>
                    </div>
                </Modal>
                <Footer />
            </ResponsiveDrawer>
        )


    }

}