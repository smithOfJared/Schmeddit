const postQueries = require("../db/queries.posts.js");
const Authorizer = require("../policies/post");


module.exports = {
  new(req, res, next){
    res.render("posts/new", {topicId: req.params.topicId});
  },
  create(req, res, next){
    let newPost = {
      title: req.body.title,
      body: req.body.body,
      topicId: req.params.topicId,
      userId: req.user.id
    };
    postQueries.addPost(newPost, (err, post) => {
      if(err){
        res.redirect(500, "/posts/new");
      } else {
        res.redirect(303, `/topics/${newPost.topicId}/posts/${post.id}`);
      }
    });
  },
  show(req, res, next){
    postQueries.getPost(req.params.id, (err, post) => {
      if(err || post == null){
        console.log(err);
        res.redirect(404, "/");
      } else {
        res.render("posts/show", {post});
      }
    });
  },
  destroy(req, res, next){
    postQueries.getPost(req.params.id, (err, post) => {
      const authorized = new Authorizer(req.user, post).destroy();
      if(!authorized) {
        req.flash("notice", "You are not authorized to do that.");
        res.redirect(`/topics/${req.params.topicId}/posts/${req.params.id}`);
      } else {
        postQueries.deletePost(req.params.id, (err, deletedRecordsCount) => {
          if(err){
            res.redirect(500, `/topics/${req.params.topicId}/posts/${req.params.id}`)
          } else {
            res.redirect(303, `/topics/${req.params.topicId}`)
          }
        });
      }
    });
  },
  edit(req, res, next){
    postQueries.getPost(req.params.id, (err, post) => {
      const authorized = new Authorizer(req.user, post).edit();
      if(!authorized) {
        req.flash("notice", "You are not authorized to do that.");
        res.redirect(`/topics/${req.params.topicId}/posts/${req.params.id}`);
      } else if(err || post == null){
        res.redirect(404, "/");
      } else {
        res.render("posts/edit", {post});
      }
    });
    },
  update(req, res, next){
    postQueries.getPost(req.params.id, (err, post) => {
      const authorized = new Authorizer(req.user, post).update();
      if(!authorized) {
        console.log(err);
        req.flash("notice", "You are not authorized to do that.");
        res.redirect(`/topics/${req.params.topicId}/posts/${req.params.id}`);
      } else {
        postQueries.updatePost(req.params.id, req.body, (err, post) => {
          if(err || post == null){
            res.redirect(404, `/topics/${req.params.topicId}/posts/${req.params.id}/edit`);
          } else {
            res.redirect(`/topics/${req.params.topicId}/posts/${req.params.id}`);
          }
        });
      }
    });
  }
}
