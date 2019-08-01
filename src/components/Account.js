import React from 'react';
//redux
import {connect} from 'react-redux';
//routing
import {Redirect} from 'react-router-dom';

function Account(props) {

    if(props.name === "") {
        return <Redirect to='/' />
    }

    return (
        <div>
            <h1>Welcome {props.name}</h1>
            <h1>You balance is: {props.balance}</h1>
        </div>
    )
}

function mapStateToProps(reduxState) {
    return {
        balance: reduxState.balance,
        name: reduxState.name
    }
}

export default connect(mapStateToProps)(Account);