import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const MyHyggeWishlistWrapper = styled.div`
display: flex;

font-family: 'Anonymous Pro', monospace;

flex-direction: column;

flex-wrap: wrap;
    .my-hygge-items {
        margin: 4em;
    }

    li {
        margin: 1em;
        display: flex;
    }
    h2 {
        color: white;
    }
    h3 {
        text-align: center;
        color: white;
    }
    .my-hygge-form {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
`


class MyHomeWishlist extends Component {
    state = {
        categories: [],
        newHyggeItem: {
            name: '',
            description: '',
            category: '',
            image: ''
        }

    }

    componentDidMount = async () => {
        let categoriesResponse = await axios('/categories')
        this.setState({ categories: categoriesResponse.data })
    }
    handleHyggeItemChange = async (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState(prevState => ({
            newHyggeItem: {
                ...prevState.newHyggeItem,
                [name]: value
            }
        }))
    }
    addHyggeItem = async (event) => {
        event.preventDefault()
        console.log(this.state.hyggeItem)
        this.props.addHyggeItem(this.state.newHyggeItem)
    }

    render() {
        return (
            <MyHyggeWishlistWrapper className="my-hygge-wishlist">
                <div className="my-hygge-items">
                    {
                        this.state.categories.map(category => (
                            <ul className="my-hygge-categories" key={category._id}>
                                <h2 className="my-category-name">{category.name}</h2>
                                {
                                    this.props.hyggeItems.filter(item => item.category.toLowerCase() === category.name.toLowerCase()).map((hyggeItem, index) => (
                                        <li className="myHyggeItems" key={index}><h4>{hyggeItem.name}</h4>
                                            <button onClick={() => this.props.deleteHyggeItem(index)}>Delete</button>
                                        </li>))
                                }
                            </ul>))
                    }
                </div>



                <h3>Create Item</h3>
                <div className="my-hygge-form">
                    <form onSubmit={this.addHyggeItem}>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            onChange={this.handleHyggeItemChange}
                            value={this.state.newHyggeItem.name} />
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            type="text"
                            name="description"
                            onChange={this.handleHyggeItemChange}
                            value={this.state.newHyggeItem.description}
                        />
                        <label htmlFor="category">Category</label>
                        <input
                            id="category"
                            type="text"
                            name="category"
                            onChange={this.handleHyggeItemChange}
                            value={this.state.newHyggeItem.category}
                        />
                        <label htmlFor="image">Image</label>
                        <input
                            id="image"
                            type="text"
                            name="image"
                            onChange={this.handleHyggeItemChange}
                            value={this.state.newHyggeItem.image} />
                        <button>Submit Item</button>

                    </form>
                </div>
            </MyHyggeWishlistWrapper>
        )
    }
}

export default MyHomeWishlist