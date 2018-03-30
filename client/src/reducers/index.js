import LogInOut from './LogInOut'
import initState from './initState'

 const RootReducer= (state=initState,action)=>{
    console.log('receiving dispatch:',JSON.stringify(action),'state=',JSON.stringify(state));
    switch (action.type){
        case 'LOG_INOUT':
            console.log('receiving login dispatch:',JSON.stringify(action),'state=',JSON.stringify(state));
            const nextstate=Object.assign({},state,{userID: LogInOut(state.userID,action)});
            console.log('generating new state:', JSON.stringify(nextstate));
            return nextstate;
        default:
            return state;
    }
}
export  default  RootReducer;
