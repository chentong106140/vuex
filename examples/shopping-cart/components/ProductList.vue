<template>
    <ul>
        <li v-for="p in products">
            {{ p.title }} - {{ p.price | currency }}
            <br>
            <button
                    :disabled="!p.inventory"
                    @click="addToCart(p)">
                Add to cart
            </button>
        </li>
    </ul>
</template>

<script>
    import {getAllProducts, addToCart} from '../vuex/actions'

    /**
     * 为当前组件添加getters与actions对象
     * 这两个对象与store内的不一样
     */
    export default {
        vuex: {
            getters: {
                products(state) {
                    return state.products.all;
                },
                testGetters(state) {
                    console.log("productList getters testGetters", state);
                    return [1, 2, ...[3, 4, 5]];
                }
            },
            /**
             * 为当前组件添加actions
             *
             * 这些actions方法会默认给当前组件添加methods，可以通过this.自定义的actions方法执行
             * 与store中定义的action不一样，如果需要执行store中的actions方法，需要使用this.$store.dispatch("actions名称")
             * 而此处只要在当前组件内使用，this.actions方法名称就能执行，同时传递根级别的store对象
             */
            actions: {
                /**
                 * 这些方法被执行的时候，会默认传递根级别的store对象为参数进去
                 */
                getAllProducts,
                addToCart,
                testAction: function (store) {
                    console.log("productList actions testAction", store, store.state);//跟级别的store对象
                }
            }
        },
        created() {
            //执行当前组件的action方法，会默认传递跟级别的store对象为参数进入
            this.getAllProducts();
            //测试执行调用当前组件的actions方法
            this.testAction();
            //测试获取当前组件的getters对象
            console.log(this.testGetters);

            //测试组件内获取跟级别的store对象，在获取对象内其他的store子模块
            var {products: {state: p1}} = this.$store._modules;
            console.log("productList.vue created---products", p1.all, this.$store._modules);//[],{cart,products}
            //获取方式同上
            var {products: p2} = this.$store.state;
            console.log("productList.vue created---products", p2.all, this.$store.state);//[],{cart,products}
        }
    }
</script>
