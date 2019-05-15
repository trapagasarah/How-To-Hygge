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

    handleChange = async (categoryId, categoryName) => {
        let categoryResponse = await axios.get(`/categories/${categoryId}`)
        console.log(categoryResponse.data)
        this.props.setCategory(categoryResponse.data)
        let itemsResponse = await axios.get(`/categories/${categoryName}/items`)
        console.log(itemsResponse.data)
        this.props.setItems(itemsResponse.data)
    }

    render() {
        return (
            <div>
                <h1>How To Hygge</h1>
                <h2>Hygge Categories</h2>
                {
                    this.state.categories.map(category => {
                        return (
                            <div key={category._id}>
                                <Link onClick={() => this.handleChange(category._id, category.name)} to={`/categories/${category.name.replace(/\s+/g, '').toLowerCase()}`}>
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