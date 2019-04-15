const Post = require("./models").Post;
const Topic = require("./models").Topic;
const Flair = require("./models").Flair;

module.exports = {
  getFlair(id, callback){
    return Post.findById(id)
    .then((post) => {
      callback(null, post);
    })
    .catch((err) => {
      callback(err);
    })
  },
  addFlair(newFlair, callback){
    return Flair.create(newFlair)
    .then((flair) => {
      callback(null, flair);
    })
    .catch((err) => {
      callback(err);
    })
  },
  deleteFlair(id, callback){
    return Flair.destroy({
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
