'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter()
    if (!sessionStorage.getItem('nickname')) {
        router.push('/')
    }
    return (
        <section className="flex flex-col w-full h-full bg-[#f0f0e1]">
            <Header />
            {/*TODO: make menu bar*/}
            {children}
        </section>
    )
}
