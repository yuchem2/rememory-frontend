'use client'

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <section className="flex flex-col justify-center items-center w-full h-full">
            <header className="text-5xl m-2 pt-20 h-48">
                <em className="text-[#c4b5fd]">Re</em>:memory
            </header>
            {children}
        </section>
    )
}
