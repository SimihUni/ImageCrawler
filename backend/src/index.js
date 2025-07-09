import 'dotenv/config'
import express from 'express';
import { CronJob } from 'cron';
import routerConf from './routerConfig.js';
import { checkRequiredENVs } from './helpers.js';
import db from './db/connection.js';

checkRequiredENVs(['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'])

await db.createPool();

let tick = true;

const job = CronJob.from({
	cronTime: '* * * * * *',
	onTick: function () {
		console.log(tick?'tick': 'tock');
        tick = !tick;
	},
	start: true,
	timeZone: process.env.TZ || 'Europe/Sofia'
});

const app = express();
const PORT = process.env.PORT || 3000;


app.use('/', routerConf);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});