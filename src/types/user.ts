export interface ILoginRequest {
    body: {
        provider: string
        id: string
        passwd: string
    }
    secret: {
        token: string
    }
}

export interface ILoginResponse {
    jwt: string
    nickname: string
}
