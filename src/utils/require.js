import axios from 'axios'
import {Message} from 'element-ui'
import store from '@/store'
// import {getToken} from '@/utils/auth'

const service=axios.create({
    baseURL: 'http://127.0.0.1:8088', // url = base url + request url
    timeout:5000   
})

// 如果有token 请求头就携带token
service.interceptors.request.use(
    config=>{
        if(store.getters.token){
            config.headers['X-Token']=getToken()
        }
        return config
    },error=>{
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response=>{
        const res=response.data
        if(res.code!==200){
            Message({
                message:res.message||'Error',
                type:'error',
                duration:5*1000
            })
            return Promise.reject(res.message||'error')
        }else{
            return res
        }
    },error=>{
        Message({
            message:error.message,
            type:'error',
            duration:5*1000
        })
        return Promise.reject(error)
    }
)


export default service