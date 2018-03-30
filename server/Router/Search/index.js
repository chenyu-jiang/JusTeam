var router = require("express").Router();
var searchSystem = require("../../SearchSystem");

router.get("/", async (req, res, next) => {
    var queryString = req.query.query;
    var offset = 0;
    if (req.query.offset !== undefined) {
        offset = req.query.offset;
    }
    var limit = 20;
    if (req.query.limit !== undefined) {
        limit = req.query.limit;
    }
    var result = await searchSystem.search(queryString, offset, limit);
    res.send(result);
});

module.exports = router;