import { Request } from 'express';
export declare type getProviderType = {
    nameCompany: string | null;
    fullName: string | null;
    position: string | null;
    companyDescription: string | null;
    bestProducts: string | null;
    siteCompany: string | null;
    phone: string | null;
    email: string | null;
};
export declare const getDataProvider: (req: Request) => Promise<getProviderType | undefined>;
