"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataProvider = void 0;
const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
const getDataProvider = (req) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    else {
        return undefined;
    }
});
exports.getDataProvider = getDataProvider;
