import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { socket } from "../networking/socket";


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  cardicons:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:'100%'
  },
  usernamediv:{
    display:'flex',justifyContent:'space-between',alignItems:'center'
  }
});





export default function MyCard(props) {
  const classes = useStyles();

  const startChat=(data)=>{
    props.goToChat(data);
    // socket.emit("open-room",12,34)
  }
 
  return (
    <Card key={props.key}  style={{margin:10,width:'300px'}} className={classes.root}>
      <CardActionArea onClick={props.click}>
        <CardMedia
          component="img"
          alt="Profile Picture"
          height="140"
          image={require('../assets/user.png')}
          title="Profile Picture"
        />
        <CardContent>
          <Typography className={classes.usernamediv} gutterBottom variant="h5" component="h2">
            {/* {props.username} <FiberManualRecordIcon fontSize={'small'} style={props.online==="true" ? {color:'#00FF00'} : {color:'gray'}}/> */}
            {props.username} {props.online=== "true" ? <FiberManualRecordIcon fontSize={'small'} style={{color:'#00FF00'}}/> : '' } 
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           {props.tagline}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.age} { props.user && props.user.city},{ props.user && props.user.state},{ props.user && props.user.country}
          </Typography>
        </CardContent>
      </CardActionArea>
      {
        (props.type === 'blocked') &&
        <CardActions className={classes.cardicons}>
        <Button onClick={props.click} size="small" color="primary">
          <VisibilityIcon/>
        </Button>
        <Button onClick={()=>props.unblockFunc(props.userId)} size="small" color="secondary">
          Unblock
        </Button>
      </CardActions> }
      {
        (props.type === 'unfavourite') &&
        <CardActions className={classes.cardicons}>
        <Button onClick={props.click} size="small" color="primary">
          <VisibilityIcon/>
        </Button>
        <Button onClick={()=>props.unfavouriteFunc(props.userId)} size="small" color="secondary">
          unfavourite
        </Button>
      </CardActions> }
      {
        props.type==='blockedUser' && 
        <CardActions className={classes.cardicons}>
        <Button onClick={props.click} size="small" color="primary">
          <VisibilityIcon/>
        </Button>
        <Button disabled onClick={()=>props.unfavouriteFunc(props.userId)} size="small" color="primary">
          Blocked
        </Button>
      </CardActions>
      }
      {
        props.type==='favouriteUser' && 
        <CardActions className={classes.cardicons}>
        <Button onClick={()=>{startChat(props.user)}} size="small" color='primary'>
          <ChatBubbleIcon/>
        </Button>
        <Button onClick={props.click} size="small" color="primary">
          <VisibilityIcon/>
        </Button>
        <Button 
        // onClick={()=>{props.setUnfavouriteFunc(props.userId)}} 
        size="small" color="secondary">
          <FavoriteIcon/>
        </Button>
      </CardActions>
      }
      {
        props.type==='visitedProfiles' && 
        <CardActions className={classes.cardicons}>
        <Button onClick={()=>{startChat(props.user)}} size="small" color='primary'>
          <ChatBubbleIcon/>
        </Button>
        <Button onClick={props.click} size="small" color="primary">
          <VisibilityIcon/>
        </Button>
        <Button 
        onClick={()=>{props.unViewProfile(props.userId)}} 
        size="small" color="secondary">
          {/* <FavoriteIcon/> */}
          Delete
        </Button>
      </CardActions>
      }
      {
      props.type===undefined && <CardActions className={classes.cardicons}>
        <Button size="small" color='primary' onClick={()=>{startChat(props.user)}}>
          <ChatBubbleIcon/>
        </Button>
        <Button onClick={props.click} size="small" color="primary">
          <VisibilityIcon/>
        </Button>
        <Button size="small" color="primary">
          <FavoriteIcon/>
        </Button>
      </CardActions>
      }

    </Card>
  );
}