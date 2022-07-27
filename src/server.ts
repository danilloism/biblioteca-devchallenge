import { app } from './app';

async function startServer() {
  const server = await app();
  const port = process.env['PORT'] || 8080;
  const host = process.env['HOST'] || 'localhost';

  server.listen({ port: +port, host: host }, (err, address) => {
    if (err) {
      server.log.error(err);
      server.close(() => {
        server.log.info('Fechando o servidor.');
      });

      process.exitCode = 1;
    }

    server.log.info(`Server iniciado em ${address}`);
  });
}

startServer();
