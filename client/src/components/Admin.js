import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Admin extends Component {
    state = {
        categories: [],
        items: [],
        newCategory: {
            name: '',
            description: '',
            image: ''
        },
        newItem: {
            name: '',
            description: '',
            category: '',
            image: ''
        }
    }

    componentDidMount = async () => {
        let categoriesResponse = await axios('/categories')
        this.setState({ categories: categoriesResponse.data })
        let itemsResponse = await axios('/items')
        this.setState({ items: itemsResponse.data })
    }

    handleCategoryChange = async (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState(prevState => ({
            newCategory: {
                ...prevState.newCategory,
                [name]: value
            }
        }))
    }


    onCategorySubmit = async (event) => {
        event.preventDefault()
        await axios.post('/categories', this.state.newCategory)
        let categoriesResponse = await axios.get('/categories')
        console.log(categoriesResponse)
        this.setState({ categories: categoriesResponse.data })
    }

    deleteCategory = async (categoryId) => {
        await axios.delete(`/categories/${categoryId}`)
        let categoriesResponse = await axios.get('/categories')
        this.setState({ categories: categoriesResponse.data })
    }


    handleItemChange = async (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState(prevState => ({
            newItem: {
                ...prevState.newItem,
                [name]: value
            }
        }))
    }

    onItemSubmit = async (event) => {
        event.preventDefault()
        await axios.post('/items', this.state.newItem)
        let itemsResponse = await axios.get('/items')
        console.log(itemsResponse)
        this.setState({ items: itemsResponse.data })
    }

    deleteItem = async (itemId) => {
        await axios.delete(`/items/${itemId}`)
        let itemsResponse = await axios.get('/items')
        this.setState({ items: itemsResponse.data })
    }


    render() {
        return (
            <div>
                {
                    this.state.categories.map(category => (
                        <div key={category._id}>
                            <h3>{category.name}</h3>
                            <button onClick={() => this.deleteCategory(category._id)}>Delete Category</button>
                            {
                                this.state.items.filter(item => item.category.toLowerCase() === category.name.toLowerCase()).map((item) => (
                                    <div key={item._id}>
                                        <h5>{item.name}</h5>
                                        <button onClick={() => this.deleteItem(item._id)}>Remove Item</button>
                                    </div>
                                )
                                )
                            }

                        </div>

                    ))
                }
                <h2>Create Category</h2>
                < form onSubmit={this.onCategorySubmit}>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        onChange={this.handleCategoryChange}
                        value={this.state.newCategory.name}
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        type="text"
                        name="description"
                        onChange={this.handleCategoryChange}
                        value={this.state.newCategory.description}
                    />
                    <label htmlFor="image">Image</label>
                    <input
                        id="image"
                        type="text"
                        name="image"
                        onChange={this.handleCategoryChange}
                        value={this.state.newCategory.image}
                    />
                    <button>Submit Category</button>

                </form>
                
                <h2>Create Item</h2>
                <form onSubmit={this.onItemSubmit}>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        onChange={this.handleItemChange}
                        value={this.state.newItem.name} />
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        type="text"
                        name="description"
                        onChange={this.handleItemChange}
                        value={this.state.newItem.description}
                    />
                    <label htmlFor="category">Category</label>
                    <input
                        id="category"
                        type="text"
                        name="category"
                        onChange={this.handleItemChange}
                        value={this.state.newItem.category}
                    />
                    <label htmlFor="image">Image</label>
                    <input
                        id="image"
                        type="text"
                        name="image"
                        onChange={this.handleItemChange}
                        value={this.state.newItem.image} />
                    <button>Submit Item</button>

                </form>
                {/* //Add category form (button on click save category


                //View all  items + delete buttoon
                //Add item form */}


            </div>
        )
    }
}

export default Admin