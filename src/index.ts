import express from 'express';
import cors from 'cors';

require('dotenv').config(); // переменные из .env файла

const port = process.env.PORT ?? 3000;

export const app = express();
app.use(express.json());
app.use(cors());

// (async () => {
// 	try {
// 		await mongoose
// 			.connect(
// 				`${DB_PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${DB_URI}?${DB_QUERY_STRING}`
// 			)
// 			.then(() => {
// 				console.log('DB ok');
// 			})
// 			.catch((err) => {
// 				console.log(`DB error: ${err}`);
// 			});
// 	} catch (err) {
// 		console.log(err);
// 	}
// })();

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
