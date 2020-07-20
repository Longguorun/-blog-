import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	defaultPage: '/blogs',
    editorData: ''
  },
  mutations: {
  	changeDefaultPage: function (state,index) {
  		state.defaultPage = index
  	},
    changeEditorData: function (state,data) {
      state.editorData = data
    }
  },
  actions: {
  },
  modules: {
  }
})
