import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const LoginWrapper = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

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
    }
`

class LogIn extends Component {
    state = {
        newUser: {
            name: '',
            email: '',
            hyggeItems: []
        },
        existingUser: {
            email: '',
        }
    }

    handleNewUserChange = (event) => {
        const field = event.target.name
        const value = event.target.value
        this.setState(prevState => ({ newUser: { ...prevState.newUser, [field]: value } }))
    }

    handleExistingUserChange = (event) => {
        const field = event.target.name
        const value = event.target.value
        this.setState({ existingUser: { [field]: value } })
    }

    onNewUserSubmit = (event) => {
        event.preventDefault()
        this.props.createUser(this.state.newUser)
    }

    onSingInSubmit = (event) => {
        event.preventDefault()
        this.props.signInUser(this.state.existingUser)
    }

    render() {
        return (
            <LoginWrapper>
                <form className="create-account-form" onSubmit={this.onNewUserSubmit}>
                    <h2>Create Account</h2>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            onChange={this.handleNewUserChange}
                            value={this.state.newUser.name}
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            name="email"
                            onChange={this.handleNewUserChange}
                            value={this.state.newUser.email} />
                        <button class="btn btn-primary" type="submit">Submit</button>
                    </div>
                </form>
                <form className="signin-form" onSubmit={this.onSingInSubmit}>
                    <h2>Sign In</h2>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            name="email"
                            onChange={this.handleExistingUserChange}
                            value={this.state.existingUser.email} />

                        <button class="btn btn-primary" type="submit">Submit</button>
                    </div>
                </form>
            </LoginWrapper>
        )
    }
}

export default LogIn