import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  // addCartItem = product => {
  //   //this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
  //   //   TODO: Update the code here to implement addCartItem
  //   const {cartList} = this.state
  //   const {id} = product
  //   const productMatch = cartList.find(eachItem => eachItem.id === id)
  //   if (productMatch !== undefined) {
  //     const dataList = cartList.map(eachItem => {
  //       if (eachItem.id === id) {
  //         return {...eachItem, quantity: eachItem.quantity + 1}
  //       }
  //       return eachItem
  //     })
  //     this.setState({cartList: dataList})
  //   } else {
  //     this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
  //   }
  // }

  addCartItem = product => {
    const {cartList} = this.state

    const {id, quantity} = product

    const productMatch = cartList.find(eachItem => eachItem.id === id)

    if (productMatch) {
      const updatedCartList = cartList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, quantity: eachItem.quantity + quantity}
        }

        return eachItem
      })

      this.setState({cartList: updatedCartList})
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  //   addCartItem = product => {
  //   this.setState(prevState => {
  //     const {cartList} = prevState
  //     const existingProduct = cartList.find(item => item.id === product.id)
  //     if (existingProduct) {
  //        {cartList: cartList.map(item =>item.id === product.id? {...item, quantity: item.quantity + product.quantity}: item)}
  //     }
  //    {cartList: [...cartList, {...product, quantity: product.quantity}]}})
  // }

  removeCartItem = id => {
    const {cartList} = this.state
    const filterCartList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: filterCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const cartListData = cartList.map(eachItem => {
      if (eachItem.id === id) {
        return {
          ...eachItem,
          quantity: eachItem.quantity + 1,
        }
      }
      return eachItem
    })
    this.setState({cartList: cartListData})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    let cartListDre = []
    cartListDre = cartList.map(eachItem => {
      if (eachItem.id === id) {
        const data = {...eachItem, quantity: eachItem.quantity - 1}
        return data
      }
      return eachItem
    })
    const filterDataList = cartListDre.filter(eachItem => eachItem.quantity > 0)
    this.setState({cartList: filterDataList})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
