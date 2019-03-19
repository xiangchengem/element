import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state={
	userName:''
}
const mutations={
	setUsername:(state,userName)=>{
		state.userName=userName
		localStorage.setItem('username',userName)
	}
}
const actions={}
const getters = {
	getUsername:(state)=>localStorage.getItem('username')
}
export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})