import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMutation } from 'react-query'
import { ILogoutRequest } from '@/types'
import { logout } from '@/api/user'

export default function Header() {
    const nickname = sessionStorage.getItem('nickname')
    const router = useRouter()
    const mutation = useMutation({
        mutationFn: (request: ILogoutRequest) => {
            return logout(request)
        },
        onSuccess: async () => {
            router.push('/')
            sessionStorage.clear()
        },
    })
    const logoutToggle = () => {
        const request: ILogoutRequest = {
            secret: {
                clientToken: 'secret',
            },
        }
        mutation.mutate(request)
    }

    return (
        <div className="absolute z-30 flex flex-row banSelect justify-between w-full my-2 px-4">
            <Link className="text-3xl" href={'/memories'}>
                <em className="text-[#c4b5fd]">Re</em>:memory
            </Link>
            <div className="flex flex-row items-end text-md">
                <div className="border-r px-2">{nickname}</div>
                <button className="px-2 text-gray-500 hover:text-black" onClick={logoutToggle}>
                    logout
                </button>
            </div>
        </div>
    )
}
