import { prisma } from '../../database/prisma';

export const userService = {
  async createUser(data: {
    employeeId: string;
    name: string;
    email: string;
    passwordHash: string;
    role: string;
  }) {
    return await prisma.user.create({
      data: {
        employeeId: data.employeeId,
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash,
        role: data.role,
        isActive: true
      }
    });
  },

  async getAllUsers() {
    return await prisma.user.findMany({
      orderBy: { name: 'asc' }
    });
  },

  async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: { id }
    });
  },

  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email }
    });
  },

  async getUserByEmployeeId(employeeId: string) {
    return await prisma.user.findUnique({
      where: { employeeId }
    });
  },

  async updateUser(id: number, data: {
    name?: string;
    email?: string;
    role?: string;
    isActive?: boolean;
  }) {
    return await prisma.user.update({
      where: { id },
      data
    });
  },

  async deleteUser(id: number) {
    return await prisma.user.delete({
      where: { id }
    });
  },

  async deactivateUser(id: number) {
    return await prisma.user.update({
      where: { id },
      data: { isActive: false }
    });
  },

  async activateUser(id: number) {
    return await prisma.user.update({
      where: { id },
      data: { isActive: true }
    });
  },

  async getActiveUsers() {
    return await prisma.user.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });
  }
};
