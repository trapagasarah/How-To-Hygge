import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

class DefaultCategoryView extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.category.name}</h2>
                <p>{this.props.category.description}</p>
                <img src={this.props.category.img}/>
            </div>
        )
    }
}

export default DefaultCategoryView