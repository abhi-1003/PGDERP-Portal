require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  baseURL: process.env.BASE_URL,
};