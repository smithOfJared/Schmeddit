module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const topicRoutes = require("../routes/topics");
    const advertisementRoutes = require("../routes/advertisements");
    const postRoutes = require("../routes/posts");

    app.use(staticRoutes);
    app.use(postRoutes);
    app.use(topicRoutes);
    app.use(advertisementRoutes);
  }
}
