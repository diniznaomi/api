const Office = require("../models/Office");
const Reservation = require("../models/Reservation");
const ReservationsRepository = require("../repositories/ReservationsRepository");

class ReservationService {
  constructor() {
    this.repositoriesRepository = new ReservationsRepository;
}

  async createReservation(userId, officeId, reservationDate) {
    const existingReservation = await this.repositoriesRepository.findReservation(userId, officeId, reservationDate);

    if (existingReservation) {
      console.log(existingReservation)
      throw new Error("Seat already reserved for this date.");
    }

    const office = await this.repositoriesRepository.findById(officeId);

    if (!office) {
      throw new Error("Office not found.");
    }

    return await this.repositoriesRepository.createReservation(userId, officeId, reservationDate);
  }

  async listReservationsByUser(userId) {
    return await Reservation.findAll({
      where: { user_id: userId },
      include: [{ model: Office, as: "office" }],
    });
  }

  async deleteReservation(reservationId) {
    await Reservation.destroy({ where: { id: reservationId } });
  }
}

module.exports = ReservationService;
