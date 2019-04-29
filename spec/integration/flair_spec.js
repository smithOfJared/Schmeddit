const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000";
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;
const User = require("../../src/db/models").User;

describe("routes : flairs", () => {
  beforeEach((done) => {
    this.topic;
    this.post;
    this.flair;
    this.user;
    sequelize.sync({force: true}).then((res) => {
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user;
        Topic.create({
          title: "Winter Games",
          description: "Post your Winter Games stories."
        })
        .then((topic) => {
          this.topic = topic;
          Post.create({
            title: "Snowball Fighting",
            body: "So much snow!",
            topicId: this.topic.id,
            userId: this.user.id
          })
          .then((post) => {
            this.post = post;
            Flair.create({
              name: "Opinion",
              color: "blue",
              postId: this.post.id
            })
            .then((flair) => {
              this.flair = flair;
            });
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
      })
    });
  });

  describe("GET /topics/:topicId/posts/:postId/flairs/new", () => {
    it("should render new flair for post", (done) => {
      request.get(`${base}/topics/${this.topic.id}/posts/${this.post.id}/flairs/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain(`New Flair for ${this.post.title}`);
        done();
      });
    });
  });
});
