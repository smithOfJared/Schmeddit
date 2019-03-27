const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes: static", () => {
  describe("GET /", () => {
    it("should return status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);

        done();
      });
    });
  });
});
  //tig Comand line tool displays all commits install it!

  //Look into sublime packages. Get rid of VS
