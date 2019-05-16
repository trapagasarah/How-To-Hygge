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
        this.setState({ categories: categoriesResponse.data })
    }

    render() {
        return (
            <div>
                {
                    this.state.categories.map(category => (
                        <div>
                            {category.name}
                        </div>
                    ))
                }
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
                {/* //Add category form (button on click save category


                //View all  items + delete buttoon
                //Add item form */}


            </div>
        )
    }
}

export default Admin