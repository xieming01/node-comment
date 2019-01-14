import { Started,Success,Failure } from './actionType'
import { myAxiosGet } from '../components/axios/index'
export const getListStarted = () => ({
    type: Started,
    loading: true,
})
export const getListSuccess = (result) => ({
    type: Success,
    loading: false,
    'result': result,
})
export const getListFailure = (error) => ({
    type: Failure,
    loading: false,
    error: error.message,
})

export const getList = (tab) => {
    return (dispatch) => {
        dispatch(getListStarted(tab))
        myAxiosGet(`/list?tab=${tab}`, (status, data) => {
            if (status) {
               let dataTop =  data.filter((item)=>{
                    return item.top === true
                })
                let dataNoTop =  data.filter((item)=>{
                    return item.top !== true
                })

                dispatch(getListSuccess(dataTop.concat(dataNoTop)))
            }else {
                dispatch(getListSuccess(''))
            }
        })
    }
   
}

export const getListDetail = (id) => {
    return (dispatch) => {
        dispatch(getListStarted())
        myAxiosGet(`/list/detail?id=${id}`, (status, data) => {
            if (status) {
                dispatch(getListSuccess(data))
            }else {
                dispatch(getListSuccess(''))
            }
        })
    }
   
}