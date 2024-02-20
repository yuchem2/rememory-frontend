import { IRequest } from './request'

export interface ILoginRequest extends IRequest {
    body: {
        provider: string
        id: string
        passwd: string
    }
}

export interface ISignupRequest extends IRequest {
    body: {
        provider: string
        id: string
        passwd: string
        nickname: string
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
