import express from 'express';
import connectMongo from './config/db';
import routes from './routes';
import config from './config/config';

connectMongo();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routes);

app.listen(config.port, () => { console.log(`server running on port ${config.port}`); });

export default app;
