import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getRSA } from '@/api/auth'
import { IGetRSAResponse } from '@/types'

export function useRSA(): string {
    const [client, setClient] = useState(false)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setClient(true)
        }
    }, [typeof window])

    const data =
        useQuery(['RSA', 'secret'], getRSA, {
            enabled: client,
            suspense: true,
            cacheTime: 1000 * 60 * 6,
            staleTime: 1000 * 60 * 6,
        })?.data || ({} as IGetRSAResponse)

    return data.key
}
