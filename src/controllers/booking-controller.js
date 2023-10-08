const {BookingService}=require('../services/index')
const {StatusCodes}=require('http-status-codes')

const bookingService=new BookingService(); //object

const create=async (req,res)=>{
    try {
        const response=await bookingService.createBooking(req.body);
        return res.status(StatusCodes.OK).json({
            message:'Successfully completed booking',
            success:true,
            err:{},
            data:response
        });
    } catch (error) {
        return res.status(error.StatusCodes).json({
            message:error.message,
            success:false,
            err:error.explanation,
            data:{}
        });
    }
}

module.exports={
    create
}
