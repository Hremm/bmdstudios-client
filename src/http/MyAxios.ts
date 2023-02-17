import axios from 'axios'
const instance = axios.create()  // 创建axios实例
import qs from 'qs'
import { showLoadingToast, } from 'vant'
import 'vant/es/toast/style'
import { closeToast } from 'vant/lib/toast'

interface Response {
    code: number;
    msg: string;
    data?: any;
}
//拦截请求
instance.interceptors.request.use(config => {
    showLoadingToast({
        message: '加载中...',
        duration: 300,
        forbidClick: true
    })
    return config;
})
//拦截响应
instance.interceptors.response.use(resp => {
    closeToast()
    return resp
})


const myaxios = {
    /** 用于发送get请求 
     *  url: 请求资源路径  
     *  params: 请求参数（Object形式）
     */
    get(url: string, params?: object): Promise<Response> {
        return instance({
            url,
            method: 'get',
            params
        })
    },

    /**
     * 用于发送post请求
     * @param {String} url   请求资源路径
     * @param {Object} params   请求参数（对象类型）
     * @returns Promise<Response>
     */
    post(url: string, params?: object): Promise<Response> {
        return instance({
            url,
            method: 'post',
            data: qs.stringify(params)
        })
    }
}

export default myaxios