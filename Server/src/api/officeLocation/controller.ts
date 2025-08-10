import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { officeLocationService } from './services';

export default async function officeLocationRoutes(fastify: FastifyInstance) {
  // Create office location
  fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { name, latitude, longitude, radiusMeters } = request.body as {
        name: string;
        latitude: number;
        longitude: number;
        radiusMeters?: number;
      };

      const result = await officeLocationService.createOfficeLocation({
        name,
        latitude,
        longitude,
        radiusMeters: radiusMeters || 100
      });

      return reply.status(201).send({
        success: true,
        message: 'Office location created successfully',
        data: result
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to create office location'
      });
    }
  });

  // Get all office locations
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const locations = await officeLocationService.getAllOfficeLocations();
      return reply.send({
        success: true,
        data: locations
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to fetch office locations'
      });
    }
  });

  // Get office location by ID
  fastify.get('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string };
      const location = await officeLocationService.getOfficeLocationById(parseInt(id));

      if (!location) {
        return reply.status(404).send({
          success: false,
          error: 'Office location not found'
        });
      }

      return reply.send({
        success: true,
        data: location
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to fetch office location'
      });
    }
  });

  // Update office location
  fastify.put('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string };
      const { name, latitude, longitude, radiusMeters } = request.body as {
        name?: string;
        latitude?: number;
        longitude?: number;
        radiusMeters?: number;
      };

      const updated = await officeLocationService.updateOfficeLocation(parseInt(id), {
        name,
        latitude,
        longitude,
        radiusMeters
      });

      return reply.send({
        success: true,
        message: 'Office location updated successfully',
        data: updated
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to update office location'
      });
    }
  });

  // Delete office location
  fastify.delete('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string };
      await officeLocationService.deleteOfficeLocation(parseInt(id));

      return reply.send({
        success: true,
        message: 'Office location deleted successfully'
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to delete office location'
      });
    }
  });
}
