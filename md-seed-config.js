import mongoose from 'mongoose';
import config from './src/config/config';
import AdminSeeder from './src/seeders/admin.seeder';

const mongoURL = process.env.MONGO_URL || `mongodb://${config.host}:${config.db_port}/${config.database}`;

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
export const seedersList = {
  AdminSeeder,
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
export const connect = async () => mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
export const dropdb = async () => mongoose.connection.db.dropDatabase();
