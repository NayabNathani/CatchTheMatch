import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { FormControlLabel, Checkbox, Button, Link, MenuItem,Snackbar,CircularProgress } from '@material-ui/core'
import MaterialUIPickers from '../../components/datePicker/index'
import Footer from '../../components/footer/index'
import MuiAlert from '@material-ui/lab/Alert';
import { signUp } from '../../networking/api'
import './signup.css'

export default class Signup extends Component {
    state = {
        next: false,
        gender: '',
        profileCreatedBy: '',
        email: '',
        username: '',
        password: '',
        verifyPassword: '',
        dateOfBirth: new Date('2000-01-01'),
        polygamy: '',
        snackBarOpen:false,
        loading:false,
    }
    handleChange = (event) => {
        console.log(this.state, 'state');
        this.setState({ [event.target.name]: event.target.value })
    };
    snackBar(msg,type){
        this.setState({snackBarOpen:true,snackBarType:type,snackBarMsg:msg})
    }
    stopLoading(){
        this.setState({loading:false});
    }
    startLoading(){
        this.setState({loading:true})
    }
    onSubmit =  () => {
        this.startLoading();
        const { gender, email, password, username, verifyPassword, dateOfBirth, profileCreatedBy,polygamy } = this.state;
        if ((gender, email, password, username, verifyPassword, dateOfBirth, profileCreatedBy,polygamy)) {
            var today = new Date();
            var age =today.getFullYear() - dateOfBirth.getFullYear();
            console.log(age,'ageee')
            // let fullNameRegExTest = new RegExp(/^[A-Za-z\s]+$/gim).test(username);
            let emailRegExTest = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim).test(email);
            let passwordRegExTest = new RegExp(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/gim).test(password);
            let userNameRegExTest = new RegExp(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/gim).test(username);
            // let mobileNumberRegExTest = new RegExp(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/gim).test(mobileNumber);
            let userObj = { gender, email, username, password, dateOfBirth, profileCreatedBy,accept_polygamy:polygamy,age };
            if (emailRegExTest && passwordRegExTest && userNameRegExTest) {
                if (password !== verifyPassword) {
                    this.stopLoading();
                   this.snackBar("Password doesn't match!","error");
                }
                else {
                    var res = signUp(userObj);
                    res.then((data) => {
                        this.stopLoading();
                        console.log(data, 'data in signup');
                        if(data.signal === 'verificationEmailSent'){
                            this.snackBar("An Verification email is sent to your Address","success");
                            
                            this.setState({email:'',password:'',username:'',verifyPassword:'',dateOfBirth:'',profileCreatedBy:'',polygamy:''});
                        }else{
                            this.snackBar(data.message,"error");
                        }
                    }).catch((e)=>{
                        this.stopLoading();
                        this.snackBar("Something went wrong!","error");
                    })
            } 
        }else {
            this.stopLoading();
            if(username.length < 5){
            this.snackBar("Username must be greater than 5 letters","error");
            }else{
                this.snackBar("Please Insert Valid Information","error");
            }
            }
        } else {
            this.stopLoading();
            this.snackBar("All Fields Must be filled","error");
        }
    };
    snackBarHandle=()=>{
        this.setState({snackBarOpen:false})
    }
    render() {
        return (
            <div className='signup-main-container'>
                <Snackbar open={this.state.snackBarOpen} autoHideDuration={6000} onClose={this.snackBarHandle}>
                <MuiAlert elevation={6} variant="filled" onClose={this.snackBarHandle} severity={this.state.snackBarType}>
                        {this.state.snackBarMsg}
                    </MuiAlert>
                </Snackbar>
                <div className='black-opacity'></div>
                <div className='signup-container'>
                    {/* <div className='signup-form-div'> */}
                    <div className='signup-card'>
                        <div className='signup-form-head'>
                            Sign Up
                            </div>
                        {
                            !this.state.next ?

                                <div className='signup-form'>

                                    <div className='input-field-div'>
                                        <TextField
                                            fullWidth
                                            select
                                            label="I am"
                                            variant="outlined"
                                            value={this.state.gender}
                                            name='gender'
                                            onChange={this.handleChange}
                                        // helperText="Please select your currency"
                                        >
                                            <MenuItem key={0} value={'Male'}>
                                                A Man Seeking Second Wife
                                            </MenuItem>
                                            <MenuItem key={1} value={'Female'}>
                                                A Woman Seeking a Husband
                                            </MenuItem>
                                        </TextField>
                                    </div>

                                    <div className='input-field-div'>

                                        <TextField
                                            value={this.state.username}
                                            name='username'
                                            onChange={this.handleChange}
                                            variant="outlined" className='input-field' label="Username" />
                                    </div>
                                    <div className='remember-me-div'>
                                        <MaterialUIPickers setDate={(date) => { this.setState({ dateOfBirth: date }) }} />
                                    </div>
                                    <div className='input-field-div'>
                                        <TextField
                                            fullWidth
                                            select
                                            variant="outlined"
                                            label="Profile Created By"
                                            value={this.state.profileCreatedBy}
                                            name='profileCreatedBy'
                                            onChange={this.handleChange}
                                        // value={currency}
                                        // onChange={handleChange}
                                        // helperText="Please select your currency"
                                        >
                                            <MenuItem key={'Self'} value={'Self'}>
                                                {'Self'}
                                            </MenuItem>
                                            <MenuItem key={'Relative'} value={'Relative'}>
                                                {'Relative'}
                                            </MenuItem>
                                            <MenuItem key={'Parents'} value={'Parents'}>
                                                {'Parents'}
                                            </MenuItem>
                                            <MenuItem key={'Brother/Sister'} value={'Brother/Sister'}>
                                                {'Brother/Sister'}
                                            </MenuItem>
                                            <MenuItem key={'Other'} value={'Other'}>
                                                {'Other'}
                                            </MenuItem>
                                        </TextField>
                                    </div>
                                    <div className='signup-btn'>
                                        <Button onClick={() => { this.setState({ next: true }) }} fullWidth variant="contained" color="primary">
                                            Continue
                                    </Button>
                                    </div>
                                    <div className='already-mem-div'>
                                        <Link className='already-mem-link' href="#">
                                            Already a member?
                                            </Link>
                                    </div>
                                    <Button onClick={() => { this.props.history.push('/') }} fullWidth variant="contained" color="primary">
                                        Sign In
                                        </Button>
                                </div>
                                :
                                <div className='signup-form'>

                                    <div className='input-field-div'>
                                        <TextField
                                            value={this.state.email}
                                            name='email'
                                            onChange={this.handleChange}
                                            variant="outlined" className='input-field' label="Email" />
                                    </div>
                                    <div className='input-field-div'>
                                        <TextField
                                            type={'password'}
                                            value={this.state.password}
                                            name='password'
                                            onChange={this.handleChange}
                                            variant="outlined" className='input-field' label="Password" />
                                    </div>
                                    <div className='remember-me-div'>
                                        <TextField
                                            type="password"
                                            value={this.state.verifyPassword}
                                            name='verifyPassword'
                                            onChange={this.handleChange}
                                            variant="outlined" className='input-field' label="Verify Password" />
                                    </div>
                                    <div className='input-field-div'>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            select
                                            label="Accept Polygamy (One or More wives)"
                                            value={this.state.polygamy}
                                            name='polygamy'
                                            onChange={this.handleChange}
                                        >
                                            <MenuItem key={0} value={'Yes'}>
                                                Yes
                                            </MenuItem>
                                            <MenuItem key={1} value={'No'}>
                                                No
                                            </MenuItem>
                                        </TextField>
                                    </div>
                                    <div className='remember-me-div'>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="checkedB"
                                                    color="primary"
                                                />
                                            }
                                            label="Yes, I agree to the Terms of Use and Privacy Statements"
                                        />
                                    </div>
                                    <div className='signup-btn'>
                                        <Button 
                                        style={!!this.state.loading ? {opacity:0.5} : {opacity:1}}
                                         disabled={this.state.loading} 
                                        onClick={this.onSubmit} 
                                        fullWidth variant="contained" color="primary"
                                        >
                                            Create Account &nbsp; 
                                            <CircularProgress color={'secondary'} size={20} style={!this.state.loading && {display:'none'}} />
                                            </Button>
                                    </div>
                                    <div className='signup-btn'>
                                        <Button onClick={() => { this.setState({ next: false }) }} fullWidth variant="contained" color="secondary">
                                            Back
                                            </Button>
                                    </div>
                                    <div className='already-mem-div'>
                                        <Link className='already-mem-link' href="#">
                                            Already a member?
                        </Link>
                                    </div>

                                    <Button onClick={() => { this.props.history.push('/') }} fullWidth variant="contained" color="primary">
                                        Sign In
                        </Button>
                                </div>}

                    </div>
                    {/* </div> */}
                    <div className='signup-logo-div'>
                        <div className='signup-logo-img-text-div'>
                            <div className='signup-logo-img-div'>
                                <img alt='logo' className='signup-logo' src={require('../../assets/logo3.webp')} />
                                    {/* <p>
                                        Catch The Match
                                    </p>         */}
                            </div>
                            <div className='signup-logo-text'>
                                " then marry women of your choice, two or three, or four but if you fear that you shall not to able to deal justly, then only one" - Quran 4:3 "
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )

    }


}