import LogInOut from './LogInOut'
import initState from './initState'

const SetViewingTeam=(state=initState,action={})=>{
    console.log('SetViewingTeam called: ',JSON.stringify(state),JSON.stringify(action));
    switch (action.type){
        case 'SET_TEAMID':
            console.log('Login with ',action.viewingTeamID)
            return action.viewingTeamID ;
        default: return state;

    }

}

 const RootReducer= (state=initState,action)=>{
    let nextstate=state;
    console.log('receiving dispatch:',JSON.stringify(action),'state=',JSON.stringify(state));
    switch (action.type){
        case 'LOG_INOUT':
            console.log('receiving login dispatch:',JSON.stringify(action),'state=',JSON.stringify(state));
             nextstate=Object.assign({},state,{userID: LogInOut(state.userID,action)});
            console.log('generating new state:', JSON.stringify(nextstate));
            return nextstate;
        case 'SET_TEAMID':
            console.log('setting a new current team id:',JSON.stringify(action),'state=',JSON.stringify(state));
            nextstate=Object.assign({},state,{viewingTeamID: SetViewingTeam(state.viewingTeamID,action)});
            console.log('generating new state:', JSON.stringify(nextstate));
            return nextstate;
        default:
            return state;
    }
}
export  default  RootReducer;
