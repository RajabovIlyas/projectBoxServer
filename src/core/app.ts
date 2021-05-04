import dotenv from 'dotenv';


dotenv.config();

export const PORT: number = process.env.PORT ? Number(process.env.PORT) : 5000;

export const MONGO_URI: string = process.env.MONGO_URI ? process.env.MONGO_URI :
    'mongodb+srv://root:root@beautysalon.hsvsc.mongodb.net/projectboxpro?retryWrites=true&w=majority';


export const secret:string =process.env.JWT_SECRET ? process.env.JWT_SECRET : '/78"5ad^V62q6oM6sn`k?cIN"|JF%d';

export const tokens={
  access: {
    type: process.env.TOKEN_ACCESS_TYPE ? process.env.TOKEN_ACCESS_TYPE : 'access',
    expiresIn: process.env.TOKEN_ACCESS_EXPIRESS_IN ? process.env.TOKEN_ACCESS_EXPIRESS_IN : '30m',
  },
  refresh: {
    type: process.env.TOKEN_REFRESH_TYPE ? process.env.TOKEN_REFRESH_TYPE : 'refresh',
    expiresIn: process.env.TOKEN_REFRESH_EXPIRESS_IN ? process.env.TOKEN_REFRESH_EXPIRESS_IN : '50m',
  },
};

export const sendMessageData={
  login: process.env.EMAIL_LOGIN ? process.env.EMAIL_LOGIN : '',
  password: process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD : '',
};
