import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      id: faker.datatype.number(),
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    }
  });
}

export async function createRoom(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: faker.datatype.number({ min: 1, max: 5 }),
      hotelId,
    }
  });
}