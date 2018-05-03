/**
* Project           : JusTeam/client
*
* Module name       : LogInOut
*
* Author            : XU Lu
*
* Date created      : 20180315
*
* Purpose           : Redux reducer function for updating states when login and logout
*
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
**/

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
