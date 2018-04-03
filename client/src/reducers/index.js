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
const SetFromUrl=(state=initState,action={})=>{
    console.log('SetFromUrl called: ',JSON.stringify(state),JSON.stringify(action));
    switch (action.type){
        case 'SET_FROMURL':
            console.log('set fromUrl ',action.fromUrl)
            return action.fromUrl;
        default: return state;

    }

}

const SetToPath=(state=initState,action={})=>{
    console.log('SetToPath called: ',JSON.stringify(state),JSON.stringify(action));
    switch (action.type){
        case 'SET_TOPATH':
            console.log('set path ',action.toPath)
            if(action.toPath==='/null') return undefined;
            return action.toPath;
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
        case 'SET_TOPATH':
            console.log('setting a new current path:',JSON.stringify(action),'state=',JSON.stringify(state));
            nextstate=Object.assign({},state,{toPath: SetToPath(state.toPath,action)});
            console.log('generating new state:', JSON.stringify(nextstate));
            return nextstate;
        case 'SET_FROMURL':
            console.log('setting a from url:',JSON.stringify(action),'state=',JSON.stringify(state));
            nextstate=Object.assign({},state,{fromUrl: SetFromUrl(state.fromUrl,action)});
            console.log('generating new state:', JSON.stringify(nextstate));
            return nextstate;
        default:
            return state;
    }
}
export  default  RootReducer;
