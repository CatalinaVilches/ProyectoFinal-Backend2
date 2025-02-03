import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || 8080,

    urlMongo: process.env.URL_MONGO,

    mailService: process.env.MAIL_SERVICE,
    mailPort: process.env.MAIL_PORT,
    mailFrom: process.env.MAIL_FROM,
    mailPass: process.env.MAIL_PASS
};
