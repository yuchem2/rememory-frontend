import { IRequest } from './request'

export interface ILoginRequest extends IRequest {
    body: {
        provider: string
        id: string
        passwd: string
        iv: string
        tag: string
    }
}

export interface ISignupRequest extends IRequest {
    body: {
        provider: string
        id: string
        passwd: string
        nickname: string
        iv: string
        tag: string
    }
}

export interface ILogoutRequest extends IRequest {}

export interface ILoginResponse {
    nickname: string
    message?: string
}

export interface IGetValidationResponse {
    success: boolean
    message?: string
}
