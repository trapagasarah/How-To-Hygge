import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { GoogleLogin } from 'react-google-login';

const LoginWrapper = styled.div`
    /* color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    font-family: 'Anonymous Pro', monospace;

    h2 {
        font-size: 3em;
    }
    label {
        font-size: 1.5em;
    }

    input {
        margin-bottom: 1em;
    }

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1em;
    }

    .create-account-form {
        margin: 4em;
        display: flex;
        flex-direction: column;
    }
    .signin-form {
        display: flex;
        flex-direction: column;
    }
    
    button {
        width: 5em;
        background-color: rgb(187, 200, 147);
        border: 1px solid white; 
    }

    button:hover {
        background-color: white;
        color: rgb(187, 200, 147);
    } */
`


class LogIn extends Component {
    state = {
        signInComplete: false
    }

    onSignInSuccess = async (response) => {
        let tokenId = response.tokenId
        await this.props.signInUser(tokenId)
        this.setState({ signInComplete: true })
    }

    onSignInFailed = (response) => {
        console.log("Failed to sign in to Google", response)
    }

    render() {
        return (
            <LoginWrapper>
                {this.state.signInComplete ? <Redirect to="/discover" />
                    : <GoogleLogin
                        clientId={process.env.REACT_APP_HOW_TO_HYGGE_GOOGLE_CLIENT_ID}
                        buttonText="Login"
                        onSuccess={this.onSignInSuccess}
                        onFailure={this.onSignInFailed}
                        cookiePolicy={'single_host_origin'}
                    />
                }
            </LoginWrapper>

        )
    }
}

export default LogIn