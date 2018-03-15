import axios from 'axios'
export const host = 'http://101.200.52.233:8080/doc'
axios.defaults.headers.post['X-CSRF-TOKEN'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')
axios.defaults.withCredentials = true
//注册用户
export const postRegister = params => { return axios.post(host + '/api/v1.0/operators', params) }
