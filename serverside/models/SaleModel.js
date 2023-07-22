const mongoose = require("mongoose");
const { buyerSchema } = require("./BuyerModel");

const SaleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "المرجو ادخال اسم الدراجة"],
    },
    saleNumber: {
      type: String,
      required: [true, "المرجو ادخال رقم الدراجة"],
    },
    paymentType: {
      type: String,
      enum: ["full_payment", "credit_payment"],
      required: [true, "المرجو اختيار طريقة الدفع"],
    },
    price: {
      type: Number,
      required: function () {
        return this.paymentType === "full_payment";
      },
    },
    pricePerMonth: {
      type: Number,
      required: function () {
        return this.paymentType === "credit_payment";
      },
    },
    numOfMonths: {
      type: Number,
      required: function () {
        return this.paymentType === "credit_payment";
      },
    },
    date: {
      type: String,
      required: [true, "المرجو ادخال تاريخ البيع"],
    },
    registrationNumber: {
      type: String,
      default: "لم يتم التحديد بعد",
    },
    buyer_firstname: {
      type: String,
      required: [true, "المرجو ادخال اسم المشتري"],
    },
    buyer_lastname: {
      type: String,
      required: [true, "المرجو ادخال لقب المشتري"],
    },
    buyer_card: [String],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

const Sale = mongoose.model("Sale", SaleSchema);

module.exports = Sale;
