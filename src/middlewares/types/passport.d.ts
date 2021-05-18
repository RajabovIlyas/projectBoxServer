
export type verifyType = {
    userId: string,
    type: string,
    iat: number,
    exp: number
}

export type verifyRefreshType = {
    id: string,
    type: string,
    iat: number,
    exp: number
}

export type payloadType={
    id:string;
    type:string
}
