/**
 * Vercel serverless entry point.
 *
 * server.ts builds the Express app and exports it; it only calls listen() when
 * run directly. Mounting it here gives Vercel one function that serves /api/*.
 */
import app from '../server.js';

export default app;
