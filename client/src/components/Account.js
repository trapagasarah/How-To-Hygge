import React, {Component} from 'react'
import styled from 'styled-components'

const AccountWrapper = styled.div`
    color: white;
`

class Account extends Component {
    render (){
        return (
            <AccountWrapper>
                <h3>Name: {this.props.user.name}</h3>
                <h3>Email: {this.props.user.email}</h3>
                <button onClick={this.props.deleteUser}>Delete Account</button>
            </AccountWrapper>
        )
    }
}

export default Account