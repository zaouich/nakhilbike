const AppError = require("../utils/AppError")

const handleCastError = (err)=>{
    console.log("cast")
    const value = err.message.match(/(["'])(\\?.)*?\1/)[0];

    return new AppError(value , 400)
}
const handleDuplicateKey = (err)=>{
    var value = err.errmsg.match(/\"([^\"]+)\"/)[1];
    return new AppError(`duplacate value : ${value}`,400)
}
const handleValidationError = (err)=>{
    var errs = Object.values(err.errors).map(el=>el.message)
    return new AppError(errs.join(". "),400)
}
const deveHandler = (err,res)=>{
    const statusCode = err.statusCode || 500
    const status  = err.status || "fail"
    res.status(statusCode).json({
        status , 
        message : err.message , 
        stacka : err.stack,
        err
    })
}
const JsonWebTokenErrorHandller=()=>new AppError("invalid jwt please login again",401)
const tokenExpiredTokenHandller= ()=>new AppError("expired jwt please login  again",401)
const productHandler =(err,res)=>{
    if(err.isOperational){
        res.status(err.statusCode).json({
            status : err.status,
            message : err.message
        })
    }else{
        console.log("err📌",err)
        res.status(500).json({
            status : "error" , 
            message : "something went very wrong"
        })
    }
}
const errorController = (err,req,res,next)=>{
    if(process.env.NODE_ENV==="development"){
        return deveHandler(err,res)
    }else{
        console.log(err.name)
        if(err.name ==="CastError") err = handleCastError(err)
        if(err.code==11000) err = handleDuplicateKey(err)
        if(err.name=="ValidationError") err = handleValidationError(err)
        if(err.name==="JsonWebTokenError") err = JsonWebTokenErrorHandller()
        if(err.name==="TokenExpiredError") err =tokenExpiredTokenHandller()
        productHandler(err,res)
    }

}
module.exports = errorController