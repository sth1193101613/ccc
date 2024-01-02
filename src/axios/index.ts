import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios'

const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 1000 * 30,
  withCredentials: true
})

const incloudUrl = ['login']

service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const url = config.url.split('/')[1]
  if (config.method === 'get' && !incloudUrl.includes(url) && localStorage.getItem('USER_TOKEN')) {
    config.params['cookie'] = encodeURIComponent(localStorage.getItem('USER_TOKEN'))
  }
  return config
}, (error: AxiosError) => {
  return Promise.reject(error)
})

service.interceptors.response.use((response: AxiosResponse) => {
  if (response.status === 200) {
    return Promise.resolve(response)
  }
},
  (error: AxiosError) => {
    if (error && error.response) {
      return Promise.reject(error.message)
    }
  }
)
const createRequest = <T, S>(method: string, url: string, params: T): Promise<S> => {
  method = method.toLocaleLowerCase()
  const request = {
    method,
    url,
    params: method === 'get' || method === 'delete' ? params : null,
    data: method === 'post' || method === 'put' ? params : null,
  }
  return new Promise((resolve, reject) => {
    service(request).then((res) => {
      if (res.status === 200) {
        resolve(res.data as Promise<S>)
      }
    }).catch((e: AxiosError) => {
      reject(e)
    })
  })
}
export default createRequest