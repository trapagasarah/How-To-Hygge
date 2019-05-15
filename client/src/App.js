import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import LogIn from './components/LogIn'
import Discover from './components/Discover'
import Light from './components/Light'
import Home from './components/Home'
import Clothing from './components/Clothing'
import FoodAndDrink from './components/FoodAndDrink'
import Togetherness from './components/Togetherness'
import DefaultCategoryView from './components/DefaultCategoryView'

class App extends Component {
  state = {
    user: {
      id: 'fakeId',
      name: 'Michale',
      email: 'michaelmail@example.com',
      hyggeItems: []
    },
    category: {
      name: 'Light',
      description: 'orb of fire'
    }
  }
  setUser = (user) => {
    this.setState({user: user})
  }

  setCategory = (category) => {
    this.setState({category: category})
  }

  render() {
    const DiscoverComponent = () => (<Discover setCategory={this.setCategory}  />)
    const LightComponent = () => (<Light category = {this.state.category}/>)
    const HomeComponent = () => (<Home  category = {this.state.category} />)
    const ClothingComponent = () => (<Clothing category = {this.state.category} />)
    const FoodAndDrinkComponent = () => (<FoodAndDrink category = {this.state.category} />)
    const TogethernessComponent = () => (<Togetherness category = {this.state.category} />)
    const DefaultCategoryViewComponent = () => (<DefaultCategoryView  category= {this.state.category} />)

    return (
      <Router>
        <div>
          <Switch>
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/discover" render={DiscoverComponent} />
              {/* <Route exact path="/categories/light" render={LightComponent} />
              <Route exact path="/categories/home" render={HomeComponent} />
              <Route exact path="/categories/clothing" render={ClothingComponent} />
              <Route exact path="/categories/foodanddrink" render={FoodAndDrinkComponent} />
              <Route exact path="/categories/togetherness" render={TogethernessComponent} /> */}
              <Route path="/categories/:name" render={DefaultCategoryViewComponent} />
              <Route path="/*" render={() => <Redirect to="/discover" />} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App