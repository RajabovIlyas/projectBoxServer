import dotenv from 'dotenv';


dotenv.config();

export const PORT: number = process.env.PORT ? Number(process.env.PORT) : 5000;

export const projectUrl:string =process.env.PROJECT_URL ? process.env.PROJECT_URL : '';

export const MONGO_URI: string = process.env.MONGO_URI ? process.env.MONGO_URI : '';


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
  emailCompany: process.env.EMAIL_COMPANY ? process.env.EMAIL_COMPANY : '',
  login: process.env.EMAIL_LOGIN ? process.env.EMAIL_LOGIN : '',
  password: process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD : '',
  urlProjectBox: process.env.URL_PROJECT_BOX ? process.env.URL_PROJECT_BOX : '',
};

export const googleClient={
  id: process.env.CLIENT_ID_GOOGLE ? process.env.CLIENT_ID_GOOGLE : '',
  secret: process.env.CLIENT_SECRET_GOOGLE ? process.env.CLIENT_SECRET_GOOGLE : '',
};

export const facebookClient={
  id: process.env.CLIENT_ID_FACEBOOK ? process.env.CLIENT_ID_FACEBOOK : '',
  secret: process.env.CLIENT_SECRET_FACEBOOK ? process.env.CLIENT_SECRET_FACEBOOK : '',
};
