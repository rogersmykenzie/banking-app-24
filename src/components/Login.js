import React from 'react';
//axios
import axios from 'axios';
//redux
import {updateBalance, updateName, updateUsername} from '../redux/reducer';
import {connect} from 'react-redux';
//routing
import {Redirect} from 'react-router-dom';

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        redirect: false
    }

    componentDidMount() {
        axios.get('/api/user').then(response => {
            if(!response.data.error) {
                this.props.updateBalance(response.data.balance);
                this.props.updateName(response.data.name);
                this.props.updateUsername(response.data.username);
                this.setState({redirect: true})
            }
        })
    }

    loginUser = () => {
        
    }

    handleUsername = e => {
        this.setState({username: e.target.value})
    }

    handlePassword = e => {
        this.setState({password: e.target.value});
    }

    handleClick = e => {
        axios.post('/auth/login', {
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            this.props.updateBalance(response.data.balance);
            this.props.updateName(response.data.name);
            this.props.updateUsername(response.data.username);
            this.setState({redirect: true})
        })
    }

    render() {
        if(this.state.redirect === true) {
            return <Redirect to='/account' />
        }
        return (
            <div>
                <input 
                placeholder='Username'
                onChange={this.handleUsername} 
                />
                <input 
                onChange={this.handlePassword}
                placeholder="Password" 
                type="password"
                />
                <button
                onClick={this.handleClick}>
                    Login
                </button>
            </div>
        )
    }
    
}

export default connect(undefined, { updateBalance, updateName, updateUsername})(Login);