const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000//";
const sequelize = require("../../src/db/models/index").sequelize;
//const Topic = require("../../src/db/models").Topic;
const Advertisement = require("../../src/db/models").Advertisement;

describe("routes : advertisements", () => {

  beforeEach((done) => {
    this.advertisement;
    sequelize.sync({force: true}).then((res) => {

      Advertisement.create({
        title: "Doink-It!",
        description: "Only babies don't have this toy!"
      })
      .then((advertisement) => {
        this.advertisement = advertisement;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("GET / advertisements", () => {

    it("should show the latest and hottest thing you don't need", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Advertisement");
        done();
      });
    });
  });
});
