module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const topicRoutes = require("../routes/topics");
    const advertisementRoutes = require("../routes/advertisements");
    const postRoutes = require("../routes/posts");
    const userRoutes = require("../routes/users");
    const flairRoutes = require("../routes/flairs");

    app.use(staticRoutes);
    app.use(postRoutes);
    app.use(userRoutes);
    app.use(topicRoutes);
    app.use(advertisementRoutes);
    app.use(flairRoutes);
  }
}
