const flairQueries = require("../db/queries.flairs.js");
const postQueries = require("../db/queries.posts.js");

module.exports = {
  new(req, res, next){
    postQueries.getPost(req.params.postId, (err, post) => {
      if(err){
        res.redirect(500, `/topics/${req.params.topicId}`);
      } else{
        const topicId = req.params.topicId;
        res.render("flairs/new", {post, topicId});
      }
    });
  },
  create(req, res, next){
    let newFlair = {
      name: req.body.name,
      color: req.body.color,
      postId: req.params.postId
    };
    flairQueries.addFlair(newFlair, (err, flair) => {
      if(err){
        res.redirect(500, "flairs/new");
      } else {
        res.redirect(303, `/topics/${req.params.topicId}/posts/${flair.postId}`);
      }
    });
  },
  destroy(req, res, next){
    flairQueries.deleteFlair(req.params.id, (err, deletedRecordsCount) => {
      if(err){
        res.redirect(500, `/topics/${req.params.topicId}/posts/${req.params.postId}`)
      } else {
        res.redirect(303, `/topics/${req.params.topicId}/posts/${req.params.postId}`)
      }
    });
  }
}
