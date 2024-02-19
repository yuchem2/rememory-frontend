export interface ILoginRequest {
    body: {
        provider: string
        id: string
        passwd: string
    }
    secret: {
        clientToken: string
    }
}

export interface ISignupRequest {
    body: {
        provider: string
        id: string
        passwd: string
        nickname: string
    }
    secret: {
        clientToken: string
    }
}

export interface ILoginResponse {
    nickname: string
    message?: string
}

export interface IGetValidationResponse {
    success: boolean
    message?: string
}
