import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { userService } from './services';
import bcrypt from 'bcryptjs';

export default async function userRoutes(fastify: FastifyInstance) {
  // Create user (including admin)
  fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { employeeId, name, email, password, role } = request.body as {
        employeeId: string;
        name: string;
        email: string;
        password: string;
        role?: string;
      };

      // Hash password
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const result = await userService.createUser({
        employeeId,
        name,
        email,
        passwordHash,
        role: role || 'employee'
      });

      return reply.status(201).send({
        success: true,
        message: 'User created successfully',
        data: {
          id: result.id,
          employeeId: result.employeeId,
          name: result.name,
          email: result.email,
          role: result.role,
          isActive: result.isActive
        }
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to create user'
      });
    }
  });

  // Create admin user specifically
  fastify.post('/admin', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const adminData = {
        employeeId: 'ADMIN001',
        name: 'System Administrator',
        email: 'admin@corvitlabs.com',
        password: 'admin123',
        role: 'admin'
      };

      // Hash password
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(adminData.password, saltRounds);

      const result = await userService.createUser({
        employeeId: adminData.employeeId,
        name: adminData.name,
        email: adminData.email,
        passwordHash,
        role: adminData.role
      });

      return reply.status(201).send({
        success: true,
        message: 'Admin user created successfully',
        data: {
          id: result.id,
          employeeId: result.employeeId,
          name: result.name,
          email: result.email,
          role: result.role,
          isActive: result.isActive
        }
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to create admin user'
      });
    }
  });

  // Get all users
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const users = await userService.getAllUsers();
      return reply.send({
        success: true,
        data: users.map(user => ({
          id: user.id,
          employeeId: user.employeeId,
          name: user.name,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          createdAt: user.createdAt
        }))
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to fetch users'
      });
    }
  });

  // Get user by ID
  fastify.get('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string };
      const user = await userService.getUserById(parseInt(id));

      if (!user) {
        return reply.status(404).send({
          success: false,
          error: 'User not found'
        });
      }

      return reply.send({
        success: true,
        data: {
          id: user.id,
          employeeId: user.employeeId,
          name: user.name,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          createdAt: user.createdAt
        }
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to fetch user'
      });
    }
  });

  // Update user
  fastify.put('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string };
      const { name, email, role, isActive } = request.body as {
        name?: string;
        email?: string;
        role?: string;
        isActive?: boolean;
      };

      const updated = await userService.updateUser(parseInt(id), {
        name,
        email,
        role,
        isActive
      });

      return reply.send({
        success: true,
        message: 'User updated successfully',
        data: {
          id: updated.id,
          employeeId: updated.employeeId,
          name: updated.name,
          email: updated.email,
          role: updated.role,
          isActive: updated.isActive
        }
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to update user'
      });
    }
  });

  // Delete user
  fastify.delete('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string };
      await userService.deleteUser(parseInt(id));

      return reply.send({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to delete user'
      });
    }
  });
}
