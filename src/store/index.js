import { createStore } from 'vuex'

export default createStore({
  state: {
        currentPathName:''
  },

  mutations: {
        setPath(state){
          state.currentPathName = localStorage.getItem("currentPathName")
        }
  },
  actions: {
  },
  modules: {
  },
  getters: {
  }
})

// import Vuex from 'vuex'

// const store = new Vuex.Store({
//   state:{
//       currentPathName:''
//   },
//   mutations: {
//       setPath(state){
//         state.currentPathName = localStorage.getItem("currentPathName")
//       }
//   }
// })
