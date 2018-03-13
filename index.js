var express = require("express");
var app = express();

app.use("/upload",require("./Router/fileUpload"));
app.get("/", function(req,res) {
    res.write('<html><body><form action="/upload/pictures" method="post"enctype="multipart/form-data"><label for="file">Filename:</label><input type="file" name="image"><br><input type="submit" name="submit" value="Submit"></form></body></html>');
    res.end();
})

app.listen(3000);
console.log("Server started on port 3000.");
