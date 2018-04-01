var express = require("express");
var passport = require('passport');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var validator = require('express-validator');
var identity = require('./AccountSystem/entity/identity');
var session = require("express-session");

app.use("/api",require("./Router/api"));

//test fileUpload
/*app.get("/pic", function(req,res) {
    res.write('<html><body><form action="api/posts/upload/pictures" method="post"enctype="multipart/form-data"><label for="file">Filename:</label><input type="file" name="image"><br><input type="submit" name="submit" value="Submit"></form></body></html>');
    res.end();
});

app.get("/art", function(req,res) {
    res.write('<html><body><form action="api/posts/upload/articles" method="post"enctype="multipart/form-data"><label for="file">Filename:</label><input type="file" name="article"><br>  tags: <input type="text" name="tags"><br> PostTitle: <input type="text" name="postTitle"><br><input type="text" name = "isNew"><br><input type="submit" name="submit" value="Submit"></form></body></html>');
    res.end();
});*/

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (user, done) {
    identity.getUserFromId(id, function (err, user) {
        done(err, user);
    });
});

app.get("/login", function(req, res){
    res.write(
        '<html> <form action="login" method = "post">\n' +
        '  <div class="container">\n' +
        '  </div>\n' +
        '\n' +
        '  <div class="container">\n' +
        '    <label for="email"><b>Username</b></label>\n' +
        '    <input type="text" placeholder="Enter email" name="email" required>\n' +
        '\n' +
        '    <label for="password"><b>Password</b></label>\n' +
        '    <input type="password" placeholder="Enter Password" name="password" required>\n' +
        '\n' +
        '    <button type="submit">Login</button>\n' +
        '    <label>\n' +
        '      <input type="checkbox" checked="checked" name="remember"> Remember me\n' +
        '    </label>\n' +
        '  </div>\n' +
        '\n' +
        '  <div class="container" style="background-color:#f1f1f1">\n' +
        '    <button type="button" class="cancelbtn">Cancel</button>\n' +
        '    <span class="psw">Forgot <a href="#">password?</a></span>\n' +
        '  </div>\n' +
        '</form> ' +
        '</html>');
    res.end();
});

app.get("/register", function(req,res) {
    res.write('<html> <form action="register" method = "post" style="border:1px solid #ccc">\n' +
        '  <div class="container">\n' +
        '    <h1>Sign Up</h1>\n' +
        '    <p>Please fill in this form to create an account.</p>\n' +
        '    <hr>\n' +
        '\n' +
        '    <label for="username"><b>Username</b></label>\n' +
        '    <input type="text" placeholder="Enter username" name="userID" required>\n' +
        '\n' +
        '    <label for="email"><b>Email</b></label>\n' +
        '    <input type="text" placeholder="Enter Email" name="email" required>\n' +
        '\n' +
        '    <label for="psw"><b>Password</b></label>\n' +
        '    <input type="password" placeholder="Enter Password" name="password" required>\n' +
        '\n' +
        '    <label for="psw-repeat"><b>Repeat Password</b></label>\n' +
        '    <input type="password" placeholder="Repeat Password" name="checkPassword" required>\n' +
        '\n' +
        '<br>' +
        '    <label for="phone"><b>Phone Number</b></label>\n' +
        '    <input type="text" placeholder="Enter phone number" name="phone" required>\n' +
        '    <label for="Institution"><b>Institution</b></label>\n' +
        '    <input type="text" placeholder="Enter institution" name="institution" required>\n'+
        '    <label for="major"><b>Major</b></label>\n' +
        '    <input type="text" placeholder="Enter major" name="major" required>\n'+
        '    <label for="nickname"><b>Nickname</b></label>\n' +
        '    <input type="text" placeholder="Enter nickname" name="nickname" required>\n'+
        '    <label>\n' +
        '      <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"> Remember me\n' +
        '    </label>\n' +
        '\n' +
        '    <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p>\n' +
        '\n' +
        '    <div class="clearfix">\n' +
        '      <button type="button" class="cancelbtn">Cancel</button>\n' +
        '      <button type="submit" class="signupbtn">Sign Up</button>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</form> </html>');
    res.end();
});

var server = app.listen(3001);
var instantChat = require("./InstantMessages/SocketApp")(server);
console.log("Server started on port 3001.");
