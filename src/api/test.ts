import { SERVER_URL } from '@/config'

export async function httpOnlyTest() {
    const res = await fetch(`${SERVER_URL}/test/cookie`, {
        method: 'GET',
        credentials: 'include',
    })

    if (!res.ok) {
        throw new Error('network response was not ok')
    }
}
