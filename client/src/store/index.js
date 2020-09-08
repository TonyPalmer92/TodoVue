import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'

Vue.use(Vuex)


export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    todos: [],
  },


  getters: {
    remainingTodos(state) {
      return state.todos.filter((todo) => !todo.isComplete).length
    },
  },


  actions: {
    async getTodos(context) {
      const result = await axios.get('/')

      context.commit('getTodos', result.data)
    },
    async addTodo(context, payload) {
      const result = await axios.post('/', payload)
      context.commit('addTodo', result.data)
    },
    async deleteTodo(context, payload) {
      const result = await axios.delete('/', {
        data: payload
      })
      console.log(result.data) // msg: 'Todo deleted'
      context.commit('deleteTodo', payload)
    },
    async markComplete(context, payload) {
      const result = await axios.put('/', payload)
      console.log(result.data)
      context.commit('markComplete', payload)
    },
  },


  mutations: {
    getTodos(state, payload) {
      state.todos = payload
    },
    deleteTodo(state, payload) {
      const index = state.todos.findIndex((todo) => todo._id === payload._id);
      state.todos.splice(index, 1);
    },
    addTodo(state, payload) {
      state.todos.unshift(payload)
    },
    markComplete(state, payload) {
      const index = state.todos.findIndex(todo => todo._id === payload._id)
      if (index !== -1) {
        state.todos.splice(index, 1, payload)
      }
    },

  }
})