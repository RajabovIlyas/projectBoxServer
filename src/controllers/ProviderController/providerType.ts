import {Request, Response} from 'express';

const validateEmail=(email:string|undefined):boolean=> {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export type getProviderType={
    nameCompany: string | null,
    fullName:string | null,
    position: string | null,
    companyDescription: string | null,
    bestProducts: string | null,
    siteCompany: string | null,
    phone: string | null,
    email: string | null,
};

export const getDataProvider = async (req: Request): Promise<getProviderType | undefined> => {
  if (validateEmail(req.body.email)) {
    return {
      nameCompany: req.body.nameCompany,
      fullName: req.body.fullName,
      position: req.body.position,
      companyDescription: req.body.companyDescription,
      bestProducts: req.body.bestProducts,
      siteCompany: req.body.siteCompany,
      phone: req.body.phone,
      email: req.body.email.toLowerCase(),
    };
  } else {
    return undefined;
  }
};
