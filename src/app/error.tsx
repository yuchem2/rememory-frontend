'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="text-center">
            <h2>{error.message || 'Something went wrong!'}</h2>
            <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                home
            </button>
        </div>
    )
}
