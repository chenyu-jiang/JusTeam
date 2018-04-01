import initState from './initState'

const LogInOut=(state=initState,action={})=>{
    console.log('LogInOut called: ',JSON.stringify(state),JSON.stringify(action));
    switch (action.type){
       case 'LOG_INOUT':
           console.log('Login with ',action.userID)
           return action.userID ;
        default: return state;

    }

}
export default  LogInOut;