import axios from 'axios'
import Qs from 'qs'
import { message } from 'antd'

const myAxiosPost = (url,data,callback) => {
    const postData = Qs.stringify(data.info)
    const wholeUrl = `http://127.0.0.1:5000${url}`
    axios({
        url: wholeUrl,
        data: postData,
        method: 'post',
        // headers: {"Access-Control-Allow-Origin": "*"},
         
    })
    .then((result)=>{
         if (result.status === 200) {
             if (result.data.err_code === 0) {
                 callback(true,result.data.data)
             } else {
                 message.error(result.data.message)
             } 
         } else {
            message.error(result.data.message)
         }
    })
    .catch(err=>{
        message.error('系统请求错误：' + url + err)
    })
}
const myAxiosGet = (url,callback) => {
    // const postData = Qs.stringify(data.info)
    const wholeUrl = `http://127.0.0.1:5000${url}`
    axios({
        url: wholeUrl,
        // data: postData,
        method: 'get',
        // headers: {"Access-Control-Allow-Origin": "*"},
         
    })
    .then((result)=>{
         if (result.status === 200) {
             if (result.data.err_code === 0) {
                 callback(true,result.data.listArr)
                //  message.success(result.data.message)
             } else {
                 message.error(result.data.message)
             } 
         } else {
            message.error(result.data.message)
         }
    })
    .catch(err=>{
        message.error('系统请求错误：' + url + err)
    })
}
// const myAxiosCopy = () => {

//     // const postData = Qs.stringify(data.info)
//     const wholeUrl = `https://cnodejs.org/api/v1/topics`
//     axios({
//         url: wholeUrl,
//         // data: postData,
//         method: 'get',
//         // headers: {"Access-Control-Allow-Origin": "*"},
         
//     })
//     .then((result)=>{
//          if (result.status === 200) {

//             let list = result.data.data

//             list.map((item)=>{
//                     myAxiosPost('/',{ 'info': item },(data)=>{
                   
//                     })
               
//             })


//             // myAxiosPost('/',{ 'info': result.data.data},(data)=>{
//             //     // console.log(data)
//             // })
//              if (result.data.err_code === 0) {
                 
//                 //  message.success(result.data.message)h
//              } else {
//                  message.error(result.data.message)
//              } 
//          } else {
//             message.error(result.data.message)
//          }
//     })
//     .catch(err=>{
//         message.error('系统请求错误：',  err)
//     })
// }
 
export  { myAxiosPost,myAxiosGet }