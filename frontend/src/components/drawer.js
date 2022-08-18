import React, { useState ,useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import { CardHeader, Avatar, Collapse } from '@material-ui/core'
// import BallotIcon from '@material-ui/icons/Ballot';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PeopleIcon from '@material-ui/icons/People';
import SearchIcon from '@material-ui/icons/Search';
import BlockIcon from '@material-ui/icons/Block';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ContactlessIcon from '@material-ui/icons/Contactless';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ChatIcon from '@material-ui/icons/Chat';
import VisibilityIcon from '@material-ui/icons/Visibility';
import StarsIcon from '@material-ui/icons/Stars';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useHistory } from 'react-router-dom'
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { Button,Popover,Typography } from '@material-ui/core'
import { socket } from '../networking/socket'
import {getRequestsApi,getUser} from '../networking/api'
import './drawer.css'
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            }
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
            // width:'100%'
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        sublinks: {
            marginLeft: 20
        },
        appbaricons: {
            // border:'1px solid black',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            padding: 0, margin: 0


        },
        icons: {
            color: '#757575',
            width: 50
            // padding:20
        },
        notificationItem:{
            border:"1px solid red",
        }
        // avatar:{

        // }
    }),
);

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}


export default function ResponsiveDrawer(props: Props) {
    const [collapse1, setCollapse1] = useState(false);
    const [collapse2, setCollapse2] = useState(false);
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [requests, setRequests] = React.useState([]);
    const userData = props.userData;
    console.log(userData, 'user data in drawer')
    useEffect(()=>{
        getRequests(userData.userData);
    },[])
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const history = useHistory();
    const logout = () => {
        history.push('/');
        socket.emit('go-offline', { userId: userData.userData.user_id })
    }
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const getRequests=(me)=>{
        var obj = {access_provider:me.user_id};
        var token  = userData.token;
        getRequestsApi(token,obj).then((res)=>{
            console.log(res,'res in requests drawer');
            if(res.success){
                var requests=[];
                res.result.map((e) => {
                    console.log(e, 'each request');
                        getUser(token, { userId: e.access_reciever }).then((user) => {
                            console.log(user, 'user milaa');
                            requests.push({ ...e, user: user.userData });
                            setRequests(requests);
                        })
                })
                console.log(requests,'request');
            }
        })
        .catch(e=>{
            console.log(e,'err in  request access');
        })
    
        }
    // const getNotifications = ()=>{
    //     var uid = userData.userData.user_id;
    // }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            {/* <Button> */}
            <CardHeader
                onClick={() => { history.push('/panel/myprofile', userData) }}
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <img style={{ width: '100%', alignItems: 'center' }} src={userData.userData && userData.userData.profile ? `http://localhost:9000/${userData.userData.profile}`:require("../assets/user.png")} />
                    </Avatar>
                }
                title={userData.userData ? userData.userData.username : 'UserName'}
                subheader="Online"
            />
            {/* </Button> */}
            <Divider />
            <List>
                {[{ name: 'Online Users', route: '/panel/users' }, { name: 'Search', route: '/panel/search' }].map((text, index) => (
                    <ListItem onClick={() => { history.push(text.route, props.userData && props.userData) }} button key={index}>
                        <ListItemIcon>{index ? <SearchIcon /> : <PeopleIcon />}</ListItemIcon>
                        <ListItemText primary={text.name} />
                    </ListItem>
                ))}
                <ListItem onClick={() => { setCollapse1(!collapse1) }} button key={'views'}>
                    <ListItemIcon><VisibilityIcon /></ListItemIcon>
                    <ListItemText primary={'Views'} />
                    {!collapse1 ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                </ListItem>
                <Collapse in={collapse1}>
                    <List>
                        <ListItem onClick={() => { history.push("/panel/visitedProfiles", props.userData && props.userData) }} className={classes.sublinks} button key={'views1'}>
                            <ListItemIcon><SubdirectoryArrowRightIcon /></ListItemIcon>
                            <ListItemText primary={'Visited Profile'} />
                        </ListItem>
                        <ListItem onClick={() => { history.push("/panel/visitedMe", props.userData && props.userData) }} className={classes.sublinks} button key={'views2'}>
                            <ListItemIcon><SubdirectoryArrowLeftIcon /></ListItemIcon>
                            <ListItemText primary={'Visited Me'} />
                        </ListItem>
                    </List>
                </Collapse>

                <ListItem onClick={() => { setCollapse2(!collapse2) }} button key={'fav'}>
                    <ListItemIcon><FavoriteIcon /></ListItemIcon>
                    <ListItemText primary={'Favourites'} />
                    {!collapse1 ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                </ListItem>
                <Collapse in={collapse2}>
                    <List>
                        <ListItem onClick={() => { history.push("/panel/favourites", props.userData && props.userData) }} className={classes.sublinks} button key={'fav1'}>
                            <ListItemIcon><FavoriteBorderIcon /></ListItemIcon>
                            <ListItemText primary={'My Favourites'} />
                        </ListItem>
                        <ListItem onClick={() => { history.push("/panel/favouriteMe", props.userData && props.userData) }} className={classes.sublinks} button key={'fav2'}>
                            <ListItemIcon><StarsIcon /></ListItemIcon>
                            <ListItemText primary={'Favorited Me'} />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
            {/* <Divider /> */}
            <List>
                <ListItem onClick={()=>history.push('/panel/requests',props.userData && props.userData)} button key={'Requests'}>
                    <ListItemIcon><PersonAddIcon /></ListItemIcon>
                    <ListItemText primary={'Requests'} />
                </ListItem>
                <ListItem onClick={() => { history.push("/panel/blocked", props.userData && props.userData) }} button key={'Blocked'}>
                    <ListItemIcon><BlockIcon /></ListItemIcon>
                    <ListItemText primary={'Blocked'} />
                </ListItem>
                {/* <ListItem button key={'Subscription'}>
                    <ListItemIcon><ContactlessIcon /></ListItemIcon>
                    <ListItemText primary={'Subscription'} />
                </ListItem>
                <ListItem button key={'Upgrade'}>
                    <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
                    <ListItemText primary={'Upgrade'} />
                </ListItem>
                <ListItem button key={'Verify Identity'}>
                    <ListItemIcon><VerifiedUserIcon /></ListItemIcon>
                    <ListItemText primary={'Verify Identity'} />
                </ListItem> */}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    const flag=false;
    return (
        <div className={classes.root}>
            <CssBaseline />

            <AppBar color='inherit' className={classes.appBar}>

                <Toolbar style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <IconButton
                        // style={{border:'1px solid green'}}
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.appbaricons}>
                        <Button onClick={() => { history.push('/panel/myprofile', userData) }}>
                            <AccountCircleIcon fontSize='large' className={classes.icons} />
                        </Button>
                        <Button onClick={()=>{history.push("/panel/chats",userData)}}>
                            <ChatIcon fontSize='large' className={classes.icons} />
                        </Button>
                        {/* <Button aria-describedby={id} onClick={handleClick}>
                            <NotificationsIcon fontSize='large' className={classes.icons} />
                        </Button> */}
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            {/* {

                            } */}
                            <div> 
                               {
                                   
                                   requests && requests.length && requests[0].user && requests.map((e) => {
                                // console.log(e, 'chat item');
                                if(e.access === null){
                                flag=true;
                                return <div onClick={()=>history.push('/panel/requests',props.userData && props.userData)} className='notification-item'>
                                            <div className='noti-profile-name-div'>
                                                <div className='noti-profile-div'>
                                                    <img src={`http://localhost:9000/${e.user.profile}`}/>
                                                </div>
                                                <div className='noti-text'> 

                                                        <span>{e.user.username + ' ' }</span>
                                                        has requested the access for private photos
                                                </div>    
                                             </div>
                                        </div>        
                                }
                            })
                        }
                        {
                            !flag && <div className='notification-item'>No Notification Right now</div>
                        }
                            </div>
                        </Popover>
                        <Button onClick={logout} variant="outlined" >
                            logout
                            </Button>
                    </div>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh' }} className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
    );
}