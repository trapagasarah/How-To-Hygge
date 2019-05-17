import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
            <div>
                {
                    this.state.categories.map(category => (
                        <div key={category._id}>
                            <h2>{category.name}</h2>
                            {
                                this.props.hyggeItems.filter(item => item.category.toLowerCase() === category.name.toLowerCase()).map((hyggeItem, index) => (
                                    <div key={index}><h4>{hyggeItem.name}</h4>
                                        <button onClick={() => this.props.deleteHyggeItem(index)}>Delete</button>
                                    </div>))
                            }
                        </div>))
                }

                
                <h2>Create Item</h2>
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
        )
    }
}

export default MyHomeWishlist