import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

class Discover extends Component {
    state = {
        categories: []
    }
    componentDidMount = async () => {
        let response = await axios.get('/categories')
        this.setState({ categories: response.data })
    }
    render() {
        return (
            <div>
                <h1>How To Hygge</h1>
                <h2>Hygge Categories</h2>
                {
                    this.state.categories.map(category => {
                        return (
                            <div key={category.id}>
                                <Link to={`/${category.name}`}>
                                    {category.name}
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Discover