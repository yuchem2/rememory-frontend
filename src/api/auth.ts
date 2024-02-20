import { SERVER_URL } from '@/config'
import { IGetRSAResponse } from '@/types/auth'
import { QueryFunctionContext } from 'react-query'

export async function getRSA({ queryKey }: QueryFunctionContext<[string, string]>): Promise<IGetRSAResponse> {
    const [, secret] = queryKey
    const res = await fetch(`${SERVER_URL}/auth/rsa`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
    })
    if (!res.ok) {
        throw new Error('network response was not ok')
    }
    return res.json()
}
