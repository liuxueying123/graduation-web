import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    choosePro:'',//选择的省份
    chooseCity:'',//选择的城市
    choosePlace:'',//选择的地点
    returnPlace:'',//归还地点
    startMonth:'', //开始月份
    startDate:'',//开始日期
    startDay:'', // 开始周
    startTime:'',//开始时间
    endMonth:'', //结束月份
    endDate:'',//结束日期
    endDay:'', // 结束周
    endTime:'',//结束时间
    rangeTime:0,//间隔时间
    carInfo:{}, //车辆信息
    getCarAddress:{}, //取车地点信息
    userId:'',
    carId:'',
  },
  mutations: {
    setState(state, payload) {
      for (let key in payload) {
        if (!state.hasOwnProperty(key)) {
          console.warn(new Error(`state中不存在${key}这个键,请检查代码!`));
        }
        if (payload[key] != 7) {
          state[key] = payload[key];
        }
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
