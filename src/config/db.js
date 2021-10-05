import mongoose from 'mongoose';
import config from './config';

mongoose.Promise = Promise;

mongoose.connection.on('connected', () => {
  console.log('MongoDB Connection Established');
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB Connection Reestablished');
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB Connection Disconnected');
});

mongoose.connection.on('close', () => {
  console.log('MongoDB Connection Closed');
});

mongoose.connection.on('error', (error) => {
  console.log(`MongoDB ERROR ${error}`);
  process.exit(1);
});

mongoose.set('debug', true);
const connectMongo = async () => {
  const connectionuri = `mongodb://${config.host}:${config.db_port}/${config.database}`;
  await mongoose.connect(connectionuri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectMongo;
