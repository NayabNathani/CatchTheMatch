import React, { Component } from 'react'
import { Paper, Tabs, Tab } from '@material-ui/core'
import { uploadPhotoApi, getPhotosApi, deletePhotoApi } from '../../networking/api'
import { Card, CardMedia, CardActions, Button, IconButton, Tooltip } from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import DeleteIcon from '@material-ui/icons/Delete';
import './assets/css/app.css'

export default class MyPhotoComponent extends Component {
    state = {
        tab: 0,
        photo: '',
        publicPhotos: [],
        privatePhotos: [],

    }
    componentDidMount() {
        console.log('myphotoTab khulaa')
        console.log(this.props.userData, 'user data in photos tab');
        this.getPhotos('public');
    }
    uploadPictures = (photo, type) => {
        console.log('uploading picture');
        var token = this.props.userData.token;
        var uid = this.props.userData.userData.user_id;
        // photo.name = uid + new Date(Date.now());
        // console.log(photo,'name of file');
        uploadPhotoApi(token, photo, { uid, type }).then((res) => {
            // console.log(res, 'res');
            this.getPhotos(type);
        })
            .catch((e) => console.log(e, 'err'))

    }
    getPhotos(type) {
        var token = this.props.userData.token;
        var uid = this.props.userData.userData.user_id;
        getPhotosApi(token, { uid, type }).then((res) => {
            // console.log(res, 'res');
            this.setState({ [`${type}Photos`]: res.result });
        })
            .catch((e) => {
                console.log(e, 'err');
            })
    }
    deletePhoto(photoUrl, type) {
        var token = this.props.userData.token;
        deletePhotoApi(token, { photoUrl }).then((res) => {
            console.log(res, 'res in delete photos');
            this.getPhotos(type);
        })
            .catch((e) => console.log(e, 'err'));
    }
    render() {
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
                    <Tab onClick={() => this.getPhotos('private')} label="private Photos" />
                </Tabs>
                {
                    this.state.tab === 0 &&
                    <div className='public-photos-div'>
                        {/* <div className='upload-div'>
                            <input
                                title="Upload Photo"
                                type="file"
                                onChange={(event) => { this.setState({ photo: event.target.files[0] }) }} />
                            <button onClick={()=>this.uploadPhoto('public')}>Upload</button>
                        </div> */}

                        <div className='images-div'>
                            <Card className='add-photo-card'>
                                <input onChange={(e) => {
                                    this.uploadPictures(e.target.files[0], 'public');
                                }}
                                    accept="image/*" style={{ display: 'none' }} id="icon-button-pic-file" type="file" />
                                <label htmlFor="icon-button-pic-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <Tooltip title='Add Photo'>
                                            <PhotoCamera fontSize={"large"} />
                                        </Tooltip>
                                    </IconButton>
                                </label>
                            </Card>

                            {
                                this.state.publicPhotos && this.state.publicPhotos.map((e) => {
                                    var url = `http://localhost:9000/${e.photoUrl}`;
                                    return (
                                        <Card className='photo-card'>
                                            <CardMedia
                                                className='card-photo'
                                                image={url}
                                            />
                                            <CardActions disableSpacing>
                                                <IconButton onClick={() => this.deletePhoto(e.photoUrl, 'public')}>
                                                    <DeleteIcon color='secondary' fontSize={'large'} />
                                                </IconButton>
                                            </CardActions>
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
                        {/* <div className='upload-div'>
                            <input
                                title="Upload Photo"
                                type="file"
                                onChange={(event) => { this.setState({ photo: event.target.files[0] }) }} />
                            <button onClick={() => this.uploadPictures("private")}>Upload</button>
                        </div> */}
                        <div className='images-div'>
                            <Card className='add-photo-card'>
                                <input onChange={(e) => {
                                    this.uploadPictures(e.target.files[0], 'private');
                                }}
                                    accept="image/*" style={{ display: 'none' }} id="icon-button-private-pic-file" type="file" />
                                <label htmlFor="icon-button-private-pic-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <Tooltip title='Add Photo'>
                                            <PhotoCamera fontSize={"large"} />
                                        </Tooltip>
                                    </IconButton>
                                </label>
                            </Card>
                            {
                                this.state.privatePhotos && this.state.privatePhotos.map((e) => {
                                    var url = `http://localhost:9000/${e.photoUrl}`;
                                    return (
                                        <Card className='photo-card'>
                                            <CardMedia
                                                className='card-photo'
                                                image={url}
                                            />
                                            <CardActions disableSpacing>
                                                {/* <Button aria-label="add to favorites">
                                                    Add to Public
                                            </Button> */}
                                                <IconButton onClick={() => this.deletePhoto(e.photoUrl, 'private')}>
                                                    <DeleteIcon color='secondary' fontSize={'large'} />
                                                </IconButton>
                                            </CardActions>
                                        </Card>
                                    )
                                })
                            }

                        </div>
                    </div>
                }

            </Paper>
            // </div> 
        )



    }


}