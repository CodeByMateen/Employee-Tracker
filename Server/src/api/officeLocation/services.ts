import { prisma } from '../../database/prisma';

export const officeLocationService = {
  async createOfficeLocation(data: {
    name: string;
    latitude: number;
    longitude: number;
    radiusMeters: number;
  }) {
    return await prisma.officeLocation.create({
      data: {
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        radiusMeters: data.radiusMeters
      }
    });
  },

  async getAllOfficeLocations() {
    return await prisma.officeLocation.findMany({
      orderBy: { name: 'asc' }
    });
  },

  async getOfficeLocationById(id: number) {
    return await prisma.officeLocation.findUnique({
      where: { id }
    });
  },

  async updateOfficeLocation(id: number, data: {
    name?: string;
    latitude?: number;
    longitude?: number;
    radiusMeters?: number;
  }) {
    return await prisma.officeLocation.update({
      where: { id },
      data
    });
  },

  async deleteOfficeLocation(id: number) {
    return await prisma.officeLocation.delete({
      where: { id }
    });
  },

  async getDefaultOfficeLocation() {
    return await prisma.officeLocation.findFirst({
      orderBy: { id: 'asc' }
    });
  }
};
