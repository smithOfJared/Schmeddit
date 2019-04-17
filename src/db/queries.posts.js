const Post = require("./models").Post;
const Topic = require("./models").Topic;
const Flair = require("./models").Flair;

module.exports = {
  getPost(id, callback){
    return Post.findById(id, {
      include: [{
        model: Flair,
        as: "flairs"
      }]
    })
    .then((post) => {
      callback(null, post);
    })
    .catch((err) => {
      callback(err);
    })
  },
  addPost(newPost, callback){
    return Post.create(newPost)
    .then((post) => {
      callback(null, post);
    })
    .catch((err) => {
      callback(err);
    })
  },
  deletePost(id, callback){
    return Post.destroy({
      where: { id }
    })
    .then((deletedRecordsCount) => {
      callback(null, deletedRecordsCount);
    })
    .catch((err) => {
      callback(err);
    })
  },
  updatePost(id, updatedPost, callback){
    return Post.findById(id)
    .then((post) => {
      if(!post){
        return callback("Post not found");
      }
      post.update(updatedPost, {
        fields: Object.keys(updatedPost)
      })
      .then(() => {
        callback(null, post);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }
}
