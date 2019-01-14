import axios from 'axios'
import Qs from 'qs'
import { message } from 'antd'
// import "../../mock"
// import { host } from '../Host'
// const ip = ;
const wyAxiosPost = (url, data, callback) => {
    const wholeUrl = 'http://10.0.0.100:8080/NetApi/public/?r=' + url
    const udata = Object.assign({}, data, { userInfo: localStorage.userInfo })
    const postData = Qs.stringify(udata)
    axios({
        url: wholeUrl,
        data: postData,
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    }
    ).then((result) => {
        if (result.data.ret === 200)  {
            callback(result.data);
        //     if (result.data.data.status === 1) {
                
        //     } else {
        //         message.error(url + ':' + result.data.data.msg)
        //     }
        // } else {
        //     message.error('业务请求错误：' + url + result.data.msg)
        // }
        }
    }).catch(error => {
        message.error('系统请求错误：' + url + error)
    })
}

export { wyAxiosPost }
