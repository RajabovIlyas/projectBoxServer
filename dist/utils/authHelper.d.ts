export declare const generateAccessToken: () => {
    id: string;
    token: string;
};
export declare const replaceDbToken: (tokenId: string, userId: string) => void;
export declare const generateToken: (userId: string) => Promise<string>;
export declare const findToken: (tokenId: string) => Promise<import("../models/Token").IToken | null>;
export declare const removeToken: (tokenId: string) => Promise<import("../models/Token").IToken | null>;
