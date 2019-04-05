'use strict';

const faker = require("faker");

 let advertisements = [];

 for(let i = 1 ; i <= 15 ; i++){
   advertisements.push({
     title: faker.hacker.noun(),
     description: faker.hacker.phrase(),
     createdAt: new Date(),
     updatedAt: new Date()
   });
 }

//#3
 module.exports = {
   up: (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert("Advertisements", advertisements, {});
   },

   down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete("Advertisements", null, {});
   }
 };
