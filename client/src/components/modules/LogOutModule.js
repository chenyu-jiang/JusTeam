import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {logOut} from '../../services/accountService'


const mapStateToProps=state=>{
    return{
        userID: state.userID
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        logOutDispatch: ()=>{
            dispatch(logOut());
        }
    }
}
class LogOutModule extends  Component{
    render(){
    this.props.logOutDispatch();
    return(<Redirect to='/' />
    );
    }
}
export default  connect(mapStateToProps,mapDispatchToProps)(LogOutModule);