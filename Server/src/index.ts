import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import dotenv from "dotenv";
import { prisma } from "./database/prisma";

// Load environment variables
dotenv.config();

// Import routes
import userRoutes from './api/users/controller';
import officeLocationRoutes from './api/officeLocation/controller';
import systemConfigRoutes from "./api/systemConfig/controller";

// Create Fastify instance
const fastify = Fastify({
  logger: {
    level: process.env.NODE_ENV === "development" ? "info" : "warn",
    // prettyPrint: process.env.NODE_ENV === 'development'
  },
});

// Register plugins
fastify.register(cors, {
  origin: true,
  credentials: true,
});

fastify.register(helmet);

fastify.register(rateLimit, {
  max: 100,
  timeWindow: "1 minute",
});

// Swagger documentation
fastify.register(swagger, {
  swagger: {
    info: {
      title: "Attendance Tracker API",
      description: "Employee Attendance Tracking System API",
      version: "1.0.0",
    },
    host: "localhost:3000",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
});

fastify.register(swaggerUi, {
  routePrefix: "/docs",
});

// Register routes
fastify.register(userRoutes, { prefix: '/api/users' });
fastify.register(officeLocationRoutes, { prefix: '/api/office-locations' });
fastify.register(systemConfigRoutes, { prefix: "/api/system-config" });

// Health check endpoint
fastify.get("/health", async (request, reply) => {
  return { status: "OK", timestamp: new Date().toISOString() };
});

// Graceful shutdown
const gracefulShutdown = async () => {
  fastify.log.info("Shutting down gracefully...");
  await fastify.close();
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

// Start server
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || "3000");
    const host = process.env.HOST || "0.0.0.0";

    await fastify.listen({ port, host });
    fastify.log.info(`Server listening on ${host}:${port}`);
    fastify.log.info(
      `API Documentation available at http://${host}:${port}/docs`
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
