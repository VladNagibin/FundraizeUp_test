import mongoose from 'mongoose';

import { config } from '../config';

(async () => {
  await mongoose.connect(config.connectionUri, { autoIndex: true });
  console.log('connected to database');
})();
