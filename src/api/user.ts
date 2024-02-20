import { SERVER_URL } from '@/config'
import { IGetValidationResponse, ILoginRequest, ILoginResponse, ISignupRequest } from '@/types'
import { QueryFunctionContext } from 'react-query'

export async function login(request: ILoginRequest): Promise<ILoginResponse> {
    const res = await fetch(`${SERVER_URL}/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { Authorization: `Bearer ${request.secret.clientToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request.body),
    })
    if (res.status === 401 || res.status === 404) {
        return res.json()
    } else if (!res.ok) {
        throw new Error('network response was not ok')
    }

    return res.json()
}

export async function signup(request: ISignupRequest): Promise<void> {
    const res = await fetch(`${SERVER_URL}/users/signup`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${request.secret.clientToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request.body),
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
}

export async function idValidation({ queryKey }: QueryFunctionContext<[string, string, string]>): Promise<IGetValidationResponse> {
    const [, id, secret] = queryKey

    const res = await fetch(`${SERVER_URL}/users/check-id/${id}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
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
        headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}
