"use strict";
const path = require('path');
const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const imagePath = path.join(
      "/home/appinvent/Desktop/Projects/node js/olx_sequilize/electronic.jpg"
    );
    console.log(imagePath);
    const imageBuffer = fs.readFileSync(imagePath);

    await queryInterface.bulkInsert("Categories", [
      {
        category_name: "Electronics",
        parent_id: 0,
        category_image: imageBuffer,
      },
      {
        category_name: "Furniture",
        parent_id: 0,
        category_image: imageBuffer,
      },
      {
        category_name: "Mobile",
        parent_id: 1,
        category_image: imageBuffer,
      },

      {
        category_name: "Sofa",
        parent_id: 2,
        category_image: imageBuffer,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
