import React from 'react';
import Axios from 'axios';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            password: '',
            verifyPassword: '',
            username: '',
            unsuccessfulLogin: false
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick = e => {
        if(this.state.password !== this.state.verifyPassword) {
            this.setState({unsuccessfulLogin: true});
        } else {
            let body = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password,
                username: this.state.username
            }
        }
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <input 
                placeholder='First Name' 
                onChange={this.handleChange}
                name="firstName"
                />
                <input 
                placeholder="Last Name" 
                onChange={this.handleChange}
                name="lastName"
                />
                <input 
                placeholder="Username" 
                onChange={this.handleChange}
                name="username"
                />
                <input 
                placeholder="Password" 
                type='password' 
                onChange={this.handleChange}
                name="password"
                />
                <input 
                placeholder="Verify Password" 
                type='password' 
                onChange={this.handleChange}
                name="verifyPassword"
                />
                <button
                onClick={this.handleClick}>
                    Register
                </button>
                <br />
                {
                    this.state.unsuccessfulLogin === true 
                ? 
                    <h1>Your passwords did not match. Please enter two matching passwords</h1> 
                : 
                    null
                }
            </div>
        )
    }
}

export default Register;