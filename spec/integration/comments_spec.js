const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics/";
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;
const Comment = require("../../src/db/models").Comment;

describe("routes : comments", () => {
  beforeEach((done) => {
    this.user;
    this.topic;
    this.post;
    this.comment;
    sequelize.sync({force: true}).then((res) => {
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user;
        Topic.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system.",
          posts: [{
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            userId: this.user.id
          }]
        }, {
          include: {
            model: Post,
            as: "posts"
          }
        })
        .then((topic) => {
          this.topic = topic;
          this.post = this.topic.posts[0];

          Comment.create({
            body: "ay caramba!!!!!",
            userId: this.user.id,
            postId: this.post.id
          })
          .then((coment) => {
            this.comment = coment;
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
  });

  describe("guest attempting to perform CRUD actions for Comment", () => {
    beforeEach((done) => {
      request.get({
        url: "http://localhost:3000/auth/fake",
        form: {
          userId: 0
        }
      },
      (err, res, body) => {
        done();
      }
    );
  });

  describe("POST /topics/:topicId/posts/:postId/comments/create", () => {
    it("should not create a new comment", (done) => {
      const options = {
        url: `${base}${this.topic.id}/posts/${this.post.id}/comments/create`,
        form: {
          body: "This comment is amazing!"
        }
      };
      request.post(options,
        (err, res, body) => {
          Comment.findOne({where: {body: "This comment is amazing!"}})
          .then((comment) => {
            expect(comment).toBeNull();
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
  });

  describe("POST /topics/:topicId/posts/:postId/comments/:id/destroy", () => {
    it("should not delete the comment with the associated ID", (done) => {
      Comment.all()
      .then((comments) => {
        const commentCountBeforeDelete = comments.length;
        expect(commentCountBeforeDelete).toBe(1);
        request.post(
          `${base}${this.topic.id}/posts/${this.post.id}/comments/${this.comment.id}/destroy`,
          (err, res, body) => {
            Comment.all()
            .then((comments) => {
              expect(err).toBeNull();
              expect(comments.length).toBe(commentCountBeforeDelete);
              done();
            })
          });
        })
      });
    });

    describe("signed in user performing CRUD actions for Comment", () => {
      beforeEach((done) => {
        request.get({
          url: "http://localhost:3000/auth/fake",
          form: {
            role: "member",
            userId: this.user.id
          }
        },
        (err, res, body) => {
          done();
        }
      );
    });

    describe("POST /topics/:topicId/posts/:postId/comments/create", () => {
      it("should create a new comment and redirect", (done) => {
        const options = {
          url: `${base}${this.topic.id}/posts/${this.post.id}/comments/create`,
          form: {
            body: "This comment is amazing!"
          }
        };
        request.post(options,
          (err, res, body) => {
            Comment.findOne({where: {body: "This comment is amazing!"}})
            .then((comment) => {
              expect(comment).not.toBeNull();
              expect(comment.body).toBe("This comment is amazing!");
              expect(comment.id).not.toBeNull();
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
      });
    });

    describe("POST /topics/:topicId/posts/:postId/comments/:id/destroy", () => {
      it("should delete the comment with the associated ID", (done) => {
        Comment.all()
        .then((comments) => {
          const commentCountBeforeDelete = comments.length;
          expect(commentCountBeforeDelete).toBe(1);
          request.post(
            `${base}${this.topic.id}/posts/${this.post.id}/comments/${this.comment.id}/destroy`,
            (err, res, body) => {
              expect(res.statusCode).toBe(302);
              Comment.all()
              .then((comments) => {
                expect(err).toBeNull();
                expect(comments.length).toBe(commentCountBeforeDelete - 1);
                done();
              })
            });
          })
        });

        describe("comment destroy authorization checks", () => {
          beforeEach((done) => {
            this.user1;
            this.user2;
            this.topic;
            this.post;
            this.comment;
            sequelize.sync({force: true}).then((res) => {
              User.create({
                email: "potatoePete@google.com",
                password: "6541238s"
              })
              .then((user1) => {
                this.user1 = user1;
                Topic.create({
                  title: "Eating all the spaghetti",
                  description: "A twisted journey into the mind of an avid party pooper",
                  posts: [{
                    title: "What? You wanted some of this?",
                    body: "Ha, you thought you would come to this spaghetti party and actually get some?",
                    userId: this.user.id
                  }]
                }, {
                  include: {
                    model: Post,
                    as: "posts"
                  }
                })
                .then((topic) => {
                  this.topic = topic;
                  this.post = this.topic.posts[0];
                  Comment.create({
                    body: "Hope you all didn't want some",
                    userId: this.user1.id,
                    postId: this.post.id
                  })
                  .then((comment) => {
                    this.comment = comment;
                    done();
                  });
                });
              });
            });
          });

          it("should not delete comment if done by other, non-admin, user", (done) => {
            User.create({
              email: "aryaRocks@GoT.com",
              password: "close-eyes4evr",
              role: "member"
            })
            .then((user2) => {
              this.user2 = user2;
              request.get({
                url: "http://localhost:3000/auth/fake",
                form: {
                  userId: user2.id,
                  role: "member"
                }
              });
              Comment.all()
              .then((comments) => {
                const commentCountBeforeDelete = comments.length;
                expect(commentCountBeforeDelete).toBe(1);
                request.post(`${base}${this.comment.id}/destroy`, (err, res, body) => {
                  Comment.all()
                  .then((comments) => {
                    expect(comments.length).toBe(commentCountBeforeDelete);
                    done();
                  });
                });
              });
            });
          });

          it("should delete comment if user is admin", (done) => {
            User.create({
              email: "JaimeRocks@GoT.com",
              password: "goldenHand",
              role: "admin"
            })
            .then((user2) => {
              this.user2 = user2;
              request.get({
                url: "http://localhost:3000/auth/fake",
                form: {
                  userId: user2.id,
                  role: "admin"
                }
              });
              Comment.all()
              .then((comments) => {
                const commentCountBeforeDelete = comments.length;
                expect(commentCountBeforeDelete).toBe(1);
                request.post(`${base}${this.comment.id}/destroy`, (err, res, body) => {
                  Comment.all()
                  .then((comments) => {
                    expect(err).toBeNull();
                    expect(comments.length).toBe(commentCountBeforeDelete - 1);
                    done();
                  });
                });
              });
            });
          });


        });
      });
    });
  });
});
