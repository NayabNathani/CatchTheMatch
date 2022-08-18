import React, { Component } from 'react'
import ResponsiveDrawer from '../../components/drawer'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { TextField, MenuItem, FormControlLabel, Checkbox, InputAdornment, Collapse, Button, Snackbar,CircularProgress } from '@material-ui/core'
import {
    heightList, lastActive, kms, eyeColorList, bodyTypeList, hairColorList, personalityStyleList, personalWealthList, maritalStatusList, motherAliveList
    , religiousAffiliationList, livingStatusList, dietList, professionList, profileCreatedByList, educationList, ethnic_origins, nationalities, disabilityList, childrenList,
    siblingsList, willingToMoveList, polygamyList, fatherAliveList, ambitionList, drinkList, smokingList, languageList, secondLanguageList
} from './assets/files/data'
import RangeSlider from '../../components/sliderInput/index'
import csc from 'country-state-city'
import MuiAlert from '@material-ui/lab/Alert';
import Footer from '../../components/footer/index'
import './assets/css/advanceSearch.css'
import { searchUsers } from '../../networking/api'
class AdvanceSearch extends Component {

    toggleCollapse(number, value) {
        this.setState({ ['collapse' + number]: value });
    }
    componentDidMount() {
        this.setState({ countries: csc.getAllCountries() })
    }
    snackBar(msg, type) {
        this.setState({ snackBarOpen: true, snackBarType: type, snackBarMsg: msg })
    }
    snackBarHandle = () => {
        this.setState({ snackBarOpen: false })
    }
    state = {
        loading:false,
        cities: [],
        states: [],
        countries: [],
        lastActive: 'Any',
        distance: ['Any'],
        nationality: ['Any'],
        ethnicOrigin: ['Any'],
        drink: ['Any'],
        ambition: ['Any'],
        education: ['Any'],
        profCreatedBy: ['Any'],
        profession: ['Any'],
        fatherAlive: ['Any'],
        motherAlive: ['Any'],
        personalities: ['Any'],
        polygamy: ['Any'],
        disability: ['Any'],
        smoking: ['Any'],
        diet: ['Any'],
        move: ['Any'],
        searchfor: ['Any'],
        noOfSiblings: ['Any'],
        noOfChildren: 'Any',
        martialStatus: ['Any'],
        heightStart: ['Any'],
        // noOfSiblings: ['Any'],
        eyeColor: ['Any'],
        hairColor: ['Any'],
        heightEnd: ['Any'],
        bodytype: ['Any'],
        personalwealth: ['Any'],
        personalitystyle: ['Any'],
        religiousAff: ['Any'],
        livingStatus: ['Any'],
        address: 'Any',
        ageStart: 18,
        ageEnd: 70,
        collapse1: false,
        collapse1_1: false,
        collapse1_2: false,
        collapse1_3: false,
        collapse1_4: false,
        collapse1_5: false,
        collapse1_6: false,
        collapse2: false,
        collapse2_1: false,
        collapse2_2: false,
        collapse2_3: false,
        collapse2_4: false,
        collapse2_5: false,
        collapse2_6: false,
        collapse2_7: false,
        collapse2_8: false,
        collapse2_9: false,
        collapse2_10: false,
        collapse3: false,
        collapse3_1: false,
        collapse3_2: false,
        collapse3_3: false,
        collapse4: false,
        collapse4_1: false,
        collapse4_2: false,
        collapse4_3: false,
        collapse5: false,
        collapse5_1: false,
        collapse5_2: false,
        collapse6: false,
        collapse6_1: false,
        collapse6_2: false,
        collapse6_3: false,
        collapse6_4: false,
        snackBarOpen: false,
        snackBarMsg: '',
        snackBarType: '',
    }
    stopLoading(){
        this.setState({loading:false});
    }
    goToSearch = () => {
        this.setState({loading:true})
        let { ageStart, ageEnd, lastActive, country, state, city, ethnicOrigin, nationality, heightStart, heightEnd, eyeColor, bodyType, hairColor, disability
            , personalitystyle, personalwealth, martialStatus, religiousAff, noOfChildren, noOfSiblings, livingStatus, move, diet, polygamy, fatherAlive,
            profCreatedBy, motherAlive, education, profession, ambition, drink, smoking, address
        } = this.state;
        var obj = {
            heightStart, heightEnd, ageStart, ageEnd,
            last_active: lastActive, country, state, city, ethnic_origin: ethnicOrigin, nationality,
            eye_color: eyeColor, body_type: bodyType, hair_color: hairColor, disability
            , personality_style: personalitystyle, personal_wealth: personalwealth, marital_status: martialStatus, religious_affiliation: religiousAff,
            children: noOfChildren, siblings: noOfSiblings, livingStatus, willing_to_move: move, diet, accept_polygamy: polygamy, father_alive: fatherAlive,
            profile_created_by: profCreatedBy, mother_alive: motherAlive, education, profession, ambition, drink, smoking, address
        }

        Object.keys(obj).forEach((e) => {
            // console.log(obj[e], 'obj[e]', e);
            if (obj[e] == 'Any' || obj[e] == ["Any"] || obj[e] === undefined) {
                console.log("inside if")
                delete obj[e];
            }
        })
        // console.log(obj.heightEnd, 'height emd');
        // if(obj.heightEnd===undefined && obj.heightStart===undefined){

        // }
        // console.log(obj, 'objjj after ')
        if (Object.keys(obj).length === 0 && obj.constructor === Object) {
            this.stopLoading()
            this.snackBar("please add some filters before searching", 'error')
        } else {
            var token = this.props.location.state.token;
            searchUsers(token, obj).then((data) => {
                // console.log(data, 'data after search')
                if (data.message === 'user not found' || data.userData.length===0) {
                    this.stopLoading()
                    this.setState({ searchedUsers: null })
                    this.snackBar("There is not data related to these filters", 'error');
                } else {
                    this.stopLoading()
                    this.props.history.push('/searchresults', { users: data.userData, ...this.props.location.state })
                }
            })
                .catch((e) => { 
                    this.snackBar("Something Went Wrong", 'error'); })

        }

    }
    changeState(statename, e) {
        this.setState({ [statename]: e.target.value })
    }
    handleChange = (event) => {
        // console.log(event.target.name, ':', event.target.value);
        this.setState({ [event.target.name]: [event.target.value] })
    };
    valuetext = (value) => {
        return `${value}°C`;
    }
    selectCountry(e) {
        // console.log(e.target.value, 'country')
        this.setState({ states: csc.getStatesOfCountry(e.target.value.id), country: [e.target.value.name] })
    }
    selectState(e) {
        this.setState({ cities: csc.getCitiesOfState(e.target.value.id), state: [e.target.value.name] })
    }
    selectCity(e) {
        this.setState({ city: [e.target.value.name] })
    }
    changeField(field, e) {
        this.setState({ [field]: e.target.value })
        console.log(this.state, 'state in signin')
    }
    check(state, fieldname, event) {
        if (event.target.checked) {
            state.push(event.target.name)
            this.setState({ [fieldname]: state })
            if (event.target.name === 'Any') {
                state = ['Any'];
                this.setState({ [fieldname]: state })
            } else {
                const index = state.indexOf('Any')
                if (index > -1) {
                    state.splice(index, 1);
                }
                this.setState({ [fieldname]: state })
            }
        } else {
            if (state.length !== 1) {
                const index = state.indexOf(event.target.name)
                if (index > -1) {
                    state.splice(index, 1);
                }
                this.setState({ [fieldname]: state })
            }
        }
    }
    checked(state, e) {
        for (var i = 0; i < state.length; i++) {
            if (state[i] === e) {
                // console.log("true mila")
                return true
            }
        }
        return false;
    }
    handleAge(value) {
        //  console.log(value,'value of age')
        this.setState({ ageStart: value[0], ageEnd: value[1] });
    };
    render() {

        return (
            <ResponsiveDrawer userData={this.props.location.state}>
                <Snackbar open={this.state.snackBarOpen} autoHideDuration={6000} onClose={this.snackBarHandle}>
                    <MuiAlert elevation={6} variant="filled" onClose={this.snackBarHandle} severity={this.state.snackBarType}>
                        {this.state.snackBarMsg}
                    </MuiAlert>
                </Snackbar>
                <div className='search-main-div'>
                    <div className='search-head'>
                        Advanced Search
                </div>
                    <div className='search-form'>
                        
                        <div className='search-section-1'>
                            <div className='sec-1-input-field-div'>
                                <RangeSlider val={[this.state.ageStart, this.state.ageEnd]} setValue={(val) => { this.handleAge(val) }} name='Age' />
                            </div>
                            <div className='sec-1-input-field-div'>
                                <TextField
                                    className='input-field'
                                    fullWidth
                                    id="standard-select-currency"
                                    select
                                    name='lastActive'
                                    label="Last Active"
                                    value={this.state.lastActive}
                                    onChange={this.handleChange}
                                // helperText="Please select your currency"
                                >
                                    {lastActive.map((e, i) => {
                                        return <MenuItem key={i} value={e}>{e}</MenuItem>
                                    })}
                                </TextField>
                            </div>
                            <div className='sec-1-input-field-div'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.hasPhoto}
                                            onChange={(event) => { this.setState({ hasPhoto: event.target.checked }); }}
                                            name="hasPhoto"
                                            color="primary"
                                        />
                                    }
                                    label="Has Photo?"
                                />
                            </div>
                        </div>
                        <div className='search-section-2'>
                            <div className='sec-2-head'>
                                Living In
                            </div>
                            <div className='sec-2-form'>

                                <div className='sec-1-input-field-div'>
                                    <TextField
                                        className='input-field'
                                        fullWidth
                                        id="standard-select-currency"
                                        select
                                        label="Country"
                                        value={this.state.country}
                                        onChange={this.selectCountry.bind(this)}
                                    // helperText="Please select your currency"
                                    >
                                        {
                                            this.state.countries.map((e, i) => {
                                                return <MenuItem key={e.name} value={e}>{e.name}</MenuItem>
                                            })
                                        }
                                    </TextField>
                                </div>
                                <div className='sec-1-input-field-div'>
                                    <TextField
                                        className='input-field'
                                        fullWidth
                                        id="standard-select-currency"
                                        select
                                        label="State/Province"
                                        value={this.state.state}
                                        onChange={this.selectState.bind(this)}
                                    // helperText="Please select your currency"
                                    >
                                        {
                                            this.state.states.map((e, i) => {
                                                return <MenuItem key={e.name} value={e}>{e.name}</MenuItem>
                                            })
                                        }
                                    </TextField>
                                </div>
                                <div className='sec-1-input-field-div'>
                                    <TextField
                                        className='input-field'
                                        fullWidth
                                        id="standard-select-currency"
                                        select
                                        label="City"
                                        value={this.state.city}
                                        onChange={this.selectCity.bind(this)}
                                    // helperText="Please select your currency"
                                    >
                                        {
                                            this.state.cities.map((e, i) => {
                                                return <MenuItem key={i} value={e}>{e.name}</MenuItem>
                                            })
                                        }
                                    </TextField>
                                </div>
                                <div className='sec-1-input-field-div'>
                                    <TextField
                                        className='input-field'
                                        fullWidth
                                        name='distance'
                                        id="standard-select-currency"
                                        select
                                        label="Within"
                                        // endAdornment={
                                        //     <InputAdornment position="end">
                                        //         <div>
                                        //             Km
                                        //      </div>
                                        //     </InputAdornment>
                                        // }
                                        value={this.state.distance}
                                        onChange={this.handleChange}
                                    // helperText="Please select your currency"
                                    >
                                        {
                                            kms.map((e, i) => {
                                                return <MenuItem key={i} value={e}>{e}</MenuItem>
                                            })
                                        }
                                    </TextField>
                                </div>
                            </div>
                        </div>
                        <div className='search-section-3'>
                            <div className='sec-3-head'>
                                Search For
                                </div>
                            <div className='sec-3-form'>
                                {
                                    ['Any', 'Marriage', 'Friendship'].map((e, i) => {
                                        var flag = false;
                                        if (this.checked(this.state.searchfor, e)) {
                                            flag = true;
                                        }
                                        return (
                                            <div key={i} className='sec-1-input-field-div'>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={flag}
                                                            onChange={this.check.bind(this, this.state.searchfor, 'searchfor')}
                                                            name={e}
                                                            color="primary"
                                                        />
                                                    }
                                                    label={e}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='search-section-4'>
                            <div className='sec-4-head'>
                                Basic Information
                                {!this.state.collapse6 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '6', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '6', false)} />}
                            </div>
                            <Collapse in={this.state.collapse6}>
                                <div className='inside-collapse'>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Ethnic Origin
                                                {!this.state.collapse6_1 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '6_1', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '6_1', false)} />}
                                            </div>
                                            <div className='text-2'>
                                                {this.state.ethnicOrigin.map((e, i) => {
                                                    return this.state.ethnicOrigin.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse6_1}>
                                            <div className='collapse'>
                                                {
                                                    ethnic_origins.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.ethnicOrigin, e)) {
                                                            flag = true;
                                                        }
                                                        return (
                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.ethnicOrigin, 'ethnicOrigin')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Nationality
                                                {!this.state.collapse6_2 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '6_2', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '6_2', false)} />}
                                            </div>
                                            <div className='text-2'>
                                                {this.state.nationality.map((e, i) => {
                                                    return this.state.nationality.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse6_2}>
                                            <div className='collapse'>
                                                {
                                                    nationalities.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.nationality, e)) {
                                                            flag = true;
                                                        }
                                                        return (
                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.nationality, 'nationality')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Language
                                                {!this.state.collapse6_3 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '6_3', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '6_3', false)} />}
                                            </div>
                                            <div className='text-2'>
                                                {this.state.nationality.map((e, i) => {
                                                    return this.state.nationality.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse6_3}>
                                            <div className='collapse'>
                                                {
                                                    languageList.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.nationality, e)) {
                                                            flag = true;
                                                        }
                                                        return (
                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.nationality, 'nationality')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Second Language
                                                {!this.state.collapse6_4 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '6_4', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '6_4', false)} />}
                                            </div>
                                            <div className='text-2'>
                                                {this.state.nationality.map((e, i) => {
                                                    return this.state.nationality.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse6_4}>
                                            <div className='collapse'>
                                                {
                                                    secondLanguageList.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.nationality, e)) {
                                                            flag = true;
                                                        }
                                                        return (
                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.nationality, 'nationality')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                </div>
                            </Collapse>

                            <div className='sec-4-head'>
                                Their Appearance
                                {!this.state.collapse1 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '1', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '1', false)} />}
                            </div>
                            <Collapse in={this.state.collapse1}>
                                <div className='inside-collapse'>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Height
                                                {!this.state.collapse1_1 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '1_1', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '1_1', false)} />}
                                            </div>
                                            <div className='text-2'>
                                                between {this.state.heightStart + ' '}
                                                 and {this.state.heightEnd}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse1_1}>
                                            <div className='collapse'>
                                                <div className='sec-1-input-field-div'>
                                                    {/* <TextField
                                                        className='input-field'
                                                        label="Height Range Start (in ft)"
                                                        placeholder="Enter height Range Start"
                                                        // variant="outlined"
                                                        value={this.state.heightStart}
                                                        type="number"
                                                        onChange={this.changeField.bind(this, 'heightStart')}
                                                    /> */}
                                                    <TextField
                                                        className='input-field'
                                                        fullWidth
                                                        id="standard-select-currency"
                                                        select
                                                        label="Height Range Start"
                                                        value={this.state.heightStart}
                                                        onChange={this.changeState.bind(this, 'heightStart')}
                                                    >
                                                        {heightList.map((e, i) => {
                                                            return <MenuItem key={i} value={e}>{e}</MenuItem>
                                                        })}
                                                    </TextField>
                                                </div>
                                                <div className='sec-1-input-field-div'>
                                                    <TextField
                                                        className='input-field'
                                                        fullWidth
                                                        id="standard-select-currency"
                                                        select
                                                        label="Height Range End"
                                                        value={this.state.heightEnd}
                                                        onChange={this.changeState.bind(this, 'heightEnd')}
                                                    >
                                                        {heightList.map((e, i) => {
                                                            return <MenuItem key={i} value={e}>{e}</MenuItem>
                                                        })}
                                                    </TextField>
                                                    {/* <TextField
                                                        className='input-field'
                                                        label="Height Range End (in ft)"
                                                        placeholder="Enter height Range End"
                                                        // variant="outlined"
                                                        type="number"
                                                        value={this.state.heightEnd}
                                                        onChange={this.changeField.bind(this, 'heightEnd')}
                                                    /> */}
                                                </div>
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Eye Color
                                                {!this.state.collapse1_2 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '1_2', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '1_2', false)} />}
                                            </div>
                                            <div className='text-2'>
                                                {this.state.eyeColor.map((e, i) => {
                                                    return this.state.eyeColor.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse1_2}>
                                            <div className='collapse'>
                                                {
                                                    eyeColorList.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.eyeColor, e)) {
                                                            flag = true;
                                                        }
                                                        return (
                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            name={e}
                                                                            onChange={this.check.bind(this, this.state.eyeColor, 'eyeColor')}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Body Type
                                                {!this.state.collapse1_3 ?
                                                    <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '1_3', true)} /> :
                                                    <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '1_3', false)} />}
                                            </div>
                                            <div className='text-2'>
                                                {this.state.bodytype.map((e, i) => {
                                                    return this.state.bodytype.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse1_3}>
                                            <div className='collapse'>
                                                {
                                                    bodyTypeList.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.bodytype, e)) {
                                                            flag = true;
                                                        }
                                                        return (
                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.bodytype, 'bodyType')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Hair Color
                                                {!this.state.collapse1_4 ?
                                                    <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '1_4', true)} /> :
                                                    <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '1_4', false)} />}
                                            </div>
                                            <div className='text-2'>
                                                {this.state.hairColor.map((e, i) => {
                                                    return this.state.hairColor.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse1_4}>
                                            <div className='collapse'>
                                                {
                                                    hairColorList.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.hairColor, e)) {
                                                            flag = true;
                                                        }
                                                        return (

                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.hairColor, 'hairColor')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Disablility
                                                {!this.state.collapse1_5 ?
                                                    <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '1_5', true)} /> :
                                                    <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '1_5', false)} />}
                                            </div>
                                            <div className='text-2'>
                                                {this.state.disability.map((e, i) => {
                                                    return this.state.disability.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse1_5}>
                                            <div className='collapse'>
                                                {
                                                    disabilityList.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.disability, e)) {
                                                            flag = true;
                                                        }
                                                        return (
                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.disability, 'diability')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                </div>
                            </Collapse>

                            <div className='sec-4-head'>
                                Life Style
                                {!this.state.collapse2 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '2', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '2', false)} />}
                            </div>
                            <Collapse in={this.state.collapse2}>
                                <div className='inside-collapse'>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Personality Style
                                                {!this.state.collapse2_1 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '2_1', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '2_1', false)} />}
                                            </div>
                                            <div className='text-2'>
                                                {this.state.personalitystyle.map((e, i) => {
                                                    return this.state.personalitystyle.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse2_1}>
                                            <div className='collapse'>
                                                {
                                                    personalityStyleList.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.personalities, e)) {
                                                            flag = true;
                                                        }
                                                        return (
                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.personalitystyle, 'personalitystyle')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Personal Wealth
                                                {!this.state.collapse2_2 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '2_2', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '2_2', false)} />}
                                            </div>
                                            <div className='text-2'>
                                                {this.state.personalwealth.map((e, i) => {
                                                    return this.state.personalwealth.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse2_2}>
                                            <div className='collapse'>
                                                {
                                                    personalWealthList.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.personalwealth, e)) {
                                                            flag = true;
                                                        }
                                                        return (

                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.personalwealth, 'personalwealth')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })

                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Marital Status
                                                {!this.state.collapse2_3 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '2_3', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '2_3', false)} />}
                                            </div>
                                            <div className='text-2'>

                                                {this.state.martialStatus.map((e, i) => {
                                                    return this.state.martialStatus.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse2_3}>
                                            <div className='collapse'>
                                                {
                                                    maritalStatusList.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.martialStatus, e)) {
                                                            flag = true;
                                                        }
                                                        return (
                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.martialStatus, 'martialStatus')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Religious Affiliation

                                                {!this.state.collapse2_4 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '2_4', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '2_4', false)} />}
                                            </div>
                                            <div className='text-2'>

                                                {this.state.religiousAff.map((e, i) => {
                                                    return this.state.religiousAff.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse2_4}>
                                            <div className='collapse'>
                                                {
                                                    religiousAffiliationList.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.religiousAff, e)) {
                                                            flag = true;
                                                        }
                                                        return (

                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.religiousAff, 'religiousAff')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Children
                                                {!this.state.collapse2_5 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '2_5', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '2_5', false)} />}
                                            </div>
                                            <div className='text-2'>
                                                {this.state.noOfChildren}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse2_5}>
                                            <div className='collapse'>
                                                <div className='sec-1-input-field-div'>
                                                    <TextField
                                                        className='input-field'
                                                        fullWidth
                                                        id="standard-select-currency"
                                                        select
                                                        label="no of Children"
                                                        name='noOfChildren'
                                                        value={this.state.noOfChildren}
                                                        onChange={this.handleChange}
                                                    // helperText="Please select your currency"
                                                    >
                                                        {
                                                            childrenList.map((e, i) => {

                                                                return (
                                                                    <MenuItem key={i} value={e}>
                                                                        {e}
                                                                    </MenuItem>
                                                                )
                                                            })
                                                        }
                                                    </TextField>
                                                </div>
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Siblings
                                                {!this.state.collapse2_10 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '2_10', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '2_10', false)} />}
                                            </div>
                                            <div className='text-2'>
                                                {this.state.noOfSiblings}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse2_10}>
                                            <div className='collapse'>
                                                <div className='sec-1-input-field-div'>
                                                    <TextField
                                                        className='input-field'
                                                        fullWidth
                                                        id="standard-select-currency"
                                                        select
                                                        label="no of Sibliings"
                                                        name='noOfSiblings'
                                                        value={this.state.noOfSiblings}
                                                        onChange={this.handleChange}
                                                    // helperText="Please select your currency"
                                                    >
                                                        {
                                                            siblingsList.map((e, i) => {
                                                                return (
                                                                    <MenuItem key={i} value={e}>
                                                                        {e}
                                                                    </MenuItem>
                                                                )
                                                            })
                                                        }
                                                    </TextField>
                                                </div>
                                                {/* <div className='sec-1-input-field-div'>
                                                    <TextField
                                                        fullWidth
                                                        value={this.state.noOfSiblings}
                                                        onChange={this.changeState.bind(this, 'noOfSiblings')}
                                                        id="filled-number"
                                                        label="No of Siblings"
                                                        type="number"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </div> */}
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Living Status
                                                {!this.state.collapse2_6 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '2_6', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '2_6', false)} />}
                                            </div>
                                            <div className='text-2'>

                                                {this.state.livingStatus.map((e, i) => {
                                                    return this.state.livingStatus.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse2_6}>
                                            <div className='collapse'>
                                                {
                                                    livingStatusList.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.livingStatus, e)) {
                                                            flag = true;
                                                        }
                                                        return (
                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.livingStatus, 'livingStatus')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Willing to Move
                                                {!this.state.collapse2_7 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '2_7', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '2_7', false)} />}
                                            </div>
                                            <div className='text-2'>

                                                {this.state.move.map((e, i) => {
                                                    return this.state.move.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse2_7}>
                                            <div className='collapse'>
                                                {
                                                    willingToMoveList.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.move, e)) {
                                                            flag = true;
                                                        }
                                                        return (
                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.move, 'move')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Diet
                                                {!this.state.collapse2_8 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '2_8', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '2_8', false)} />}
                                            </div>
                                            <div className='text-2'>

                                                {this.state.diet.map((e, i) => {
                                                    return this.state.diet.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse2_8}>
                                            <div className='collapse'>
                                                {
                                                    dietList.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.diet, e)) {
                                                            flag = true;
                                                        }
                                                        return (
                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.diet, 'diet')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Collapse>
                                    </div>

                                </div>
                            </Collapse>

                            <div className='sec-4-head'>
                                Additional Information
                                {!this.state.collapse3 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '3', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '3', false)} />}
                            </div>
                            <Collapse in={this.state.collapse3}>
                                <div className='inside-collapse'>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Polygamy
                                                {!this.state.collapse3_1 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '3_1', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '3_1', false)} />}
                                            </div>
                                            <div className='text-2'>
                                                {this.state.polygamy.map((e, i) => {
                                                    return this.state.polygamy.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse3_1}>
                                            <div className='collapse'>
                                                {
                                                    polygamyList.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.polygamy, e)) {
                                                            flag = true;
                                                        }
                                                        return (
                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.polygamy, 'polygamy')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Father Alive
                                                {!this.state.collapse3_2 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '3_2', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '3_2', false)} />}
                                            </div>
                                            <div className='text-2'>
                                                {this.state.personalwealth.map((e, i) => {
                                                    return this.state.fatherAlive.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse3_2}>
                                            <div className='collapse'>
                                                {
                                                    fatherAliveList.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.fatherAlive, e)) {
                                                            flag = true;
                                                        }
                                                        return (

                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.fatherAlive, 'fatherAlive')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })

                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Profile Created By
                                                {!this.state.collapse3_3 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '3_3', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '3_3', false)} />}
                                            </div>
                                            <div className='text-2'>

                                                {this.state.profCreatedBy.map((e, i) => {
                                                    return this.state.profession.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse3_3}>
                                            <div className='collapse'>
                                                {
                                                    profileCreatedByList.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.profCreatedBy, e)) {
                                                            flag = true;
                                                        }
                                                        return (
                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.profCreatedBy, 'profCreatedBy')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Mother Alive
                                                {!this.state.collapse3_4 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '3_4', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '3_4', false)} />}
                                            </div>
                                            <div className='text-2'>
                                                {this.state.motherAlive.map((e, i) => {
                                                    return this.state.motherAlive.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse3_4}>
                                            <div className='collapse'>
                                                {
                                                    motherAliveList.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.motherAlive, e)) {
                                                            flag = true;
                                                        }
                                                        return (

                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.motherAlive, 'motherAlive')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })

                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                </div>
                            </Collapse>

                            <div className='sec-4-head'>
                                Professional Information
                                {!this.state.collapse4 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '4', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '4', false)} />}
                            </div>
                            <Collapse in={this.state.collapse4}>
                                <div className='inside-collapse'>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Education
                                                {!this.state.collapse4_1 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '4_1', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '4_1', false)} />}
                                            </div>
                                            <div className='text-2'>
                                                {this.state.education.map((e, i) => {
                                                    return this.state.education.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse4_1}>
                                            <div className='collapse'>
                                                {
                                                    educationList.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.education, e)) {
                                                            flag = true;
                                                        }
                                                        return (
                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.education, 'education')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Profession
                                                {!this.state.collapse4_2 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '4_2', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '4_2', false)} />}
                                            </div>
                                            <div className='text-2'>
                                                {this.state.profession.map((e, i) => {
                                                    return this.state.profession.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse4_2}>
                                            <div className='collapse'>
                                                {
                                                    professionList.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.profession, e)) {
                                                            flag = true;
                                                        }
                                                        return (

                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.profession, 'profession')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })

                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Ambition
                                                {!this.state.collapse4_3 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '4_3', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '4_3', false)} />}
                                            </div>
                                            <div className='text-2'>

                                                {this.state.ambition.map((e, i) => {
                                                    return this.state.ambition.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse4_3}>
                                            <div className='collapse'>
                                                {
                                                    ambitionList.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.ambition, e)) {
                                                            flag = true;
                                                        }
                                                        return (
                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.ambition, 'ambition')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                </div>
                            </Collapse>

                            <div className='sec-4-head'>
                                Partner Preferences
                                {!this.state.collapse5 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '5', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '5', false)} />}
                            </div>
                            <Collapse in={this.state.collapse5}>
                                <div className='inside-collapse'>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Drink
                                                {!this.state.collapse5_1 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '5_1', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '5_1', false)} />}
                                            </div>
                                            <div className='text-2'>
                                                {this.state.drink.map((e, i) => {
                                                    return this.state.drink.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse5_1}>
                                            <div className='collapse'>
                                                {
                                                    drinkList.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.drink, e)) {
                                                            flag = true;
                                                        }
                                                        return (
                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.drink, 'drink')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div className='collapse-items'>
                                        <div className='collapse-items-head'>
                                            <div className='text-1'>
                                                Smoking
                                                {!this.state.collapse2_9 ? <KeyboardArrowDownIcon onClick={this.toggleCollapse.bind(this, '2_9', true)} /> : <KeyboardArrowUpIcon onClick={this.toggleCollapse.bind(this, '2_9', false)} />}
                                            </div>
                                            <div className='text-2'>
                                                {this.state.smoking.map((e, i) => {
                                                    return this.state.smoking.length - 1 === i ? e : e + ', '
                                                })}
                                            </div>
                                        </div>
                                        <Collapse in={this.state.collapse2_9}>
                                            <div className='collapse'>
                                                {
                                                    smokingList.map((e, i) => {
                                                        var flag = false;
                                                        if (this.checked(this.state.smoking, e)) {
                                                            flag = true;
                                                        }
                                                        return (
                                                            <div key={i} className='sec-1-input-field-div'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={flag}
                                                                            onChange={this.check.bind(this, this.state.smoking, 'smoking')}
                                                                            name={e}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label={e} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Collapse>
                                    </div>
                                </div>
                            </Collapse>
                        </div>
                        <div className='save-search-div'>
                            <div className='text'>
                                Press save button to save your profile preferences
                                </div>
                            <div className='btn-div'>
                                <Button onClick={this.goToSearch} variant="contained" color="primary">
                                    Search <CircularProgress size={20} color="primary" style={!this.state.loading && {display:'none'}} />
                                    </Button>
                            </div>
                        </div>
                   
                   </div>
                </div>
                <Footer />
            </ResponsiveDrawer>

        )
    }
}
export default AdvanceSearch