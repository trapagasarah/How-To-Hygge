import React, { Component } from 'react'
import styled from 'styled-components'
import { GoogleLogout } from 'react-google-login';

const AccountWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2em 0;
    font-family: 'Anonymous Pro', monospace;
    color: white;
    margin-top: 3em;

    button {
        background-color: rgb(187, 200, 147);
        border: 1px solid white;
        width: 9em;
        height: 1.5em;
        margin-bottom: 1em;
        padding: 0;
    }

    button:hover {
        color: rgb(187, 200, 147);
        background-color: white;
    }
`

class Account extends Component {

    onGoogleSignOut = () => {
        this.props.signOutUser()
    }

    render() {
        return (
            <AccountWrapper>
                <h3>Name: {this.props.user.name}</h3>
                <h3>Email: {this.props.user.email}</h3>
                <button className="btn btn-primary" onClick={this.props.deleteUser}>Delete Account</button>

                <GoogleLogout
                    clientId={process.env.REACT_APP_HOW_TO_HYGGE_GOOGLE_CLIENT_ID}
                    buttonText="Logout"
                    onLogoutSuccess={this.onGoogleSignOut}
                >
                </GoogleLogout>
            </AccountWrapper>
        )
    }
}

export default Account