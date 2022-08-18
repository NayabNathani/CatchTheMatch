import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { Tooltip, Fab,TextField,Snackbar,MenuItem ,CircularProgress} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import MuiAlert from '@material-ui/lab/Alert';
// import {updateProfile} from '../../networking/api'
import './assets/css/tabs.css'
import { set } from 'date-fns';
import MyPhotoTab from '../../components/myphototab/index'
import csc from 'country-state-city'

import {ethnic_origins,nationalities,ageList,personalityStyleList,willingToMoveList,personalWealthList,childrenList,siblingsList,
maritalStatusList,religiousAffiliationList,livingStatusList,dietList,smokingList,educationList,professionList,ambitionList,eyeColorList,
hairColorList,bodyTypeList,heightList,disabilityList,polygamyList,profileCreatedByList,fatherAliveList,motherAliveList,drinkList,languageList,secondLanguageList} from './assets/files/data'
console.log(personalityStyleList,'lists')
const {sendDataToDB,getUser} = require('../../networking/api')
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  editicon: {
    color: '#1976D2',
  },
}));

export default function TabsWrappedLabel(props) {
  const countries = csc.getAllCountries();
  const [userData, setUserData] = useState(null);
  const setStates=(user)=>{
    setAboutMe(user.about_me)
    setWorkLife(user.work_life)
    setAboutSeekingPerson(user.about_seeking_person)
    setBornIn(user.born_in)
    setAddress(user.address)
    setAge(user.age)
    setGender(user.gender)
    setEthnicOrigin(user.ethnic_origin)
    setNationality(user.nationality)
    setPersonalityStyle(user.personality_style)
    setPersonalWealth(user.personal_wealth)
    setMaritalStatus(user.marital_status)
    setReligiousAffiliation(user.religious_affiliation)
    setChildren(user.children)
    setSiblings(user.siblings)
    setLivingStatus(user.livingStatus)
    setWillingToMove(user.willing_to_move)
    setDiet(user.diet)
    setSmoking(user.smoking)
    setEducation(user.education)
    setProfession(user.profession)
    setAmbition(user.ambition)
    setEyeColor(user.eye_color)
    setHairColor(user.hair_color)
    setBodyType(user.body_type)
    setHeight(user.height)
    setDisability(user.disability)
    setAcceptPolygamy(user.accept_polygamy)
    setProfileCreatedBy(user.profile_created_by)
    setFatherAlive(user.father_alive)
    setMotherAlive(user.mother_alive)
    setDrink(user.drink)
    setCountry(user.country)
    setCountryId(user.countryId)
    setState(user.state)
    setStateId(user.stateId)
    setCity(user.city)
    setLanguage(user.language)
    setSecondLanguage(user.secondLanguage)
    setProvinces(csc.getStatesOfCountry(user.countryId))
    setCities(csc.getCitiesOfState(user.stateId))
  }
  useEffect(()=>{
    console.log("useEffect chala")
    var userId = props.userData.userData.user_id;
  var token = props.userData.token;
  getUser(token,{userId}).then((data)=>{
    console.log(data,'user');
    setUserData(data.userData)
    const user = data.userData;
    props.updateProfile(data.userData)
    setStates(user)
  }).catch((e)=>{
    console.log(e,'error')
  })
  },[])

  const cancelEdit = (func) => {
    func(false)
    setStates(userData);
  }
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [aboutMeEdit, setAboutMeEdit] = useState(false);
  const [myLifeEdit, setmyLifeEdit] = useState(false);
  const [personSeekEdit, setPersonSeekEdit] = useState(false);
  const [basicInfoEdit, setbasicInfoEdit] = useState(false);
  const [lifeStyleEdit, setlifeStyleEdit] = useState(false);
  const [professionalEdit, setprofessionalEdit] = useState(false);
  const [appearanceEdit, setappearanceEdit] = useState(false);
  const [addtionalInfoEdit, setaddtionalInfoEdit] = useState(false);
  const [partnerEdit, setpartnerEdit] = useState(false);  
  const classes = useStyles();
  const [value, setValue] = React.useState('one');
  const [gender, setGender] = React.useState(userData && userData.gender);
  const [aboutMe, setAboutMe] = React.useState(userData && userData.about_me);
  const [aboutSeekingPerson, setAboutSeekingPerson] = React.useState(userData &&userData.about_seeking_person);    
  const [workLife, setWorkLife] = React.useState(userData &&userData.work_life);
  const [bornIn, setBornIn] = React.useState(userData &&userData.born_in);
  const [address, setAddress] = React.useState(userData &&userData.address);
  const [age, setAge] = React.useState(userData &&userData.age);
  const [ethnicOrigin, setEthnicOrigin] = React.useState(userData &&userData.ethnic_origin);
  const [nationality, setNationality] = React.useState(userData &&userData.nationality);
  const [personalityStyle, setPersonalityStyle] = React.useState(userData &&userData.personality_style);
  const [personalWealth, setPersonalWealth] = React.useState(userData &&userData.personalWealth);
  const [maritalStatus, setMaritalStatus] = React.useState(userData &&userData.marital_status);
  const [religiousAffiliation, setReligiousAffiliation] = React.useState(userData && userData.religious_affiliation);
  const [children, setChildren] = React.useState(userData &&userData.children);
  const [siblings, setSiblings] = React.useState(userData &&userData.siblings);
  const [livingStatus, setLivingStatus] = React.useState(userData &&userData.livingStatus);
  const [willingToMove, setWillingToMove] = React.useState(userData &&userData.willing_to_move);
  const [diet, setDiet] = React.useState(userData &&userData.diet);
  const [smoking, setSmoking] = React.useState(userData &&userData.smoking);
  const [education, setEducation] = React.useState(userData &&userData.education);
  const [profession, setProfession] = React.useState(userData &&userData.profession);
  const [ambition, setAmbition] = React.useState(userData &&userData.ambition);
  const [eyeColor, setEyeColor] = React.useState(userData &&userData.eye_color);
  const [hairColor, setHairColor] = React.useState(userData &&userData.hair_color);
  const [bodyType, setBodyType] = React.useState(userData &&userData.body_type);
  const [height, setHeight] = React.useState(userData &&userData.height);
  const [disability, setDisability] = React.useState(userData &&userData.disability);
  const [acceptPolygamy, setAcceptPolygamy] = React.useState(userData &&userData.accept_polygamy);
  const [profileCreatedBy, setProfileCreatedBy] = React.useState(userData &&userData.profile_created_by);
  const [fatherAlive, setFatherAlive] = React.useState(userData &&userData.father_alive);
  const [motherAlive, setMotherAlive] = React.useState(userData &&userData.mother_alive);
  const [drink, setDrink] = React.useState(userData &&userData.drink);
  const [country, setCountry] = React.useState(userData &&userData.country);
  const [countryId, setCountryId] = React.useState(userData &&userData.countryId);
  const [state, setState] = React.useState(userData &&userData.state);
  const [stateId, setStateId] = React.useState(userData &&userData.stateId);
  const [city, setCity] = React.useState(userData &&userData.city);
  const [language, setLanguage] = React.useState(userData &&userData.language);
  const [secondLanguage, setSecondLanguage] = React.useState(userData &&userData.secondLanguage);
  const [provinces, setProvinces] = React.useState(userData && csc.getStatesOfCountry(userData.countryId));
  const [cities, setCities] = React.useState(userData && csc.getCitiesOfState(userData.stateId));
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [snackBarMsg, setSnackBarMsg] = React.useState("");
  const [snackBarType, setSnackBarType] = React.useState("");

  // if(co){
  
  // }
  const saveAboutMe=(func)=>{
    var token = props.userData.token;
    var obj = {about_me:aboutMe};
    var body = {id:userData.user_id,updateBody:obj};
    sendDataToDB(token,body).then((e)=>{
      console.log(e,'data in body')    
      func();
    })
    .catch((err)=>{
      console.log(err,'error in body')
    })
  }
  const saveMyLifeWork=(func)=>{
    var token = props.userData.token;
    var obj = {work_life:workLife};
    var body = {id:userData.user_id,updateBody:obj};
    sendDataToDB(token,body).then((e)=>{
      console.log(e,'data in body')    
      func();
    })
    .catch((err)=>{
      console.log(err,'error in body')
    })
  }
  const updateProfile=(func,obj)=>{
    var token = props.userData.token;
    // var obj = {about_seeking_person:aboutSeekingPerson};
    var body = {id:userData.user_id,updateBody:obj};
    sendDataToDB(token,body).then((e)=>{
      console.log(e,'data in body')  
      props.updateProfile();
      func();
      
      snackBar("profile Updated Successfully","success")  
    })
    .catch((err)=>{
      snackBar("something went wrong","error")
      console.log(err,'error in body')
    })
  }
  const snackBar=(msg, type)=>{
    setSnackBarOpen(true)
    setSnackBarMsg(msg)
    setSnackBarType(type)
}
const setBornInFunc=(e,func)=>{
  console.log(e.target.value, 'country')
  func(e.target.value.name);
}
  return (
    userData ?
    <div className={classes.root}>
      <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={()=>setSnackBarOpen(false)}>
                    <MuiAlert elevation={6} variant="filled" onClose={()=>setSnackBarOpen(false)} severity={snackBarType}>
                        {snackBarMsg}
                    </MuiAlert>
                </Snackbar>
      <AppBar style={{ backgroundColor: '#1976D2' }} position="static">
        <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
          <Tab value="one" label="Profile" {...a11yProps('one')} />
          <Tab value="two" label="Photos" {...a11yProps('two')} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="one">
        <div className='tab-form'>
          {
            aboutMeEdit ?
              <div style={{ marginTop: 20 }} className='basic-info-div'>
                <div className='basic-info-head'>
                  About Me, My Family, and Advantages of Marrying Me &nbsp;
                <Fab onClick={()=>updateProfile(setAboutMeEdit,{about_me:aboutMe})} size={'small'} color="primary" aria-label="Save">
                    <CheckIcon />
                  </Fab>&nbsp;
                <Fab onClick={()=>cancelEdit(setAboutMeEdit)} size={'small'} color="secondary" aria-label="Save">
                    <CloseIcon />
                  </Fab>
                  {/* </Tooltip> */}
                </div>
                <div className='basic-info-form'>
                  <TextField
                    value={aboutMe}
                    onChange={(t)=>setAboutMe(t.target.value)}
                    id="outlined-multiline-static"
                    label="Edit"
                    multiline
                    // rows={4}
                    // defaultValue=" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    // "
                    variant="outlined"
                  />
              </div>
              </div>
              : <div style={{ marginTop: 20 }} className='basic-info-div'>
                <div className='basic-info-head'>
                  About Me, My Family, and Advantages of Marrying Me &nbsp; <Tooltip onClick={() => { setAboutMeEdit(true) }} title='Edit' aria-label="Edit">
                    <EditIcon className={classes.editicon} />
                  </Tooltip>
                </div>
                <div className='basic-info-form'>
                  {aboutMe}
                  {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. */}
              </div>
              </div>
          }
          {
            myLifeEdit ?
              <div  className='basic-info-div'>
                <div className='basic-info-head'>
                   My Work Life, Hobbies, and Goals &nbsp; &nbsp;
                <Fab onClick={()=>updateProfile(setmyLifeEdit,{work_life:workLife})} size={'small'} color="primary" aria-label="Save">
                    <CheckIcon />
                  </Fab>&nbsp;
                <Fab onClick={()=>cancelEdit(setmyLifeEdit)} size={'small'} color="secondary" aria-label="Save">
                    <CloseIcon />
                  </Fab>
                  {/* </Tooltip> */}
                </div>
                <div className='basic-info-form'>
                  <TextField
                  
                  value={workLife}
                  onChange={(t)=>setWorkLife(t.target.value)}
                    id="outlined-multiline-static"
                    label="Edit"
                    multiline
                    // rows={4}
                    // defaultValue=" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    // "
                    variant="outlined"
                  />
              </div>
              </div>
              : <div className='basic-info-div'>
            <div className='basic-info-head'>
              My Work Life, Hobbies, and Goals &nbsp; <Tooltip onClick={() => { setmyLifeEdit(true) }} title='Edit' aria-label="Edit">
                <EditIcon className={classes.editicon} />
              </Tooltip>
            </div>
            <div className='basic-info-form'>
              {workLife}
              {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. */}
              </div>
          </div>
          }

  {
            personSeekEdit ?
              <div  className='basic-info-div'>
                <div className='basic-info-head'>
                The Person i am seeking &nbsp;
                <Fab onClick={()=>updateProfile(setPersonSeekEdit,{about_seeking_person:aboutSeekingPerson})} size={'small'} color="primary" aria-label="Save">
                    <CheckIcon />
                  </Fab>&nbsp;
                <Fab onClick={()=>cancelEdit(setPersonSeekEdit)} size={'small'} color="secondary" aria-label="Save">
                    <CloseIcon />
                  </Fab>
                  {/* </Tooltip> */}
                </div>
                <div className='basic-info-form'>
                  <TextField
                  value={aboutSeekingPerson}
                  onChange={(t)=>setAboutSeekingPerson(t.target.value)}
                    id="outlined-multiline-static"
                    label="Edit"
                    multiline
                    // rows={4}
                    // defaultValue=" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    // "
                    variant="outlined"
                  />
              </div>
              </div>:
          <div className='basic-info-div'>
            <div className='basic-info-head'>
              The Person i am seeking &nbsp; <Tooltip onClick={()=>setPersonSeekEdit(true)} title='Edit' aria-label="Edit">
                <EditIcon className={classes.editicon} />
              </Tooltip>
            </div>
            <div className='basic-info-form'>
              {aboutSeekingPerson}
              {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. */}
              </div>
          </div>
  }
  {
        basicInfoEdit ?
        <div className='basic-info-div'>
            <div className='table-head'>
              <div className='table-head-text'>
                Basic Information
                </div>
              <div className='table-icon-div'>
              <Fab onClick={()=>updateProfile(setbasicInfoEdit,{
                    born_in:bornIn,address:address,age,gender,ethnic_origin:ethnicOrigin,nationality,country,state,city,countryId,stateId,
                    language,secondLanguage
                    })} size={'small'} color="primary" aria-label="Save">
                    <CheckIcon />
                  </Fab>&nbsp;
                <Fab onClick={()=>cancelEdit(setbasicInfoEdit)} size={'small'} color="secondary" aria-label="Save">
                    <CloseIcon />
                  </Fab>
              </div>
            </div>
            <div className='table-form editForm'>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Born In
                  </div>
                <div className='table-field-value'>
                {/* <TextField 
                value={bornIn}
                onChange={(t)=>setBornIn(t.target.value)}
                id="outlined-basic" label="Edit" variant="outlined"/> */}
                  <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="BornIn"
                  value={bornIn}
                  onChange={(e)=>setBornIn(e.target.value)}
              >
                  {countries.map((e, i) => {
                      return <MenuItem key={i} value={e.name}>{e.name}</MenuItem>
                  })}
                  </TextField>
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Country
                  </div>
                <div className='table-field-value'>
                  <TextField
                  // className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Country"
                  value={country}
                  onChange={(e,dd)=>{
                    var key = dd.key
                    console.log(key,'keyyyy raw')
                    var key =  key.split('$')[1];
                    console.log(key,'key')
                    setCountry(e.target.value)
                    setProvinces(csc.getStatesOfCountry(key))
                    setCountryId(key);
                  }}
              >
                  {countries.map((e, i) => {
                    // console.log(e,'country')
                      return <MenuItem onClick={(e)=>{setProvinces(csc.getStatesOfCountry(e.id))}} key={e.id} value={e.name}>{e.name}</MenuItem>
                  })}
                  </TextField>
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  State/Province
                  </div>
                <div className='table-field-value'>
                  <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="State/Province"
                  value={state}
                  onChange={(e)=>{
                    setState(e.target.value);
                  }}
              >
                {

                 provinces.length!==0 ? provinces.map((e, i) => {
                      return <MenuItem  onClick={()=>{
                        setCities(csc.getCitiesOfState(e.id))
                      }}   key={i} value={e.name}>{e.name}</MenuItem>
                  })  : <MenuItem value={userData.state}>{userData.state}</MenuItem>
                  }
                  </TextField>
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  City
                  </div>
                <div className='table-field-value'>
                  <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="City"
                  value={city}
                  onChange={(e)=>setCity(e.target.value)}
              >
                  {cities.length!==0 ? cities.map((e, i) => {
                      return <MenuItem key={i} value={e.name}>{e.name}</MenuItem>
                  }): <MenuItem value={userData.city}>{userData.city}</MenuItem> } 
                  </TextField>
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Age
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Age"
                  value={age}
                  onChange={(e)=>setAge(e.target.value)}
              >
                  {ageList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                value={age}
                onChange={(t)=>setAge(t.target.value)}
                id="outlined-basic" label="Edit" variant="outlined" /> */}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Gender
                  </div>
                <div className='table-field-value'>
                <TextField value={gender}  id="outlined-basic" disabled label="Cannot Change" variant="outlined" />
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Ethnic Origin
                  </div>
                <div className='table-field-value'>  
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Ethnic Origin"
                  value={ethnicOrigin}
                  onChange={(e)=>setEthnicOrigin(e.target.value)}
              >
                  {languageList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                
                {/* <TextField 
                value={ethnicOrigin}
                onChange={(t)=>setEthnicOrigin(t.target.value)}
                id="outlined-basic" label="Edit" variant="outlined"/> */}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Language
                  </div>
                <div className='table-field-value'>  
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Language"
                  value={language}
                  onChange={(e)=>setLanguage(e.target.value)}
              >
                  {languageList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                
                {/* <TextField 
                value={ethnicOrigin}
                onChange={(t)=>setEthnicOrigin(t.target.value)}
                id="outlined-basic" label="Edit" variant="outlined"/> */}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Second Language
                  </div>
                <div className='table-field-value'>  
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Second Language"
                  value={secondLanguage}
                  onChange={(e)=>setSecondLanguage(e.target.value)}
              >
                  {secondLanguageList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                
                {/* <TextField 
                value={ethnicOrigin}
                onChange={(t)=>setEthnicOrigin(t.target.value)}
                id="outlined-basic" label="Edit" variant="outlined"/> */}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Nationality
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Nationality"
                  value={nationality}
                  onChange={(e)=>setNationality(e.target.value)}
              >
                  {nationalities.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                value={nationality}
                onChange={(t)=>setNationality(t.target.value)}
                id="outlined-basic" label="Edit" variant="outlined" /> */}
                  </div>
              </div>
            </div>
          </div>
          :
          <div className='basic-info-div'>
            <div className='table-head'>
              <div className='table-head-text'>
                Basic Information
                </div>
              <div className='table-icon-div'>
                <Tooltip onClick={()=>setbasicInfoEdit(true)} title='Edit' aria-label="Edit">
                  <EditIcon className={classes.editicon} />
                </Tooltip>
              </div>
            </div>
            <div className='table-form'>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Born In
                  </div>
                <div className='table-field-value'>
                  {bornIn}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Country
                  </div>
                <div className='table-field-value'>
                 {country}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                 State/Province
                  </div>
                <div className='table-field-value'>
                 {state}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                 City
                  </div>
                <div className='table-field-value'>
                 {city}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Age
                  </div>
                <div className='table-field-value'>
                  {age}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Gender
                  </div>
                <div className='table-field-value'>
                  {gender}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Ethnic Origin
                  </div>
                <div className='table-field-value'>
                  {ethnicOrigin}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Language
                  </div>
                <div className='table-field-value'>
                  {language}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Second Language
                  </div>
                <div className='table-field-value'>
                  {secondLanguage}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Nationality
                  </div>
                <div className='table-field-value'>
                  {nationality}
                  </div>
              </div>
            </div>
          </div>
  }
  {
        lifeStyleEdit ?
        <div className='basic-info-div'>
            <div className='table-head'>
              <div className='table-head-text'>
              Lifestyle
                </div>
              <div className='table-icon-div'>
              <Fab onClick={()=>updateProfile(setlifeStyleEdit,{
                personality_style:personalityStyle,personal_wealth:personalWealth,marital_status:maritalStatus,religious_affiliation:religiousAffiliation
                ,children,siblings,livingStatus,willing_to_move:willingToMove,diet,smoking
              })} size={'small'} color="primary" aria-label="Save">
                    <CheckIcon />
                  </Fab>&nbsp;
                <Fab onClick={()=>cancelEdit(setlifeStyleEdit)} size={'small'} color="secondary" aria-label="Save">
                    <CloseIcon />
                  </Fab>
              </div>
            </div>
            <div className='table-form editForm'>
              <div className='table-field-value-div'>
                <div className='table-field'>
                Personality Style
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Personality Status"
                  value={personalityStyle}
                  onChange={(e)=>setPersonalityStyle(e.target.value)}
              >
                  {personalityStyleList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                value={personalityStyle}
                onChange={(t)=>setPersonalityStyle(t.target.value)}
                id="outlined-basic" label="Edit" variant="outlined" /> */}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                Personal Wealth
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Personal Wealth"
                  value={personalWealth}
                  onChange={(e)=>setPersonalWealth(e.target.value)}
              >
                  {personalWealthList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                value={personalWealth}
                onChange={(t)=>setPersonalWealth(t.target.value)}
                id="outlined-basic" label="Edit" variant="outlined" /> */}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                Marital Status
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Marital Status"
                  value={maritalStatus}
                  onChange={(e)=>setMaritalStatus(e.target.value)}
              >
                  {maritalStatusList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                    value={maritalStatus}
                    onChange={(t)=>setMaritalStatus(t.target.value)} id="outlined-basic" label="Edit" variant="outlined" /> */}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                Religious Affiliation
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Religious Affiliation"
                  value={religiousAffiliation}
                  onChange={(e)=>setReligiousAffiliation(e.target.value)}
              >
                  {religiousAffiliationList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                value={religiousAffiliation}
                onChange={(t)=>setReligiousAffiliation(t.target.value)}
                id="outlined-basic" label="Edit" variant="outlined" /> */}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                Children
                  </div>
                <div className='table-field-value'>  
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Children"
                  value={children}
                  onChange={(e)=>setChildren(e.target.value)}
              >
                  {childrenList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                    value={children}
                    onChange={(t)=>setChildren(t.target.value)} id="outlined-basic" label="Edit" variant="outlined"  /> */}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                Siblings
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Siblings"
                  value={siblings}
                  onChange={(e)=>setSiblings(e.target.value)}
              >
                  {siblingsList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                value={siblings}
                onChange={(t)=>setSiblings(t.target.value)}
                id="outlined-basic" label="Edit" variant="outlined"  /> */}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Living Status
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Living Status"
                  value={livingStatus}
                  onChange={(e)=>setLivingStatus(e.target.value)}
              >
                  {livingStatusList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                
                value={livingStatus}
                onChange={(t)=>setLivingStatus(t.target.value)}
                id="outlined-basic" label="Edit" variant="outlined" d /> */}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Willing to Move
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Willing to move"
                  value={willingToMove}
                  onChange={(e)=>setWillingToMove(e.target.value)}
              >
                  {willingToMoveList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                    value={willingToMove}
                    onChange={(t)=>setWillingToMove(t.target.value)}
                     id="outlined-basic" label="Edit" variant="outlined"  /> */}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Diet
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Diet"
                  value={diet}
                  onChange={(e)=>setDiet(e.target.value)}
              >
                  {dietList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                    value={diet}
                    onChange={(t)=>setDiet(t.target.value)} id="outlined-basic" label="Edit" variant="outlined"  /> */}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Smoking
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="smoking"
                  value={smoking}
                  onChange={(e)=>setSmoking(e.target.value)}
              >
                  {smokingList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                    value={smoking}
                    onChange={(t)=>setSmoking(t.target.value)} id="outlined-basic" label="Edit" variant="outlined"  /> */}
                  </div>
              </div>
            </div>
          </div>
          :
          <div className='basic-info-div'>
            <div className='table-head'>
              <div className='table-head-text'>
                Lifestyle
                </div>
              <div className='table-icon-div'>
                <Tooltip onClick={()=>setlifeStyleEdit(true)} title='Edit' aria-label="Edit">
                  <EditIcon className={classes.editicon} />
                </Tooltip>
              </div>
            </div>
            <div className='table-form'>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Personality Style
                  </div>
                <div className='table-field-value'>
                  {personalityStyle}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Personal Wealth
                  </div>
                <div className='table-field-value'>
                  {personalWealth}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Marital Status
                  </div>
                <div className='table-field-value'>
                 {maritalStatus}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Religious Affiliation
                  </div>
                <div className='table-field-value'>
                  {religiousAffiliation}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Children
                  </div>
                <div className='table-field-value'>
                  {children}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Siblings
                  </div>
                <div className='table-field-value'>
                  {siblings}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Living Status
                  </div>
                <div className='table-field-value'>
                  {livingStatus}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Willing to Move
                  </div>
                <div className='table-field-value'>
                  {willingToMove}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Diet
                  </div>
                <div className='table-field-value'>
                  {diet}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Smoking
                  </div>
                <div className='table-field-value'>
                 {smoking}
                  </div>
              </div>
            </div>
          </div>
  }
   {
        professionalEdit ?
        <div className='basic-info-div'>
            <div className='table-head'>
              <div className='table-head-text'>
              Professional
                </div>
              <div className='table-icon-div'>
              <Fab onClick={()=>updateProfile(setprofessionalEdit,{
                education,profession,ambition
              })} size={'small'} color="primary" aria-label="Save">
                    <CheckIcon />
                  </Fab>&nbsp;
                <Fab onClick={()=>cancelEdit(setprofessionalEdit)} size={'small'} color="secondary" aria-label="Save">
                    <CloseIcon />
                  </Fab>
              </div>
            </div>
            <div className='table-form editForm'>
            <div className='table-field-value-div'>
                <div className='table-field'>
                  Education
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Education"
                  value={education}
                  onChange={(e)=>setEducation(e.target.value)}
              >
                  {educationList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                    value={education}
                    onChange={(t)=>setEducation(t.target.value)} id="outlined-basic" label="Edit" variant="outlined"  /> */}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Profession
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Profession"
                  value={profession}
                  onChange={(e)=>setProfession(e.target.value)}
              >
                  {professionList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                    value={profession}
                    onChange={(t)=>setProfession(t.target.value)} id="outlined-basic" label="Edit" variant="outlined"  /> */}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Ambition
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Ambition"
                  value={ambition}
                  onChange={(e)=>setAmbition(e.target.value)}
              >
                  {ambitionList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                    value={ambition}
                    onChange={(t)=>setAmbition(t.target.value)} id="outlined-basic" label="Edit" variant="outlined"  /> */}
                  </div>
              </div>
            </div>
          </div>
          :
          <div className='basic-info-div'>
            <div className='table-head'>
              <div className='table-head-text'>
                Professional
                </div>
              <div className='table-icon-div'>
                <Tooltip onClick={()=>setprofessionalEdit(true)} title='Edit' aria-label="Edit">
                  <EditIcon className={classes.editicon} />
                </Tooltip>
              </div>
            </div>
            <div className='table-form'>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Education
                  </div>
                <div className='table-field-value'>
                  {education}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Profession
                  </div>
                <div className='table-field-value'>
                  {profession}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Ambition
                  </div>
                <div className='table-field-value'>
                  {ambition}
                  </div>
              </div>
            </div>
          </div>
   }
    {
        appearanceEdit ?
        <div className='basic-info-div'>
            <div className='table-head'>
              <div className='table-head-text'>
              Appearance
                </div>
              <div className='table-icon-div'>
              <Fab onClick={()=>updateProfile(setappearanceEdit,{eye_color:eyeColor,hair_color:hairColor,body_type:bodyType,height,disability})} size={'small'} color="primary" aria-label="Save">
                    <CheckIcon />
                  </Fab>&nbsp;
                <Fab onClick={()=>cancelEdit(setappearanceEdit)} size={'small'} color="secondary" aria-label="Save">
                    <CloseIcon />
                  </Fab>
              </div>
            </div>
            <div className='table-form editForm'>
            <div className='table-field-value-div'>
                <div className='table-field'>
                  Eye Color
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Eye Color"
                  value={eyeColor}
                  onChange={(e)=>setEyeColor(e.target.value)}
              >
                  {eyeColorList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                    value={eyeColor}
                    onChange={(txt)=>setEyeColor(txt.target.value)} id="outlined-basic" label="Edit" variant="outlined" /> */}
                
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Hair Color
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Hair Color"
                  value={hairColor}
                  onChange={(e)=>setHairColor(e.target.value)}
              >
                  {hairColorList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField
                value={hairColor}
                onChange={(txt)=>setHairColor(txt.target.value)}
                id="outlined-basic" label="Edit" variant="outlined" /> */}
                
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Body Type
                  </div>
                <div className='table-field-value'>
                {/* <TextField 
                value={bodyType}
                onChange={(txt)=>setBodyType(txt.target.value)}
                id="outlined-basic" label="Edit" variant="outlined" /> */}
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Body Type"
                  value={bodyType}
                  onChange={(e)=>setBodyType(e.target.value)}
              >
                  {bodyTypeList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Height
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Height"
                  value={height}
                  onChange={(e)=>setHeight(e.target.value)}
              >
                  {heightList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField
                value={height}
                onChange={(txt)=>setHeight(txt.target.value)}
                id="outlined-basic" label="Edit" variant="outlined"  /> */}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Disability
                  </div>
                <div className='table-field-value'>
                {/* <TextField
                value={disability}
                onChange={(txt)=>setDisability(txt.target.value)}
                id="outlined-basic" label="Edit" variant="outlined"  /> */}
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Disability"
                  value={disability}
                  onChange={(e)=>setDisability(e.target.value)}
              >
                  {disabilityList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                  </div>
              </div>
            </div>
          </div>
          :
          <div className='basic-info-div'>
            <div className='table-head'>
              <div className='table-head-text'>
                Appearance
                </div>
              <div className='table-icon-div'>
                <Tooltip onClick={()=>{setappearanceEdit(true)}} title='Edit' aria-label="Edit">
                  <EditIcon className={classes.editicon} />
                </Tooltip>
              </div>
            </div>
            <div className='table-form'>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Eye Color
                  </div>
                <div className='table-field-value'>
                  {eyeColor}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Hair Color
                  </div>
                <div className='table-field-value'>
                  {hairColor}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Body Type
                  </div>
                <div className='table-field-value'>
                 {bodyType}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Height
                  </div>
                <div className='table-field-value'>
                 {height}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Disability
                  </div>
                <div className='table-field-value'>
                  {disability}
                  </div>
              </div>
            </div>
          </div>
}
{
        addtionalInfoEdit ?
        <div className='basic-info-div'>
            <div className='table-head'>
              <div className='table-head-text'>
              Additional Information
                </div>
              <div className='table-icon-div'>
              <Fab onClick={()=>updateProfile(setaddtionalInfoEdit,{
                accept_polygamy:acceptPolygamy,profile_created_by:profileCreatedBy,father_alive:fatherAlive
                ,mother_alive:motherAlive
                })} size={'small'} color="primary" aria-label="Save">
                    <CheckIcon />
                  </Fab>&nbsp;
                <Fab onClick={()=>cancelEdit(setaddtionalInfoEdit)} size={'small'} color="secondary" aria-label="Save">
                    <CloseIcon />
                  </Fab>
              </div>
            </div>
            <div className='table-form editForm'>
            <div className='table-field-value-div'>
                <div className='table-field'>
                  Accept Polygamy
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Polygamy"
                  value={acceptPolygamy}
                  onChange={(e)=>setAcceptPolygamy(e.target.value)}
              >
                  {polygamyList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                    value={acceptPolygamy}
                    onChange={(text)=>setAcceptPolygamy(text.target.value)} id="outlined-basic" label="Edit" variant="outlined" /> */}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Profile Created by
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Profile Created By"
                  value={profileCreatedBy}
                  onChange={(e)=>setProfileCreatedBy(e.target.value)}
              >
                  {profileCreatedByList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                    value={profileCreatedBy}
                    onChange={(txt)=>setProfileCreatedBy(txt.target.value)} id="outlined-basic" label="Edit" variant="outlined"  /> */}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Father Alive
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Father Alive"
                  value={fatherAlive}
                  onChange={(e)=>setFatherAlive(e.target.value)}
              >
                  {fatherAliveList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                    value={fatherAlive}
                    onChange={(txt)=>setFatherAlive(txt.target.value)} id="outlined-basic" label="Edit" variant="outlined"  /> */}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Mother  Alive
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Mother Alive"
                  value={motherAlive}
                  onChange={(e)=>setMotherAlive(e.target.value)}
              >
                  {motherAliveList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                    value={motherAlive}
                    onChange={(txt)=>setMotherAlive(txt.target.value)} id="outlined-basic" label="Edit" variant="outlined"  /> */}
                  </div>
              </div>
            </div>
          </div>
          :
          <div className='basic-info-div'>
            <div className='table-head'>
              <div className='table-head-text'>
                Additional Information
                
                </div>
              <div className='table-icon-div'>
                <Tooltip onClick={()=>setaddtionalInfoEdit(true)} title='Edit' aria-label="Edit">
                  <EditIcon className={classes.editicon} />
                </Tooltip>
              </div>
            </div>
            <div className='table-form'>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Accept Polygamy
                  </div>
                <div className='table-field-value'>
                  {acceptPolygamy}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Profile Created by
                  </div>
                <div className='table-field-value'>
                  {profileCreatedBy}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Father Alive
                  </div>
                <div className='table-field-value'>
                  {fatherAlive}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Mother  Alive
                  </div>
                <div className='table-field-value'>
                  {motherAlive}
                  </div>
              </div>
            </div>
          </div>
}
{
        partnerEdit ?
        <div className='basic-info-div'>
            <div className='table-head'>
              <div className='table-head-text'>
              Partner Preferences
                </div>
              <div className='table-icon-div'>
              <Fab onClick={()=>updateProfile(setpartnerEdit,{accept_polygamy:acceptPolygamy,smoking,drink,education})} size={'small'} color="primary" aria-label="Save">
                    <CheckIcon />
                  </Fab>&nbsp;
                <Fab onClick={()=>cancelEdit(setpartnerEdit)} size={'small'} color="secondary" aria-label="Save">
                    <CloseIcon />
                  </Fab>
              </div>
            </div>
            <div className='table-form editForm'>
            <div className='table-field-value-div'>
                <div className='table-field'>
                  Accept Polygamy
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Accept Polygamy"
                  value={acceptPolygamy}
                  onChange={(e)=>setAcceptPolygamy(e.target.value)}
              >
                  {polygamyList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                    value={acceptPolygamy}
                    onChange={(text)=>setAcceptPolygamy(text.target.value)} id="outlined-basic" label="Edit" variant="outlined"  /> */}
                  </div>
              </div>
              {/* <div className='table-field-value-div'>
                <div className='table-field'>
                  Smoking
                  </div>
                <div className='table-field-value'>
                  
                <TextField 
                    value={smoking}
                    onChange={(text)=>setSmoking(text.target.value)} id="outlined-basic" label="Edit" variant="outlined"  />
                  </div>
              </div> */}
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Drink
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Drink"
                  value={drink}
                  onChange={(e)=>setDrink(e.target.value)}
              >
                  {drinkList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                    value={drink}
                    onChange={(text)=>setDrink(text.target.value)} id="outlined-basic" label="Edit" variant="outlined" /> */}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Education
                  </div>
                <div className='table-field-value'>
                <TextField
                  className='input-dropdown-field'
                  fullWidth
                  select
                  variant="outlined"
                  label="Education"
                  value={education}
                  onChange={(e)=>setEducation(e.target.value)}
              >
                  {educationList.map((e, i) => {
                      return <MenuItem key={i} value={e}>{e}</MenuItem>
                  })}
                  </TextField>
                {/* <TextField 
                    value={education}
                    onChange={(text)=>setEducation(text.target.value)} id="outlined-basic" label="Edit" variant="outlined"  /> */}
                  </div>
              </div>
            </div>
          </div>
          :
          <div className='basic-info-div'>
            <div className='table-head'>
              <div className='table-head-text'>
                Partner Preferences
                
                </div>
              <div className='table-icon-div'>
                <Tooltip onClick={()=>setpartnerEdit(true)} title='Edit' aria-label="Edit">
                  <EditIcon className={classes.editicon} />
                </Tooltip>
              </div>
            </div>
            <div className='table-form'>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Accept Polygamy
                  </div>
                <div className='table-field-value'>
                  {acceptPolygamy}
                  </div>
              </div>
              {/* <div className='table-field-value-div'>
                <div className='table-field'>
                  Smoking
                  </div>
                <div className='table-field-value'>
                  {smoking}
                  </div>
              </div> */}
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Drink
                  </div>
                <div className='table-field-value'>
                  {drink}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Education
                  </div>
                <div className='table-field-value'>
                {education}
                  </div>
              </div>
            </div>
          </div>
}
        </div>
      </TabPanel>
      <TabPanel value={value} index="two">
        <MyPhotoTab userData={props.userData} />
      </TabPanel>
    </div>
    :
    <div>
        // <CircularProgress size={30}  />
    </div>
  );
}