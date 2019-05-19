import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
            <div>
                <form onSubmit={this.onNewUserSubmit}>
                    <h2>Create Account</h2>
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
                    <button>Submit</button>
                </form>
                <form onSubmit={this.onSingInSubmit}>
                    <h2>Sign In</h2>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="text"
                        name="email"
                        onChange={this.handleExistingUserChange}
                        value={this.state.existingUser.email} />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default LogIn