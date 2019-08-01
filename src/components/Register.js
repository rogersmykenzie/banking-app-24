import React from 'react';

class Register extends React.Component {
    handleChange = e => {
        console.log(e.target.name);
    }
    render() {
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
            </div>
        )
    }
}

export default Register;