import Fastify from 'fastify';
import autoLoad from '@fastify/autoload';
import { join } from 'path';

const start = async () => {
  const server = Fastify({ logger: true });

  server.register(autoLoad, { dir: join(__dirname, 'plugins') });
  server.register(autoLoad, { dir: join(__dirname, 'rotas') });

  server.listen({ port: 8080 }, (err, address) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }

    server.log.info(`Server iniciado em ${address}`);
  });
};

start();
