import { SERVER_URL } from '@/config'
import { IGetValidationResponse, ILoginRequest, ILoginResponse, ILogoutRequest, ISignupRequest } from '@/types/user'
import { QueryFunctionContext } from 'react-query'

export async function login(request: ILoginRequest): Promise<ILoginResponse> {
    const res = await fetch(`${SERVER_URL}/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { client: `Bearer ${request.secret.clientToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request.body),
    })
    if (!res.ok) {
        const body = await res.json()
        if (body.code === 600 || body.code === 601) {
            return body
        } else {
            throw new Error('network response was not ok')
        }
    }
    return res.json()
}

export async function signup(request: ISignupRequest): Promise<void> {
    const res = await fetch(`${SERVER_URL}/users/signup`, {
        method: 'POST',
        headers: { client: `Bearer ${request.secret.clientToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request.body),
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
}

export async function idValidation({ queryKey }: QueryFunctionContext<[string, string, string, string]>): Promise<IGetValidationResponse> {
    const [, id, provider, secret] = queryKey

    const res = await fetch(`${SERVER_URL}/users/check-id/${id}?provider=${provider}`, {
        method: 'GET',
        headers: { client: `Bearer ${secret}`, 'Content-Type': 'application/json' },
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}

export async function nicknameValidation({ queryKey }: QueryFunctionContext<[string, string, string]>): Promise<IGetValidationResponse> {
    const [, nickname, secret] = queryKey

    const res = await fetch(`${SERVER_URL}/users/check-nickname/${nickname}`, {
        method: 'GET',
        headers: { client: `Bearer ${secret}`, 'Content-Type': 'application/json' },
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}

export async function logout(request: ILogoutRequest): Promise<void> {
    const res = await fetch(`${SERVER_URL}/users/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: { client: `Bearer ${request.secret.clientToken}`, 'Content-Type': 'application/json' },
    })
    if (!res.ok) {
        const body = await res.json()
        if (body.code === 401) {
            throw new Error('user authorization has been compromised')
        } else {
            throw new Error(body.message)
        }
    }
}
