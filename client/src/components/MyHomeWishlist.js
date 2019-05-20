import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const MyHyggeWishlistWrapper = styled.div`
display: flex;
color: white;
font-family: 'Anonymous Pro', monospace;

flex-direction: column;



    .my-hygge-items {
        display: flex;
        flex-direction: column;
        margin: 4em;
        
        justify-content: center;
    }

    li {
        margin: 1em;
        display: flex;
        flex-direction: column;
    }

    .delete-button {
        width: 5em;
        height: 1.5em;
        padding: 0;
        margin-bottom: .5em;

    }

    h3 {
        text-align: center;
        color: white;
        text-decoration: underline;
    }
    .my-hygge-form div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    input {
        margin-bottom: 1em;
    }

    label {
        font-size: 1.5em;
    }
    
    button {
        background-color: rgb(187, 200, 147);
        border: 1px solid white;
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
        this.props.addHyggeItem({ ...this.state.newHyggeItem, _id: Math.floor(Math.random() * 1000000000) })
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
                                        <li className="myHyggeItems" key={index}><h4>{hyggeItem.name}: {hyggeItem.description}</h4>
                                            <button className="btn btn-primary delete-button" type="submit" onClick={() => this.props.deleteHyggeItem(hyggeItem._id)}>Delete</button>
                                        </li>))
                                }
                            </ul>))
                    }
                </div>



                <div className="my-hygge-form">
                    <form onSubmit={this.addHyggeItem}>

                        <div>
                        <h3>Create Item</h3>
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
                            <button id="form-button" className="btn btn-primary">Submit Item</button>

                        </div>


                    </form>
                </div>
            </MyHyggeWishlistWrapper>
        )
    }
}

export default MyHomeWishlist