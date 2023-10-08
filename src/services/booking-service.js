const {BookingRepository}=require('../repository/index')

const { ServiceError } = require('../utils/error');

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
            
            const resposne=await axios.get(getFlightRequestURL);
             
            let flightData=flight.data.data;
            let priceOfTheFlight=flight.price;

            if(data.noOfSeats>flightData.totalSeats)
            {
                throw new ServiceError('Something went wrong in the booking process','Insufficient seats in the flight')
            }

            const totalCost=priceOfTheFlight*data.noOfSeats;

            const bookingPayload={...data,totalCost};
            
            const booking=await this.bookingRepository.create(bookingPayload);

            const updateFlightRequestURL=`${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightID}`;

            await axios.patch(updateFlightRequestURL,{totalSeats:flightData.totalSeats-booking.noOfSeats});

            const finalBooking=await this.bookingRepository.update(booking.id,{status:"Booked"});

            return finalBooking;

        } catch (error) {

            if(error.name=='RepositoryError' || error.name=='vaError')
            {
                throw error;
            }
            throw new ServiceError();
        }
    }
}

module.exports=BookingService

 