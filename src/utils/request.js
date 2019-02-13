import axios from 'axios'
import { Message } from 'element-ui';

const baseURL = process.env.BASE_API
const instance = axios.create({
    baseURL,
    timeout: 15000
})

const xhr = {
    get(url,data,config){
        return new Promise((resolve,reject) => {
            // const token = localStorage.getItem('token')
            // let computedConfig = {
            //     ...config
            // }
            // if(token){
            //     computedConfig = {
            //         headers: {
            //             'token':token
            //         }
            //     }
            // }
            // console.log(computedConfig)
            instance.get(url, {params: data}).then(res => {
                if(res.data.code == 403){
                    Message({
                        message: res.data.msg,
                        type: 'success'
                    })
                    this.$router.push('/')
                }
                resolve(res.data)
            }).catch(err =>{
                Message({
                    message: err.message,
                    type: 'error'
                })
                console.log(err)
                reject(err)
            })
        })
    },
    post (url,data,config) {
        return new Promise ((resolve,reject) => {
            // const token = localStorage.getItem('token')
            // let computedConfig = {
            //     ...config
            // }
            // if(token){
            //     computedConfig = {
            //         headers: {
            //             'token':token
            //         }
            //     }
            // }
            // console.log(computedConfig)
            instance.post(url,data,config).then(res =>{
                if(res.data.code == 403){
                    Message({
                        message: res.data.msg,
                        type: 'success'
                    })
                    this.$router.push('/')
                }
                resolve(res.data)
            }).catch(err =>{
                Message({
                    message: err.message,
                    type: 'error'
                })
                console.log(err)
                reject(err)
            })
        })
    },
    patch (url,data,config) {
        return new Promise ((resolve,reject) => {
            // const token = localStorage.getItem('token')
            // let computedConfig = {
            //     ...config
            // }
            // if(token){
            //     computedConfig = {
            //         headers: {
            //             'token':token
            //         }
            //     }
            // }
            // console.log(computedConfig)
            instance.patch(url,data,config).then(res =>{
                if(res.data.code == 403){
                    Message({
                        message: res.data.msg,
                        type: 'success'
                    })
                    this.$router.push('/')
                }
                resolve(res.data)
            }).catch(err =>{
                Message({
                    message: err.message,
                    type: 'error'
                })
                console.log(err)
                reject(err)
            })
        })
    },
}
export default xhr
