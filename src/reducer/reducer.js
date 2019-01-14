import { Started,Success,Failure } from '../action/actionType'
const defaultState = { loading: true, result: [], error: null }
const defaultDetailState = { loading: true, result: '', error: null }
const reducer = (state=defaultState,action) =>{
    switch (action.type) {
        case Started:
            return { loading:true }
        case Success:
            return { loading:false,result: action.result }
        case Failure:
            return { loading:false,error: action.error }
        default:
            return state
    }
}

const reducerDetail = (state=defaultDetailState,action) =>{
    switch (action.type) {
        case Started:
            return { loading:true }
        case Success:
            return { oading:false,result: action.result }
        case Failure:
            return { loading:false,error: action.error }
        default:
            return state
    }
}
export { reducer , reducerDetail}