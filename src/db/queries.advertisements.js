const Advertisement = require("./models").Advertisement;

module.exports = {
  getAllAdvertisements(callback){
    return Advertisement.findAll()
    .then((Advertisements) => {
      callback(null, Advertisements);
    })
    .catch((err) => {
      callback(err);
    })
  },
  addAdvertisement(newAdvertisement, callback){
    return Advertisement.create({
      title: newAdvertisement.title,
      description: newAdvertisement.description
    })
    .then((Advertisement) => {
      callback(null, Advertisement);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getAdvertisement(id, callback){
    return Advertisement.findById(id)
    .then((Advertisement) => {
      callback(null, Advertisement);
    })
    .catch((err) => {
      callback(err);
    })
  },

  deleteAdvertisement(id, callback){
    return Advertisement.destroy({
      where: {id}
    })
    .then((Advertisement) => {
      callback(null, Advertisement);
    })
    .catch((err) => {
      callback(err);
    })
  },

  updateAdvertisement(id, updatedAdvertisement, callback){
    return Advertisement.findById(id)
    .then((Advertisement) => {
      if(!Advertisement){
        return callback("Advertisement not found");
      }
      Advertisement.update(updatedAdvertisement, {
        fields: Object.keys(updatedAdvertisement)
      })
      .then(() => {
        callback(null, Advertisement);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }


}
