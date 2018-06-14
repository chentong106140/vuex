<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <p v-show="!products.length"><i>Please add some products to cart.</i></p>
    <ul>
      <li v-for="p in products">
        {{ p.title }} - {{ p.price | currency }} x {{ p.quantity }}
      </li>
    </ul>
    <p>Total: {{ total | currency }}</p>
    <p><button :disabled="!products.length" @click="checkout(products)">Checkout</button></p>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
import { checkout } from '../vuex/actions'
import { cartProducts } from '../vuex/getters'

export default {
    //绑定该组件对应的仓库的getters与actions
  vuex: {
    getters: {
      products: cartProducts,
        //为什么使用{cart}，因为getter第一个参数就是state对象，而本应用有2个state，分别为cart与products,
        //所以这两个仓库state都会在这个第一个参数里面作为属性
        //此处{cart}其实就是等于{cart,prodocts} = state,去的只是cart这个仓库
      checkoutStatus: ({ cart }) => cart.lastCheckout
    },
    actions: {
      checkout
    }
  },
  computed: {
    total () {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity
      }, 0)
    }
  }
}
</script>
