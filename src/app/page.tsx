'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

// TODO: redirect when client has jwt token
export default function Home() {
    const [isFullScreen, setIsFullScreen] = useState(false)
    useEffect(() => {
        const handleResize = () => {
            setIsFullScreen(window.innerWidth < 800)
        }
        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <main className="flex flex-row w-full min-h-full">
            <header className={`absolute z-50 banSelect text-3xl px-6 bg-transparent ${isFullScreen && 'text-white'}`}>
                <em className="text-[#c4b5fd]">Re</em>:memory
            </header>
            <div className={`relative h-full transition-all duration-300 p-2 ${isFullScreen ? 'hidden' : 'w-3/5'}`}>{/*TODO: make main image*/}</div>
            <div className={`relative z-30 flex flex-col banSelect min-w-96 p-5 bg-black ${isFullScreen ? 'w-full' : 'w-2/5'}`}>
                <div className="flex flex-col justify-center items-center h-4/5">
                    <div className="text-4xl mb-3 text-white">시작하기</div>
                    <div className="grid gap-x-3 gap-y-2 w-3/5 sm:grid-cols-2 sm:gap-y-0">
                        <Link className="rounded-lg text-xl px-5 py-2 text-center text-white bg-[#6942fa] hover:bg-[#492eaf]" href={'/auth/login'}>
                            <div>로그인</div>
                        </Link>
                        <Link className="rounded-lg text-xl px-5 py-2 text-center text-white bg-[#6942fa] hover:bg-[#492eaf]" href={'/auth/signup'}>
                            <div>회원가입</div>
                        </Link>
                    </div>
                </div>
                <div className="relative translate-y-full h-1/5 text-center text-gray-300">ⓒ github.com/yuchem2</div>
            </div>
        </main>
    )
}
