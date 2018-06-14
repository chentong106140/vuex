import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import store from './vuex/store'
import { currency } from './currency'

Vue.filter('currency', currency)

var vm = new Vue({
  el: '#app',
  store,
  render: h => h(App)
});

//测试获取跟级别的store
console.log("测试获取跟级别的store---",vm.$store);
//测试调用分别在2个子仓库都定义了同一个方法名的mutations方法
vm.$store.dispatch("testMutations",1000);//这里只调用一次dispatch,但，会分别执行2个子仓库下的该方法

//执行结果如下：
//Object { added: Getter & Setter, lastCheckout: Getter & Setter, … }1000
//Object { all: Getter & Setter, … }1000