import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const AdminWrapper = styled.div`
    color: white;
    font-family: 'Anonymous Pro', monospace;

    .category-items {
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

    input {
        margin-bottom: 1em;
    }

    label {
        font-size: 1.5em;
    }
    
    button {
        background-color: rgb(187, 200, 147);
        border: 1px solid white;
        width: 8em;
    }

    
`

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
        },
        updatedCategory: {
            name: '',
            description: '',
            category: '',
            image: ''
        }
    }

    componentDidMount = async () => {
        let categoriesResponse = await axios('/categories')
        this.setState({ categories: categoriesResponse.data })
        categoriesResponse.data.length && this.setState({ updatedCategory: categoriesResponse.data[0]})
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

    handleEditChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState(prevState => ({
            updatedCategory: {
                ...prevState.updatedCategory,
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

    onUpdatedItemSelected = (event) => {
        let value = event.target.value  
        console.log(value)
        this.setState({updatedCategory: this.state.categories.find(category => category._id === value)})
    }

    saveCategory = async (event) => {
        event.preventDefault()
        await axios.patch(`/categories/${this.state.updatedCategory._id}`, this.state.updatedCategory)
        let categoriesResponse = await axios.get('/categories')
        console.log(categoriesResponse)
        this.setState({ categories: categoriesResponse.data })
    }


    render() {
        return (
            <AdminWrapper>
                {
                    this.state.categories.map(category => (
                        <ul className="category-items" key={category._id}>
                            <h3>{category.name}</h3>
                            <button onClick={() => this.deleteCategory(category._id)}>Delete Category</button>
                            {
                                this.state.items.filter(item => item.category.toLowerCase() === category.name.toLowerCase()).map((item) => (
                                    <li key={item._id}>
                                        <h5>{item.name}</h5>
                                        <button onClick={() => this.deleteItem(item._id)}>Remove Item</button>
                                    </li>
                                )
                                )
                            }

                        </ul>

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
                    <img src={this.state.newCategory.image} />

                    <button className="btn btn-primary">Submit Category</button>

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
                    <button className="btn btn-primary">Submit Item</button>
                </form>


                <h2>Update Item</h2>
                <form onSubmit={this.saveCategory}>
                    <select name="_id" onChange={this.onUpdatedItemSelected}>
                        {this.state.categories.map(category => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                    <label htmlFor="editName">Name</label>
                    <input id="editName"
                        type="text"
                        name="name"
                        value={this.state.updatedCategory.name}
                        onChange={this.handleEditChange} />

                    <label htmlFor="editDescription">Description</label>
                    <textarea id="editDescription"
                        name="description"
                        onChange={this.handleEditChange}
                        value={this.state.updatedCategory.description} />

                    <label htmlFor="editImage">Image</label>
                    <input id="editImage"
                        type="text"
                        name="image"
                        onChange={this.handleEditChange}
                        value={this.state.updatedCategory.image} />
                    <img src={this.state.updatedCategory.image} />
                    <button>Save</button>
                </form>
            </AdminWrapper>
        )
    }
}

export default Admin