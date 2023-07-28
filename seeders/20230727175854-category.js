"use strict";

const fs = require('fs')
const path = require('path')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const imagePath = path.join('/home/appinvent/Desktop/Projects/node js/olx_sequilize/electronic.jpg')
    console.log(imagePath);
    const imageBuffer = fs.readFileSync(imagePath);
  
     const imageBlob =  Buffer.from(imageBuffer)
    console.log(imageBlob);

    await queryInterface.bulkInsert("Categories", [
      {
        category_name: "Electronics",
        parent_id: 0,
        category_image: imageBlob,
      },
      {
        category_name: "Furniture",
        parent_id: 0,
        category_image: imageBlob,
      },
      {
        category_name: "Mobile",
        parent_id: 1,
        category_image: imageBlob,
      },

      {
        category_name: "Sofa",
        parent_id: 2,
        category_image: imageBlob,
      },
      
    ]);
  },

  async down(queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('Categories', null, {});
    
  },
};
