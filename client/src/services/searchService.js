/**
* Project           : JusTeam/client
*
* Module name       : searchService
*
* Author            : XU Lu
*
* Date created      : 20180403
*
* Purpose           : getting search result from backend.
*
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
**/

import {_domain,_search_team} from "./Urlparams"

const getTeamSearchResult = (queryString)=> {
    return (fetch(_domain+_search_team+"?query="+queryString+"&offset=0&limit=100",
        {
            method:'GET',
            credentials: "include",
            headers:{
                Accept:'application/json',
            }
        }
        ).then((response)=>response.json())
        .catch((error)=>{
            console.log('Error occurred'+JSON.stringify(error));
            return({error: error});
        }));
}

export {getTeamSearchResult};
