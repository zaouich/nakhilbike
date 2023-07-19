const {getAllSales,postASale, uploadImage, updateSale, deleteSale, getByDay, getOneSale} = require("../controllers/SaleController")
const express = require("express")
const multer = require("multer")
const upload = multer({dest : "public/imgs/card"})
const router =express.Router()
router.route("/").get(getAllSales).post(uploadImage, postASale)
router.route("/:id").patch(uploadImage,updateSale).delete(deleteSale).get(getOneSale)
router.route("/getByDay/:date").get(getByDay)
module.exports = router