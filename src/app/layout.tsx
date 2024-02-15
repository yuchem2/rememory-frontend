'use client'

import { QueryClient, QueryClientProvider } from 'react-query'

import './globals.css'
import 'react-tooltip/dist/react-tooltip.css'

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                suspense: true,
            },
            mutations: {
                useErrorBoundary: true,
                retry: 1,
            },
        },
    })
    return (
        <html lang="ko">
            <head>
                <title>Re:memory</title>
            </head>
            <body>
                <QueryClientProvider client={queryClient}>
                    {/*TODO: make header*/}
                    <div className="flex flex-row p-2">{children}</div>
                </QueryClientProvider>
            </body>
        </html>
    )
}
