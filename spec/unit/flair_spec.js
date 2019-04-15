const sequelize = require("../../src/db/models/index").sequelize;
const Flair = require("../../src/db/models").Flair;
const Post = require("../../src/db/models").Post;
const Topic = require("../../src/db/models").Topic;
describe("Flair", () => {
  describe("#create()", () => {
    it("should not create a flair without assigned name, color, and postId", (done) => {
      Flair.create({})
      .then((flair) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Flair.name cannot be null");
        expect(err.message).toContain("Flair.color cannot be null");
        expect(err.message).toContain("Flair.postId cannot be null");
        done();
      })
    });
  });
});
