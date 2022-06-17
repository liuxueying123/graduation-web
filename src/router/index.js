import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import List from '../views/List.vue'
import Person from '../views/Person.vue'
import Discount from '../views/Discount.vue'
import Order from '../views/Order.vue'
import City from '../views/City.vue'
import CityDetail from '../views/CityDetail.vue'
import Setting from '../views/Setting.vue'
import SetPassword from '../views/SetPassword.vue'
import OrderList from '../views/OrderList.vue'
import Admin from '../views/Admin.vue'
import Place from '../views/Place.vue'
import Car from '../views/Car.vue'
import AdminOrder from '../views/AdminOrder.vue'
import AdminDiscount from '../views/AdminDiscount.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function push(location) {
  return originalReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path:'/list',
    name:'List',
    component:List
  },
  {
    path:'/Person',
    name:'Person',
    component:Person
  },
  {
    path:'/Discount',
    name:'Discount',
    component:Discount
  },
  {
    path:'/Order',
    name:'Order',
    component:Order
  },
  {
    path:'/City',
    name:'City',
    component:City
  },
  {
    path:"/CityDetail",
    name:'CityDetail',
    component:CityDetail
  },
  {
    path:"/Setting",
    name:'Setting',
    component:Setting
  },
  {
    path:'/SetPassword',
    name:'SetPassword',
    component:SetPassword
  },
  {
    path:'/OrderList',
    name:'OrderList',
    component:OrderList
  },
  {
    path:'/Admin',
    name:'Admin',
    component:Admin,
    children:[{
      path:'/Place',
      name:'Place',
      component:Place,
    },{
      path:'/Car',
      name:'Car',
      component:Car
    },{
      path:'/AdminOrder',
      name:'AdminOrder',
      component:AdminOrder
    },{
      path:'/AdminDiscount',
      name:'AdminDiscount',
      component:AdminDiscount
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
