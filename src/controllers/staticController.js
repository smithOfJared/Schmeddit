module.exports = {
  index(req, res, next){
    res.render("static/index", {title: "Howdy, welcome to Bloccit!"});
  },
    about(req, res, next){
      res.render("static/about", {title: "About Us"});
    }
}
