const Office = require("../models/Office");
const Reservation = require("../models/Reservation");

class ReservationsRepository {
    async findReservation(userId, officeId, reservationDate){
        return await Reservation.findOne({
            where: {
              user_id: userId,
              office_id: officeId,
              reservation_date: reservationDate,
            },
          });
    }

    async findById(officeId){
        return await Office.findByPk(officeId);
    }

    async createReservation(userId, officeId, reservationDate){
        return await Reservation.create({
            user_id: userId,
            office_id: officeId,
            reservation_date: reservationDate,
          });
    }
};

module.exports = ReservationsRepository;