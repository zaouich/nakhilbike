const express =require("express")
const cors = require("cors")
const saleRouter = require("./routes/saleRoutes")
const errorController = require("./controllers/errController")
const app = express()
app.use(cors({
    origin : "*"
}))
app.use('/static', express.static('public'))


app.use(express.json())
app.use('/api/v1/sales',saleRouter)
app.use(errorController)
module.exports = app