import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { FormControlLabel, Checkbox, Button, Link, Typography, Snackbar,CircularProgress} from '@material-ui/core'
import Footer from '../../components/footer/index'
import InfoCard from '../../components/infoCard/index'
import MuiAlert from '@material-ui/lab/Alert';
import { signIn, forgetPassword } from '../../networking/api'
// import {socket } from '../../networking/socket'
import './login.css'

export default class Login extends Component {
    state = {
        forgetPassword: false,
        email: '',
        password: '',
        forgetpasswordemail: '',
        snackBarOpen: false,
        snackBarMsg: '',
        snackBarType: '',
        loading:false,
    }
    changeField(field, e) {
        this.setState({ [field]: e.target.value })
        console.log(this.state, 'state in signin')
    }
    snackBar(msg, type) {
        this.setState({ snackBarOpen: true, snackBarType: type, snackBarMsg: msg })
    }
    snackBarHandle = () => {
        this.setState({ snackBarOpen: false })
    }
    stopLoading(){
        this.setState({loading:false});
    }
    submit = () => {
        this.setState({loading:true})
        const { email, password } = this.state;
        if ((email, password)) {
            let emailRegExTest = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim).test(email);
            let passwordRegExTest = new RegExp(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/gim).test(password);
            let userObj = { email, password };
            if (emailRegExTest && passwordRegExTest) {
                var res = signIn(userObj);
                res.then((data) => {
                    console.log(data, 'data in login')
                    if (data.message === "Login success") {
                        this.stopLoading();
                        this.snackBar("logged In", "success");
                        this.props.history.push('/panel/users',data);
                    }
                    else {
                        this.stopLoading();
                        this.snackBar(data.message, "error");
                    }
                }).catch((e) => {
                    console.log(e)
                    this.stopLoading();
                    this.snackBar("Something went wrong!", "error");
                })
            } else {
                
                this.stopLoading();
                this.snackBar("Please Insert Valid Information", "error");
            }
        } else {
            
            this.stopLoading();
            this.snackBar("All Fields Must be filled", "error");
        }
    };
    forgetPassword = () => {
        const { forgetpasswordemail } = this.state;
        if ((forgetpasswordemail)) {
            let emailRegExTest = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim).test(forgetpasswordemail);
            let userObj = { email: forgetpasswordemail };
            if (emailRegExTest) {
                var res = forgetPassword(userObj);
                res.then((data) => {
                    console.log(data, 'data')
                    // if("Login success"){
                    //     this.snackBar("logged In","success");
                    //     this.props.history.push('/panel/users',data)
                    // }
                    // else{
                    //     this.snackBar("no such user","error");
                    // }
                }).catch((e) => {
                    this.snackBar("Something went wrong!", "error");
                })
            } else {
                this.snackBar("Please Insert Valid Information", "error");
            }
        } else {
            this.snackBar("All Fields Must be filled", "error");
        }
    }
    render() {
        return (
            <div className='login-main-container'>
                <Snackbar open={this.state.snackBarOpen} autoHideDuration={6000} onClose={this.snackBarHandle}>
                    <MuiAlert elevation={6} variant="filled" onClose={this.snackBarHandle} severity={this.state.snackBarType}>
                        {this.state.snackBarMsg}
                    </MuiAlert>
                </Snackbar>
                <div className='login-container'>
                    {this.state.forgetPassword ?
                        <div className='login-card'>
                            <div className='login-form-head'>
                                Reset Password
                            </div>
                            <div className='login-form'>
                                <div className='reset-password-text'>
                                    Enter your Email Address below to get the Reset Password Link
                                </div>

                                <div className='input-field-div'>
                                    <TextField
                                        className='input-field'
                                        label="Email"
                                        placeholder="ex: avc@xyz.com"
                                        variant="outlined"
                                        value={this.state.forgetpasswordemail}
                                        onChange={this.changeField.bind(this, 'forgetpasswordemail')}
                                    />
                                </div>
                                <div className='signin-btn'>
                                    <Button onClick={this.forgetPassword} fullWidth variant="contained" color="primary">
                                        Send Email
                                    </Button>
                                </div>
                                <Button onClick={() => { this.setState({ forgetPassword: false }) }} fullWidth variant="contained" color="secondary">
                                    Back
                                    </Button>
                                <div className='or-div'>
                                    OR
                                </div>
                                <div className='create-account-link-div'>
                                    <Link onClick={() => { this.props.history.push('/signup') }} className='forget-pass-link' href="#">
                                        Create a new Account
                                    </Link>
                                </div>

                            </div>
                        </div>

                        : <div className='login-card'>
                            <div className='login-form-head'>
                                Sign In
                            </div>
                            <div className='login-form'>

                                <div className='input-field-div'>
                                    <TextField
                                        className='input-field'
                                        label="Email"
                                        placeholder="ex: avc@xyz.com"
                                        variant="outlined"
                                        value={this.state.email}
                                        onChange={this.changeField.bind(this, 'email')}
                                    />
                                </div>

                                <div className='input-field-div'>

                                    <TextField
                                    type="password"
                                        className='input-field'
                                        label="password"
                                        placeholder="Enter Password"
                                        variant="outlined"
                                        value={this.state.password}
                                        onChange={this.changeField.bind(this, 'password')}
                                    />
                                </div>
                                <div className='remember-me-div'>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label="Remember Me"
                                    />
                                </div>
                                <div className='signin-btn'>
                                    <Button style={this.state.loading ? {opacity:0.5}:{}} disabled={this.state.loading}  onClick={this.submit} fullWidth variant="contained" color="primary">
                                        Sign In &nbsp; <CircularProgress color={'white'} size={20} style={!this.state.loading && {display:'none'}} />
                                    </Button>
                                </div>
                                <div className='forget-pass-div'>
                                    <Link onClick={() => { this.setState({ forgetPassword: true }) }} className='forget-pass-link' href="#">
                                        Forgotten Password?
                                    </Link>
                                </div>
                                <Typography className='terms-div'>
                                    By countiniung, you are confirming that you have read and agree to our
                                <Link href="#">
                                        {" "} Terms and Conditions
                                    </Link>
                                , and  &nbsp;
                                 <Link href="#">
                                        {" "} Privacy Policy.
                                </Link>
                                </Typography>
                                <div className='or-div'>
                                    OR
                                </div>
                                <Button onClick={() => { this.props.history.push('/signup') }} fullWidth variant="contained" color="primary">
                                    Create An Account
                                    </Button>
                            </div>
                        </div>
                    }

                    <div className='login-logo-div'>
                        <div className='login-logo-img-text-div'>
                            <div className='login-logo-img-div'>
                                <img alt='logo' className='login-zoja-logo' src={require('../../assets/logo3.webp')} />
                                {/* <p className='matri-text'> Matrimonio </p> */}
                            </div>
                            <div className='login-logo-text'>
                                " then marry women of your choice, two or three, or four but if you fear that you shall not to able to deal justly, then only one" - Quran 4:3 "
                                </div>
                        </div>
                    </div>
                </div>
                <InfoCard />
                <Footer />
            </div>
        )

    }


}