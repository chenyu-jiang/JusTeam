/**
* Project           : JusTeam/server
*
* Module name       : Interceptor
*
* Author            : JIANG Chenyu
*
* Date created      : 20180325
*
* Purpose           : Intercepts unauthorized requests.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
*
**/

const matchList = ["^/$","/static","/login","/api/account/register","/api/account/login","/api/account/logout","/api/post/articles","/upload/pictures","/api/search.*","/api/team/teanInfo.*"]

var interceptor = function (req, res, next) {
    if(req.user) {
        console.log("logged in: " +req.path);
        next();
    }
    else {
        var status = false; //not logged in
        console.log("Not logged in: "+req.path);
        for(var i=0;i<matchList.length;i++) {
            //check matchLists (White list)
            if(req.path.match(matchList[i])) {
                status = true;
                break;
            }
        }
        if(status) {
            //allow it to pass
            next();
        }
        else{
            res.setHeader("status", 200);
            res.send(JSON.stringify({
              requestState:false,
              error:"Not logged in!",
            }));
        }
    }
}

module.exports = interceptor;
