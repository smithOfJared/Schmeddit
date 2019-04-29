const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;


describe("Topic", () => {
  beforeEach((done) => {
    this.topic;
    this.post;
    this.user;
    sequelize.sync({force: true}).then((res) => {
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user; //store the user
        Topic.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system.",
          posts: [{
            title: "My first visit to Proxima Centauri",
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
          this.post = topic.posts[0];
          done();
        })
      })
    });
  });

  describe("#create()", () => {
    it("should create a topic object with a title and description", (done) => {
      Topic.create({
        title: "Pros of Cryosleep during the long journey",
        description: "1. Not having to answer the 'are we there yet?' question.",
      })
      .then((topic) => {
        expect(topic.title).toBe("Pros of Cryosleep during the long journey");
        expect(topic.description).toBe("1. Not having to answer the 'are we there yet?' question.");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
    it("should not create a topic with missing title or description", (done) => {
      Topic.create({})
      .then((topic) => {
        //if this runs, none of the validations are working
        expect(true).toBe(false);
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Topic.description cannot be null");
        expect(err.message).toContain("Topic.title cannot be null");
        done();
      });
    });

    describe("#getPosts()", () => {
      it("should return the associated post", (done) => {
        this.topic.getPosts()
        .then((associatedPosts) => {
<<<<<<< HEAD
<<<<<<< HEAD
          expect(associatedPosts[0].title).toBe("My first visit to Proxima Centauri b");
=======
          expect(associatedPosts[0].title).toBe("My first visit to Proxima Centauri");
          ///it's saying "expect the first thing in the array to have a title property and have it be..."
>>>>>>> checkpoint12-authorization-submission
=======
          expect(associatedPosts[0].title).toBe("My first visit to Proxima Centauri b");
>>>>>>> 122a526b231a140686d13937cf0d1b6de56c862d
          done();
        });
      });
    });
  });

});
