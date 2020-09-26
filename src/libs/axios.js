import axios from 'axios';

import Vue from 'vue';

// 创建实例时设置配置的默认值
let instance = axios.create({
    baseURL: process.env.baseHost,
});

var CancelToken = axios.CancelToken;
const pending = {}; // 等待的请求
Vue.prototype.$cancelList = [];

// 移除等待
const removePending = (key, isRequest = false) => {
    if (pending[key] && isRequest) {
        pending[key]('取消重复请求')
    }
    delete pending[key];
}

// 请求标识
const getRequestIdentify = (config) => {
    return config.url;
}


// 请求拦截
instance.interceptors.request.use((config) => {
    if (!!sessionStorage.getItem('token')) {
        config.headers['BhtToken'] = sessionStorage.getItem('token');
    }
    let requestData = getRequestIdentify(config)
    removePending(requestData, true)
    config.cancelToken = new CancelToken((c) => {
        pending[requestData] = c;
        Vue.prototype.$cancelList.push(c);
    })
    return config;
}), (error) => {
    return Promise.reject(error)
};
// 响应拦截
instance.interceptors.response.use((response) => {
    let requestData = getRequestIdentify(response.config);
    removePending(requestData);
    return response;
}, (error) => {
    return Promise.reject(error);
});


export default (url, data = {}, method = 'get', headers) => {
    let requestData = {},
        config = {};
    method = method.toLowerCase();
    (method === 'get') ? requestData = { params: { ...data } } || {} : requestData = data;
    if (headers) {
        config.headers = { ...headers };
    }
    return new Promise((reslove, reject) => {
        instance[method](url, requestData, config).then(res => {
            if (res.data.err_code === 200) {

                reslove(res.data.data);
            } else if (res.data.err_code === -2) {
                console.log('忽略失败');
            } else {
                return Promise.reject(res.data);
            }
        }).catch(error => {
            if (axios.isCancel(error)) {
                // console.log('已经中断请求');
            } else {
                let tips = !!error && error.err_msg ? error.err_msg : '连接服务器失败';
                Vue.prototype.$loading.hide();
                Vue.prototype.$toast.fail(tips);
            }
        })
    });

};
