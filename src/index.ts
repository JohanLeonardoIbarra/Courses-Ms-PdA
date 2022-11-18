import mongoose from 'mongoose';
import config from 'Config/env';
import { Server } from 'Server/Server';

mongoose.connect(config.db_uri, () => {
  const app = new Server();
  app.init(config.port);
});
