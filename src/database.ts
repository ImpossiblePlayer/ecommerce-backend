import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

export class Database {
	static connect = async () => {
		await mongoose
			.connect(process.env.DATABASE_URL)
			.then(() => {
				console.log('DB ok');
			})
			.catch((err) => {
				console.log(`DB error: ${err}`);
			});
	};
}
