const matchList = ["^/$","/static","/login","/api/account/register","/api/account/login","/api/account/logout","/api/post/articles","/upload/pictures","/api/search.*","/api/team/teanInfo.*"]

var interceptor = function (req, res, next) {
    if(req.user) {
        console.log("logged in: " +req.path);
        next();
    }
    else {
        var status = false;
        console.log("Not logged in: "+req.path);
        for(var i=0;i<matchList.length;i++) {
            if(req.path.match(matchList[i])) {
                status = true;
                break;
            }
        }
        if(status) {
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
