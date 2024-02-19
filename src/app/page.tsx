'use client'

import { useEffect, useState } from 'react'

export default function Home() {
    // TODO: make main page
    const [nickname, setNickname] = useState('')
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
