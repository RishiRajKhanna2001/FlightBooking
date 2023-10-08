const {BookingRepository}=require('../repository/index')

const { ServiceError } = require('../utils/errors');

const axios=require('axios')

const {FLIGHT_SERVICE_PATH}=require('../config/server-config');

class BookingService{
   
    constructor()
    {
        this.bookingRepository=new BookingRepository();
    }

    async createBooking(data){
        try {
            const flightID=data.flightID;
            const getFlightRequestURL=`${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightID}`
            
            const flight=await axios.get(getFlightRequestURL);

            return flight;
        } catch (error) {
            throw new ServiceError();
        }
        
    }
}

module.exports=BookingService