import axios from '../../axios'

export default {
  namespaced: true,
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
      await axios.post('/', payload)
      context.commit('addTodo', payload)
    },
    async deleteTodo(context, payload) {
      await axios.delete('/', {
        data: payload
      })
      context.commit('deleteTodo', payload)
    },
    async markComplete(context, payload) {
      await axios.put('/', payload)
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
  },
}