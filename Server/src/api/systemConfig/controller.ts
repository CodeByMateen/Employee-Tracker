import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { systemConfigService } from './services';

export default async function systemConfigRoutes(fastify: FastifyInstance) {
  // Initialize system configuration with default values
  fastify.post('/initialize', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const result = await systemConfigService.initializeSystemConfig();
      return reply.status(201).send({
        success: true,
        message: 'System configuration initialized successfully',
        data: result
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to initialize system configuration'
      });
    }
  });

  // Get all system configuration
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const configs = await systemConfigService.getAllConfigs();
      return reply.send({
        success: true,
        data: configs
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to fetch system configuration'
      });
    }
  });

  // Update a specific configuration
  fastify.put('/:key', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { key } = request.params as { key: string };
      const { value } = request.body as { value: string };
      
      const updated = await systemConfigService.updateConfig(key, value);
      return reply.send({
        success: true,
        message: 'Configuration updated successfully',
        data: updated
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to update configuration'
      });
    }
  });

  // Get a specific configuration by key
  fastify.get('/:key', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { key } = request.params as { key: string };
      const config = await systemConfigService.getConfig(key);
      
      if (!config) {
        return reply.status(404).send({
          success: false,
          error: 'Configuration not found'
        });
      }

      return reply.send({
        success: true,
        data: config
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Failed to fetch configuration'
      });
    }
  });
}
