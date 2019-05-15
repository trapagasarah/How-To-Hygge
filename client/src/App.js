import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import LogIn from './components/LogIn'
import Discover from './components/Discover'
import Light from './components/Light'
import Home from './components/Home'

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
  render() {
    const DiscoverComponent = () => (<Discover user = {this.state.user} />)
    const LightComponent = () => (<Light category = {this.state.category}/>)
    const HomeComponent = () => (<Home  category = {this.state.category} />)
    return (
      <Router>
        <div>
          <Switch>
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/discover" render={DiscoverComponent} />
              <Route exact path="/light" render={LightComponent} />
              <Route exact path="/home" render={HomeComponent} />
              <Route path="/*" render={() => <Redirect to="/discover" />} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App