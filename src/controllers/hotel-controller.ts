import { AuthenticatedRequest } from "@/middlewares";
import hotelService from "@/services/hotel-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function showHotel(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const hotel = await hotelService.getHotels(userId);

    return res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    if (error.name === "NotFoundError") {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      if (error.name === "PaymentRequiredError") {
        return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
      }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function showHotelId(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;
  const userId = +req.userId;

  try {
    const hotel = await hotelService.getHotelId(+hotelId, userId);
    return res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "PaymentRequiredError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
  }
}