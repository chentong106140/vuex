import shop from '../api/shop'
import * as types from './mutation-types'

export const addToCart = ({ dispatch }, product) => {
  if (product.inventory > 0) {
    dispatch(types.ADD_TO_CART, product.id)
  }
}

export const checkout = ({ dispatch, state }, products) => {
  const savedCartItems = [...state.cart.added]
  dispatch(types.CHECKOUT_REQUEST)
  shop.buyProducts(
    products,
    () => dispatch(types.CHECKOUT_SUCCESS),
    () => dispatch(types.CHECKOUT_FAILURE, savedCartItems)
  )
}
/**
 * 该方法接收一个跟级别的store对象，并没有很直接的传递子仓库对象过来
 * 所以，还需要进一步获取需要的子仓库对象{dispact,state} = store
 * state对象又是子仓库的集合，对应关系为{cart,products} = state
 *
 * 如下方法，其实主要使用了根级别的store对象的dispach方法，
 * 该方法可以调用任何子仓库的mutations下的方法，
 * 不需要区分到底哪个子仓库的mutations
 */
export const getAllProducts = (store) => {
  console.log("getAllProducts store",store);//传递根级别store对象
  var { dispatch,state }= store;
  console.log("getAllProducts state",state);//获取跟级别store下的仓库state
  console.log(state.products.all);//通过m
  shop.getProducts(products => {
    dispatch(types.RECEIVE_PRODUCTS, products)
  })

}
