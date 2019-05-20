import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import LogIn from './components/LogIn'
import Discover from './components/Discover'
import DefaultCategoryView from './components/DefaultCategoryView'
import MyHomeWishlist from './components/MyHomeWishlist';
import Admin from './components/Admin'
import Navbar from './components/Navbar'
import Account from './components/Account'
import About from './components/About'

class App extends Component {
  state = {
    user: {
      "hyggeItems": [
          {
              "_id": "5cdddf7dfac1df540f8a5ee9",
              "name": "Scarf",
              "description": "light",
              "category": "Clothing",
              "image": "",
              "__v": 0
          },
          {
              "_id": "5cdddf7dfac1df540f8a5ee9",
              "name": "Scarf",
              "description": "light",
              "category": "Clothing",
              "image": "",
              "__v": 0
          },
          {
              "name": "Test",
              "description": "test",
              "category": "Home",
              "image": "",
              "_id": 486245079
          },
          {
              "name": "Butterfly Garden",
              "description": "",
              "category": "Light",
              "image": "",
              "_id": 283621388
          }
      ],
      "_id": "5cdb4871bdeda75d8135501f",
      "name": "Michael",
      "email": "michaelmail@example.com",
      "__v": 0
  },
    // user: {
    //   id: '',
    //   name: '',
    //   email: '',
    //   hyggeItems: []
    // },
    category: {
      name: '',
      description: ''
    },
    items: []
  }

  setUser = (user) => {
    console.log(user)
    this.setState({ user: user })
  }

  setCategory = (category) => {
    this.setState({ category: category })
  }

  setItems = (items) => {
    this.setState({ items: items })
  }

  addItem = (item) => {
    this.setState(prevState => (
      {
        user: {
          ...prevState.user,
          hyggeItems: [...prevState.user.hyggeItems, item]
        }
      }
    )
      , () => {
        axios.patch(`/users/${this.state.user._id}`, this.state.user)
      }
    )

    console.log(this.state.user)
  }

  deleteHyggeItem = (itemId) => {
    console.log(this.state.user.hyggeItems)
    const foundIndex = this.state.user.hyggeItems.findIndex(item => item._id == itemId)
    this.setState(prevState => (
      {
        user: {
          ...prevState.user,
          hyggeItems: prevState.user.hyggeItems.filter((hyggeItem, i) => foundIndex !== i)
        }
      }
    )
      , () => axios.patch(`/users/${this.state.user._id}`, this.state.user)
    )
  }

  createUser = async (user) => {
    this.setState({ user: null })
    user.id = Math.random() 
    let response = await axios.post('/users', user)
    console.log(response)
    this.setState({ user: response.data })
  }

  signInUser = async (user) => {
    this.setState({ user: null })
    let response = await axios.post(`/users/signin`, user)
    this.setState({ user: response.data })
  }

  deleteUser = async () => {
    await axios.delete(`/users/${this.state.user._id}`)
    this.setState({ user: undefined })
  }

  render() {
    const DiscoverComponent = () => (<Discover setItems={this.setItems} setCategory={this.setCategory} />)
    const DefaultCategoryViewComponent = () => (<DefaultCategoryView addItem={this.addItem} items={this.state.items} category={this.state.category} />)
    const MyHomeWishlistComponent = () => (<MyHomeWishlist addHyggeItem={this.addItem} deleteHyggeItem={this.deleteHyggeItem} hyggeItems={this.state.user.hyggeItems} />)
    const LogInComponent = () => (<LogIn createUser={this.createUser} signInUser={this.signInUser} />)
    const AdminComponent = () => (<Admin />)
    const AccountComponent = () => (<Account user={this.state.user} deleteUser={this.deleteUser} />)

    return (    
      <Router>
        <div>
          <Navbar parentState={this.state} />
          <Switch>
            <Route exact path="/login" render={LogInComponent} />
            {this.state.user === undefined && <Redirect to="/login" />}
            <Route exact path="/discover" render={DiscoverComponent} />
            <Route exact path="/myhomewishlist" render={MyHomeWishlistComponent} />
            <Route exact path="/admin" render={AdminComponent} />
            <Route path="/categories/:name" render={DefaultCategoryViewComponent} />

            <Route exact path="/account" render={AccountComponent} />
            <Route exact path="/about" component={About} />
            <Route path="/*" render={() => <Redirect to="/discover" />} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App