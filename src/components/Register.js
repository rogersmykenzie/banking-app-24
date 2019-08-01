import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {updateBalance, updateName, updateUsername} from '../redux/reducer';
import {connect} from 'react-redux'; //Ali said that

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            password: '',
            verifyPassword: '',
            username: '',
            unsuccessfulLogin: false,
            usernameWasTaken: false,
            redirect: false
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
            axios.post('/auth/register', body).then(response => {
                console.log(response);
                this.props.updateBalance(response.data.balance);
                this.props.updateName(response.data.name);
                this.props.updateUsername(response.data.username);
                this.setState({redirect: true})
            })
            .catch(error => {
                if(error.request.status === 406 && error.response.data.error === 'USERNAME_TAKEN') {
                    this.setState({usernameWasTaken: true});
                }
            });
        }
    }

    render() {
        console.log(this.state);

        if(this.state.redirect === true) {
            return <Redirect to='/account' />
        }

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
                {
                    this.state.usernameWasTaken === true
                ?
                    <h1>That username is taken. Please try picking another</h1>
                :
                    null
                }
            </div>
        )
    }
}

export default connect(undefined, { updateBalance, updateName, updateUsername })(Register);