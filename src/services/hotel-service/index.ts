import { notFoundError, unauthorizedError, paymentRequiredError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import hotelRepository from "@/repositories/hotel-repository"
import enrollmentRepository from "@/repositories/enrollment-repository";
import { TicketStatus } from "@prisma/client";

async function getHotels(userId: number) {
    const gethotel = await hotelRepository.showHotel();
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) throw notFoundError();
  
    const ticketeTciketType = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
    if (!ticketeTciketType) throw notFoundError();
  
    if (ticketeTciketType.status === TicketStatus.RESERVED) throw paymentRequiredError();
  
    if (ticketeTciketType.TicketType.isRemote === true || ticketeTciketType.TicketType.includesHotel === false)
      throw paymentRequiredError();
  
    return gethotel;
}



async function getHotelId(hotelId: number, userId: number) {
  const hotel = await hotelRepository.getHotelByHotelId(hotelId);
  if(!hotel) throw notFoundError();

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();
  
  const ticketeTciketType = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticketeTciketType) throw notFoundError();
  
  if (ticketeTciketType.status !== TicketStatus.PAID) throw paymentRequiredError();
  
  if (ticketeTciketType.TicketType.isRemote === true || ticketeTciketType.TicketType.includesHotel === false)
    throw paymentRequiredError();

  return hotel;
}

const hotelService = {
  getHotels,
  getHotelId,
};

export default hotelService;
