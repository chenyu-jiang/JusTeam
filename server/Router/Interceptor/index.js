const matchList = ["^/$","/static","/login","/api/account/register","/api/account/login","/api/post/articles","/upload/pictures","/api/search.*","/api/team/teanInfo.*"]

var interceptor = function (req, res, next) {
    if(req.user) {
        next();
    }
    else {
        var status = false;
        for(var i=0;i<matchList.length;i++) {
            console.log(req.path);
            console.log(req.path.match(matchList[i]));
            if(req.path.match(matchList[i])) {
                status = true;
                break;
            }
        }
        if(status) {
            next();
        }
        else{
            res.setHeader("status", 403);
            res.send("Access forbidden.<br>" + req.path);
        }
    }
}

module.exports = interceptor;
