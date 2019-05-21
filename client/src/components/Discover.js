import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const DiscoverWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2em 0;
    font-family: 'Anonymous Pro', monospace;
    color: white;
    height: 100%;

    

    h1 {
        font-size: 4em;
    }

    h3 {
        font-size: 2.5em;
        text-decoration: underline;
    }

    .category-name {
        color: white;
        font-size: 2em;
    }

    .category-name:hover {
        color: rgb(187, 200, 147);
    }

`

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
            <DiscoverWrapper className="discover">
                <h1 className="discover-title">How To Hygge</h1>
                <h3>Hygge Categories</h3>
                {
                    this.state.categories.map(category => {
                        return (
                            <div key={category._id}>
                                <Link className="category-name" onClick={() => this.handleChange(category._id, category.name)} to={`/categories/${category.name.replace(/\s+/g, '').toLowerCase()}`}>
                                    {category.name}
                                </Link>
                            </div>
                        )
                    })
                }
            </DiscoverWrapper>
        )
    }
}

export default Discover