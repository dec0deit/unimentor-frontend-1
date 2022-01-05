
import './css/style.css';
import React from 'react';
import logo from './img/logo.png';
import { Component } from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';

class Studentlogin extends Component {

    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            email: '',
            password: '',
            errors: {},
            redirectToReferrer: false
        }
    }
    handleValidation() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;
        //Email
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Please enter a email";
        }
        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf("@");
            let lastDotPos = fields["email"].lastIndexOf(".");
            if (
                !(
                    lastAtPos < lastDotPos &&
                    lastAtPos > 0 &&
                    fields["email"].indexOf("@@") == -1 &&
                    lastDotPos > 2 &&
                    fields["email"].length - lastDotPos > 2
                )
            ) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Please enter a password";
        }
        this.setState({ errors: errors });
        return formIsValid;
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangepassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        if (this.handleValidation()) {
            const obj = {
                email: this.state.email,
                password: this.state.password
            };
            axios.post('https://uni-mentor-backend.vercel.app/student/login', obj)
                .then(result => {
                    let responseJson = result;
                    // console.log(responseJson.data.success);
                    if (responseJson.data.success === true) {
                        localStorage.setItem('userData', JSON.stringify(responseJson));
                        this.setState({ redirectToReferrer: true });
                    }
                    else {
                        alert("Username or Password is not correct");
                    }
                }
                )
                .catch(error => {
                    console.log(error.response)
                });
            this.setState({
                email: '',
                password: ''
            })
        }
        const obj = {
            email: this.state.email,
            password: this.state.password,
        };

    }
    render() {
        if (this.state.redirectToReferrer || localStorage.getItem('userData')) {
            return (<Redirect to={'/StudentDashboard'} />)
        }
        return (
            <div >
                <section className="Form-block">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-centerblock">
                                    <a href="#" className="logo"><img src={logo} /></a>
                                    <div className="from-start">
                                        <form>
                                            <div className="mb-3 mt-3">
                                                <label className="form-label">Email</label>
                                                <input type="email" className="form-control form-control-lg" id="email"
                                                    placeholder="Enter email" name="email"
                                                    value={this.state.email}
                                                    onChange={this.onChangeEmail}
                                                />
                                            </div>

                                            <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                                            <div className="mb-3 mt-3">
                                                <label className="form-label">password</label>
                                                <input type="tel" className="form-control form-control-lg" id="tel"
                                                    placeholder="password No" name="password"
                                                    value={this.state.password}
                                                    onChange={this.onChangepassword}
                                                />
                                            </div>

                                            <span style={{ color: "red" }}>{this.state.errors["password"]}</span>


                                            <button type="submit" onClick={this.onSubmit} className="btn btn-website">Login</button>
                                        </form>
                                        <p>    <Link to={'/StudentForgotPassword'}>Forgot your password?</Link></p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div >
        );
    }
}
export default Studentlogin;