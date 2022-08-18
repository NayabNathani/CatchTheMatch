import React, { Component } from 'react'
import { Paper, Tabs, Tab } from '@material-ui/core'
import {  getPhotosApi,checkAccessApi,requestAccessApi } from '../../networking/api'
import {Card,CardMedia,CardActions,Button,IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import './assets/css/app.css'

export default class PhotoTab extends Component {
    state = {
        tab: 0,
        photo: '',
        publicPhotos: [],
        privatePhotos: [],
        access:null,

    }
    componentDidMount() {
        console.log(this.props.userData, 'user data in photos tab');
        this.getPhotos('public');
        this.checkAccess();
    }
    getPhotos(type) {
        var token = this.props.userData.me.token;
        var uid = this.props.userData.user.user_id;
        getPhotosApi(token, { uid, type }).then((res) => {
            console.log(res, 'res');
            this.setState({ [`${type}Photos`]: res.result });
        })
            .catch((e) => {
                console.log(e, 'err');
            })
    }
    checkAccess(){
        var token = this.props.userData.me.token;
        var access_reciever = this.props.userData.me.userData.user_id;
        var access_provider = this.props.userData.user.user_id;
        checkAccessApi(token,{access_reciever,access_provider}).then((res)=>{
            console.log(res,'res in check access');
            this.setState({access:res.result});
        }).catch(e=>console.log(e,'err in check access'));
    }
    requestAcess=()=>{
        var token = this.props.userData.me.token;
        var access_reciever = this.props.userData.me.userData.user_id;
        var access_provider = this.props.userData.user.user_id;
        var obj = {access_provider,access_reciever,access:null};
        requestAccessApi(token,obj).then((res)=>{
            console.log(res,'res in req access');
        })
        .catch((e)=>console.log(e,'err in req access'))
    }
    render() {
        console.log(this.state.access,'access')
        return (
            // <div className=''>
            <Paper className='photos-tab-div'>
                <Tabs
                    value={this.state.tab}
                    onChange={(event, val) => {
                        console.log(val, 'vLLLLL')
                        this.setState({ tab: val });
                    }}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Public Photos" />
                    <Tab onClick={()=>this.getPhotos('private')} label="private Photos" />
                </Tabs>
                {
                    this.state.tab === 0 &&
                    <div className='public-photos-div'>
                        <div className='images-div'>
                            
                        {
                            this.state.publicPhotos && this.state.publicPhotos.map((e) => {
                                var url = `http://localhost:9000/${e.photoUrl}`;
                                return (
                                    <Card className='photo-card'>
                                        <CardMedia
                                            className='card-photo'
                                            image={url}
                                        />
                                    </Card>
                                )
                            })
                        }
                        
                        </div>
                    </div>
                }
                {
                    this.state.tab === 1 &&
                    <div className='public-photos-div'>
                        <div className='images-div'>
                            
                        {
                            this.state.access && this.state.access.access &&
                            this.state.privatePhotos && this.state.privatePhotos.map((e) => {
                                var url = `http://localhost:9000/${e.photoUrl}`;
                                return (
                                    <Card className='photo-card'>
                                        <CardMedia
                                            className='card-photo'
                                            image={url}
                                        />
                                    </Card>
                                )
                            })
                        }
                        {
                        this.state.access === undefined && 
                            <div className='access-request-div'>
                                <p>You have no access to see this user's Private Photos </p>
                                <Button onClick={this.requestAcess}>Send Request for Access</Button>
                            </div>
                        }
                        {
                        this.state.access && this.state.access.access===0 &&
                            <div className='access-request-div'>       
                                <p>Please wait for the user to access accept the request</p>
                                {/* <Button onClick={this.requestAcess}>Send Request for Access</Button> */}
                            </div>
                        }
                        
                        </div>
                    </div>
                }

            </Paper>
            // </div> 
        )



    }


}