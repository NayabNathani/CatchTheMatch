import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { Tooltip, Fab,TextField } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import PhotoTab from '../photoTab/index'
import './assets/css/otherTab.css'

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

  console.log(props.userData,'props in tab');
  
  const user = props.userData.user;
  console.log(props.userData,'userData');
  const classes = useStyles();
  const [value, setValue] = React.useState('one');
  // const [value, setValue] = React.useState('one');
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar style={{ backgroundColor: '#1976D2' }} position="static">
        <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
          <Tab value="one" label="Profile" {...a11yProps('one')} />
          <Tab value="two" label="Photos" {...a11yProps('two')} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="one">
        <div className='tab-form'>
              <div style={{ marginTop: 20 }} className='basic-info-div'>
                <div className='basic-info-head'>
                  About Me, My Family, and Advantages of Marrying Me
                </div>
                <div className='basic-info-form'>
                  {user.about_me}
                   </div>
              </div>
          <div className='basic-info-div'>
            <div className='basic-info-head'>
              My Work Life, Hobbies, and Goals
            </div>
            <div className='basic-info-form'>
              {user.work_life}
              </div>
          </div>
          <div className='basic-info-div'>
            <div className='basic-info-head'>
              The Person i am seeking 
            </div>
            <div className='basic-info-form'>
             {user.about_seeking_person}
              </div>
          </div>
  
          <div className='basic-info-div'>
            <div className='table-head'>
              <div className='table-head-text'>
                Basic Information
                </div>
            </div>
            <div className='table-form'>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Born In
                  </div>
                <div className='table-field-value'>
                  {user.born_in}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Current Location
                  </div>
                <div className='table-field-value'>
                  {user.address}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Age
                  </div>
                <div className='table-field-value'>
                  {user.age}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Gender
                  </div>
                <div className='table-field-value'>
                  {user.gender}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Ethnic Origin
                  </div>
                <div className='table-field-value'>
                  {user.ethnic_origin}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Nationality
                  </div>
                <div className='table-field-value'>
                  {user.nationality}
                  </div>
              </div>
            </div>
          </div>
 
  
          <div className='basic-info-div'>
            <div className='table-head'>
              <div className='table-head-text'>
                Lifestyle
                </div>
              
            </div>
            <div className='table-form'>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Personality Style
                  </div>
                <div className='table-field-value'>
                  {user.personality_style}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Personal Wealth
                  </div>
                <div className='table-field-value'>
                  {user.personal_wealth}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Marital Status
                  </div>
                <div className='table-field-value'>
                  {user.marital_status}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Religious Affiliation
                  </div>
                <div className='table-field-value'>
                  {user.religious_affiliation}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Children
                  </div>
                <div className='table-field-value'>
                  {user.children}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Siblings
                  </div>
                <div className='table-field-value'>
                  {user.siblings}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Living Status
                  </div>
                <div className='table-field-value'>
                  {user.livingStatus}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Willing to Move
                  </div>
                <div className='table-field-value'>
                  {user.willing_to_move}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Diet
                  </div>
                <div className='table-field-value'>
                  {user.diet}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Smoking
                  </div>
                <div className='table-field-value'>
                  {user.smoking}
                  </div>
              </div>
            </div>
          </div>
  
   
          <div className='basic-info-div'>
            <div className='table-head'>
              <div className='table-head-text'>
                Professional
                </div>
              
            </div>
            <div className='table-form'>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Education
                  </div>
                <div className='table-field-value'>
                  {user.education}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Profession
                  </div>
                <div className='table-field-value'>
                  {user.profession}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Ambition
                  </div>
                <div className='table-field-value'>
                  {user.ambition}
                  </div>
              </div>
            </div>
          </div>
   
   
          <div className='basic-info-div'>
            <div className='table-head'>
              <div className='table-head-text'>
                Appearance
                </div>
            </div>
            <div className='table-form'>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Eye Color
                  </div>
                <div className='table-field-value'>
                  {user.eye_color}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Hair Color
                  </div>
                <div className='table-field-value'>
                  {user.hair_color}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Body Type
                  </div>
                <div className='table-field-value'>
                  {user.body_type}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Height
                  </div>
                <div className='table-field-value'>
                 {user.height}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Disability
                  </div>
                <div className='table-field-value'>
                  {user.disability}
                  </div>
              </div>
            </div>
          </div>

          <div className='basic-info-div'>
            <div className='table-head'>
              <div className='table-head-text'>
                Additional Information
                
                </div>
              
            </div>
            <div className='table-form'>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Accept Polygamy
                  </div>
                <div className='table-field-value'>
                  {user.accept_polygamy}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Profile Created by
                  </div>
                <div className='table-field-value'>
                  {user.profile_created_by}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Father Alive
                  </div>
                <div className='table-field-value'>
                  {user.father_alive}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Mother  Alive
                  </div>
                <div className='table-field-value'>
                  {user.mother_alive}
                  </div>
              </div>
            </div>
          </div>


          <div className='basic-info-div'>
            <div className='table-head'>
              <div className='table-head-text'>
                Partner Preferences
                
                </div>
              
            </div>
            <div className='table-form'>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Accept Polygamy
                  </div>
                <div className='table-field-value'>
                  {user.accept_polygamy}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Smoking
                  </div>
                <div className='table-field-value'>
                  {user.smoking}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Drink
                  </div>
                <div className='table-field-value'>
                  {user.drink}
                  </div>
              </div>
              <div className='table-field-value-div'>
                <div className='table-field'>
                  Education
                  </div>
                <div className='table-field-value'>
                 {user.education}
                  </div>
              </div>
            </div>
          </div>

        </div>
      </TabPanel>
      <TabPanel value={value} index="two">
        <PhotoTab userData={props.userData}/>
      </TabPanel>
    </div>
  );
}