/** Common config for message.ly */

// read .env files and make environmental variables

require("dotenv").config();

const DB_URI = process.env.NODE_ENV === "test" ? process.env.TEST_DB_URL : process.env.DB_URL;

const SECRET_KEY = process.env.SECRET_KEY || "secret";

const BCRYPT_WORK_FACTOR = Number(process.env.BCRYPT_WORK_FACTOR) || 12;

const PORT = process.env.PORT || 3000;

module.exports = {
	DB_URI,
	SECRET_KEY,
	BCRYPT_WORK_FACTOR,
	PORT,
};
