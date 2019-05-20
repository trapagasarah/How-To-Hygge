import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const AdminWrapper = styled.div`
display: flex;
color: white;
font-family: 'Anonymous Pro', monospace;
flex-direction: column;

    .category-container{
        margin-bottom: 6em;
        display: flex;
        flex-direction: column;
    }

    .category-container h2 {
        margin-right: .5em;
    }

    .category-name {
        display: flex;
        

    }

    .category-items {
        display: flex;
        flex-direction: column;
        margin: 1em;
    }


    li {
        margin-left: 2em;
        display: flex;
    }

    input {
        margin-bottom: 1em;
    }

    h2 {
        text-decoration: underline;
        color: white;
    }

    .category:hover {
        color: rgb(187, 200, 147);
    }

    h5 {
        margin-right: .5em;
    }

    label {
        font-size: 1.5em;
    }
    
    button {
        background-color: rgb(187, 200, 147);
        border: 1px solid white;
        width: 9em;
        height: 1.5em;
        margin-bottom: 1em;
        padding: 0;
    }

    button:hover {
        color: rgb(187, 200, 147);
        background-color: white;
    }

    .form-container {
        display: flex;
        justify-content: space-evenly;
        align-items: flex-start;

    }

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 20%;
    }
     img {
         width: 10em;
         margin-bottom: 1em;
     }
     
     select {
         margin-top: 1em;
     }

     .item-category {
        margin-top: 0;
        margin-bottom: 2em;
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
        categoriesResponse.data.length && this.setState({ updatedCategory: categoriesResponse.data[0] })
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
        this.setState({ updatedCategory: this.state.categories.find(category => category._id === value) })
    }

    saveCategory = async (event) => {
        event.preventDefault()
        await axios.patch(`/categories/${this.state.updatedCategory._id}`, this.state.updatedCategory)
        let categoriesResponse = await axios.get('/categories')
        console.log(categoriesResponse)
        this.setState({ categories: categoriesResponse.data })
    }

    onCategoryClick = async (categoryId, categoryName) => {
        let categoryResponse = await axios.get(`/categories/${categoryId}`)
        console.log(categoryResponse.data)
        this.props.setCategory(categoryResponse.data)
        let itemsResponse = await axios.get(`/categories/${categoryName}/items`)
        console.log(itemsResponse.data)
        this.props.setItems(itemsResponse.data)
    }

    render() {
        return (
            <AdminWrapper>
                <h1>Hygge Categories</h1>
                <div className="category-container">

                    {
                        this.state.categories.map(category => (

                            <ul className="category-items" key={category._id}>
                                <div className="category-name">
                                    <Link onClick={() => this.onCategoryClick(category._id, category.name)} to={`/categories/${category.name}`}><h2 className="category">{category.name}</h2></Link>
                                    <button className="btn btn-primary" onClick={() => this.deleteCategory(category._id)}>Delete Category</button>
                                </div>
                                {
                                    this.state.items.filter(item => item.category.toLowerCase() === category.name.toLowerCase()).map((item) => (
                                        <li key={item._id}>
                                            <h5>{item.name}</h5>
                                            <button className="btn btn-primary" onClick={() => this.deleteItem(item._id)}>Remove Item</button>
                                        </li>
                                    )
                                    )
                                }

                            </ul>

                        ))

                    }
                </div>



                <div className="form-container">
                    < form onSubmit={this.onCategorySubmit}>
                        <h2>Create Category</h2>
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

                    <form onSubmit={this.saveCategory}>
                        <h2>Update Category</h2>
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
                        <button className="btn btn-primary">Save</button>
                    </form>

                    <form onSubmit={this.onItemSubmit}>
                        <h2>Create Item</h2>
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
                        <select className="item-category" id="category" name="category" onChange={this.handleItemChange}>
                            {this.state.categories.map(category => (
                                <option key={category._id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                        <button className="btn btn-primary">Submit Item</button>
                    </form>



                    
                </div>
            </AdminWrapper >
        )
    }
}

export default Admin