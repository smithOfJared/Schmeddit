const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes: static", () => {
  describe("GET /about", () => {
    it("should return an About Us in the view", (done) => {
      request.get(base.concat("about"),(err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("About Us.");
        done();
      });
    });
  });
  describe("GET /", () => {
    it("should return status code 200 and have 'Welcome to Bloccit' in the body of the response", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Welcome to Bloccit");
        done();
      });
    });
  });
});
  //tig Comand line tool displays all commits install it!

  //Look into sublime packages. Get rid of VS
