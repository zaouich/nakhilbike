const mongoose = require("mongoose")
const { buyerSchema } = require("./BuyerModel")
const SaleSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"المرجو ادخال اسم الدراجة"],

    },
    saleNumber : {
        type:String,
        required: [true,"المرجو ادخال رقم الدراجة"]
    },
    price:{
        type : Number,
        required : [true,"المرجو ادخال السعر"],
    },
    date : {
        type : String , 
        required: [true,"المرجو ادخال تاريخ البيع"]
    },
    registrationNumber : {
        type : String,
        default: "لم يتم التحديد بعد"
    },
    buyer_firstname : {
        type : String,
        required: [true,"المرجو ادخال اسم المشتري"],

    },
    buyer_lastname : {
        type : String,
        required: [true,"المرجو ادخال اسم المشتري"],

    },
    buyer_card : [String],


},{
    toJSON : {
        virtuals : true
    },
    toObject : {
        virtuals : true
    }
})
const Sale = mongoose.model("Sale", SaleSchema)

module.exports = Sale

