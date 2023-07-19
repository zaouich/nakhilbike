const { default: mongoose } = require("mongoose");

 const  buyerSchema = new mongoose.Schema({
    firstname: { type: String, required: [true,"المرجو ادخال اسم المشتري"] },
    lastname: { type: String, required: [true,'المرجو ادخال لقب المشتري'] },
    image_card: [ String  ]
  });
  module.exports = buyerSchema

