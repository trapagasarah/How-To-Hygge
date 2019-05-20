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
      id: '',
      name: '',
      email: '',
      hyggeItems: []
    },
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

  // deleteHyggeItem = (index) => {
  //   this.setState(prevState => (
  //     {
  //       user: {
  //         ...prevState.user,
  //         hyggeItems: prevState.user.hyggeItems.filter((hyggeItem, i) => index !== i)
  //       }
  //     }
  //   )
  //   , () => axios.patch(`/users/${this.state.user._id}`, this.state.user)
  //   )
  // }

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
    user.id = Math.random()
    this.setState({ user: user })
    let createdUser = await axios.post('/users', user)
    console.log(createdUser)
  }

  signInUser = async (user) => {
    let response = await axios.post(`/users/signin`, user)
    this.setState({ user: response.data })
  }

  render() {
    const DiscoverComponent = () => (<Discover setItems={this.setItems} setCategory={this.setCategory} />)
    const DefaultCategoryViewComponent = () => (<DefaultCategoryView addItem={this.addItem} items={this.state.items} category={this.state.category} />)
    const MyHomeWishlistComponent = () => (<MyHomeWishlist addHyggeItem={this.addItem} deleteHyggeItem={this.deleteHyggeItem} hyggeItems={this.state.user.hyggeItems} />)
    const LogInComponent = () => (<LogIn createUser={this.createUser} signInUser={this.signInUser} />)
    const AdminComponent = () => (<Admin />)
    const AccountComponent = () => (<Account user= {this.state.user} />)

    return (
      <Router>
        <div>
          <Navbar parentState={this.state}/>
          <Switch>
            <Route exact path="/discover" render={DiscoverComponent} />
            <Route exact path="/myhomewishlist" render={MyHomeWishlistComponent} />
            <Route exact path="/admin" render={AdminComponent} />
            <Route path="/categories/:name" render={DefaultCategoryViewComponent} />
            <Route exact path="/login" render={LogInComponent} />
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