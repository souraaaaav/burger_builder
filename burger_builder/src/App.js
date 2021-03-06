import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncAuth=asyncComponent(()=>{
  return import('./containers/Auth/Auth')
})

const asyncContactData=asyncComponent(()=>{
  return import('./containers/Checkout/ContactData/ContactData')
})

const asyncCheckout=asyncComponent(()=>{
  return import('./containers/Checkout/Checkout')
})

const asyncOrders=asyncComponent(()=>{
  return import('./containers/Orders/Orders')
})

class App extends Component {

  componentDidMount() {
    this.props.onContiniousSignIn()
  }

  render() {

    let Routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      Routes = (
        <Switch>
          <Route path="/checkout/contact-data" component={asyncContactData} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>

      )
    }

    return (
      <div className="App">
        <Layout>
          {Routes}
        </Layout >
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onContiniousSignIn: () => dispatch(actions.checkAuthState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
