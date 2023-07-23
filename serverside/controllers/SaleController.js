const multer = require("multer");
const Sale = require("../models/SaleModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const getAllSales = catchAsync(async (req, res, next) => {
  const sales = await Sale.find();
  res.status(200).json({
    status: "success",
    data: {
      length: sales.length,
      sales,
    },
  });
});
const postASale = catchAsync(async (req, res, next) => {
  console.log(req.body.paymentType);

  const files = req.files.map((el) => el.filename);
  const {
    name,
    paymentType,
    price,
    pricePerMonth,
    numOfMonths,
    date,
    registrationNumber,
    buyer_lastname,
    buyer_firstname,
    saleNumber,
  } = req.body;

  let saleData;
  if (paymentType === "full_payment") {
    saleData = {
      name,
      paymentType,
      price,
      date,
      registrationNumber,
      saleNumber,
      buyer_lastname,
      buyer_firstname,
      buyer_card: files,
    };
  } else if (paymentType === "credit_payment") {
    saleData = {
      name,
      paymentType,
      pricePerMonth,
      numOfMonths,
      date,
      registrationNumber,
      saleNumber,
      buyer_lastname,
      buyer_firstname,
      buyer_card: files,
    };
  } else {
    return next(new AppError("Invalid payment type.", 400));
  }

  const sale = await Sale.create(saleData);
  res.status(201).json({
    status: "success",
    data: {
      sale,
    },
  });
});

const updateSale = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const files = req.files.map((el) => el.filename);
  const {
    name,
    paymentType,
    price,
    pricePerMonth,
    numOfMonths,
    date,
    registrationNumber,
    buyer_lastname,
    buyer_firstname,
    saleNumber,
  } = req.body;

  let updatedData;
  if (paymentType === "full_payment") {
    updatedData = {
      name,
      paymentType,
      price,
      date,
      registrationNumber,
      saleNumber,
      buyer_lastname,
      buyer_firstname,
      buyer_card: files,
    };
  } else if (paymentType === "credit_payment") {
    updatedData = {
      name,
      paymentType,
      pricePerMonth,
      numOfMonths,
      date,
      registrationNumber,
      saleNumber,
      buyer_lastname,
      buyer_firstname,
      buyer_card: files,
    };
  } else {
    return next(new AppError("Invalid payment type.", 400));
  }

  const updated = await Sale.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
    runValidators: true,
  });
  if (!updated) return next(new AppError("No sale with this id", 400));
  res.status(201).json({
    status: "success",
    data: {
      updated,
    },
  });
});
const deleteSale = catchAsync(async (req, res, next) => {
  const toDelete = await Sale.findByIdAndDelete(req.params.id);
  if (!toDelete) return next(new AppError("no sale with this id", 400));
  res.status(204).json({
    status: "success",
  });
});
const getOneSale = catchAsync(async (req, res, next) => {
  const sale = await Sale.findById(req.params.id);
  if (!sale) return next(new AppError("no sale with this id", 400));
  res.status(200).json({
    status: "success",
    data: {
      sale,
    },
  });
});
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/imgs/card");
  },
  filename: (req, file, cb) => {
    const name = Date.now();
    const ext = file.mimetype.split("/")[1];
    const fullname = `${name}.${ext}`;
    cb(null, fullname);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("المرجو اختيار صور صحيحة", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
const getByDay = async (req, res, next) => {
  const sales = await Sale.find({ date: req.params.date });
  var total = 0;
  sales.forEach((el) => {
    total = total += el.price;
  });
  res.status(200).json({
    status: "success",
    data: {
      length: sales.length,
      total,
      sales,
    },
  });
};
const uploadImage = upload.array("buyer_card", 10);
module.exports = {
  postASale,
  getAllSales,
  uploadImage,
  updateSale,
  deleteSale,
  getOneSale,
  getByDay,
};
