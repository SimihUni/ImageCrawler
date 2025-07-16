import 'dotenv/config'
import express from 'express';
import { CronJob } from 'cron';
import routerConf from './src/routerConfig.js';
import { checkRequiredENVs } from './src/helpers.js';
import db from './src/db/connection.js';
import cors from 'cors';

checkRequiredENVs(['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'])

await db.createPool();

// let tick = true;

// const job = CronJob.from({
// 	cronTime: '0 * * * * *',
// 	onTick: function () {
// 		console.log(tick?'tick': 'tock');
//         tick = !tick;
// 	},
// 	start: true,
// 	timeZone: process.env.TZ || 'Europe/Sofia'
// });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.urlencoded({ extended: true }));
app.use('/', routerConf);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});