import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from '../Checkout/ContactData/ContactData'

class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice:0
    }

    componentWillMount() {

        const query = new URLSearchParams(this.props.location.search)
        const ingredient = {}
        let price=0
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price=param[1]
            }
            else {
                ingredient[param[0]] = parseInt(param[1])
            }
        }
        this.setState({ ingredients: ingredient,totalPrice:price })
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace(this.props.location.pathname + '/contact-data')
    }

    render() {

        return (
            <div>
                <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.state.ingredients} />
                <Route path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
            </div>
        )
    }

}

export default Checkout