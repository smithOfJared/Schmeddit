const topicQueries = require("../db/queries.topics.js");

module.exports = {
  index(req, res, next){
    topicQueries.getAllTopics((err, topics) => {
      if(err){
        res.direct(500, "static/index");
      }
      else {
        res.render("topics/index", {topics});
      }
    })
  }
}
