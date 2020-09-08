import axios from 'axios'
let isDev = process.env.NODE_ENV !== 'production' ? true : false

export default axios.create({
  baseURL: isDev ?
    'http://localhost:5050/api/v1/todos' : '/api/v1/todos'
})