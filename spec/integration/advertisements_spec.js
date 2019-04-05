const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisements/";
const sequelize = require("../../src/db/models/index").sequelize;
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


  describe("GET /advertisements/new", () => {
    it("should render a new advertisement form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Advertisement");
        done();
      });
    });
  });

  describe("POST /advertisements/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        title: "Doink-It!",
        description: "Only babies don't have this toy!"
      }
    };

    it("should create a new advertisement and redirect", (done) => {
      request.post(options,
        (err, res, body) => {
          Advertisement.findOne({where: {title: "Doink-It!"}})
          .then((advertisement) => {
            expect(res.statusCode).toBe(303);
            expect(advertisement.title).toBe("Doink-It!");
            expect(advertisement.description).toBe("Only babies don't have this toy!");
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

  describe("GET /advertisements/:id", () => {
    it("should render a view with the selected advertisement", (done) => {
      request.get(`${base}${this.advertisement.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain(this.advertisement.title, this.advertisement.description);
        done();
      });
    });
  });

  describe("POST /advertisements/:id/destroy", () => {
    it("should delete the advertisement with the associated ID", (done) => {
      Advertisement.all()
      .then((advertisements) => {
        const advertisementCountBeforeDelete = advertisements.length;
        expect(advertisementCountBeforeDelete).toBe(1);
        request.post(`${base}${this.advertisement.id}/destroy`, (err, res, body) => {
          Advertisement.all()
          .then((advertisements) => {
            expect(err).toBeNull();
            expect(advertisements.length).toBe(advertisementCountBeforeDelete - 1);
            done();
          })
        });
      });
    });
  });
    describe("GET /advertisements/:id/edit", () => {
      it("should render a view with an edit advertisement form", (done) => {
        console.log(base + "this is the base");
        request.get(`${base}${this.advertisement.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Edit Advertisement");
          expect(body).toContain("Doink-It!");
          done();
        });
      });
    });

    describe("POST /advertisements/:id/update", () => {
      it("should update the advertisement with the given values", (done) => {
        const options = {
          url: `${base}${this.advertisement.id}/update`,
          form: {
            title: "Doink-It!",
            description: "There are a lot of them"
          }
        };
        request.post(options,
          (err, res, body) => {

            expect(err).toBeNull();
            Advertisement.findOne({
              where: { id: this.advertisement.id }
            })
            .then((advertisement) => {
              expect(advertisement.title).toBe("Doink-It!");
              done();
            });
          });
        });
      });

  });
