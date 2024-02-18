'use client'

import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { httpOnlyTest } from '@/api/test'

export default function Home() {
    // TODO: make main page
    const [nickname, setNickname] = useState('')
    useQuery(['test'], httpOnlyTest, {
        enabled: !!nickname,
        retry: false,
        cacheTime: 0,
    })
    useEffect(() => {
        if (typeof window !== undefined) {
            setNickname(localStorage.getItem('nickname') || '')
        }
    }, [typeof window])

    return (
        <main>
            <div>fe rememory-frontend</div>
            {nickname && <div>{nickname}</div>}
        </main>
    )
}
