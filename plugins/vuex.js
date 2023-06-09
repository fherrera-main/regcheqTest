import Vue from 'vue'
import Vuex from 'vuex'
import store from '~/store'

Vue.use(Vuex)

export default () => {
  return new Vuex.Store(store)
}