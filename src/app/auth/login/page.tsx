'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useRouter } from 'next/navigation'
import { ILoginRequest } from '@/types/user'
import { login } from '@/api/user'
import { IdIcon, PasswdIcon, ShowIcon } from '@/icon'
import Link from 'next/link'
import FormError from '@/components/form/formError'

interface Inputs {
    id: string
    passwd: string
}

export default function Page() {
    const [showPasswd, setShowPasswd] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<Inputs>()
    const errorMessage: string | undefined = errors?.id?.message || errors?.passwd?.message
    const router = useRouter()
    const mutation = useMutation({
        mutationFn: (request: ILoginRequest) => {
            return login(request)
        },
        onSuccess: async () => {
            // TODO: change url
            router.push('/')
        },
    })

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        // TODO: passwd encryption
        // TODO: change provider
        const request: ILoginRequest = {
            body: {
                provider: 'rememory',
                id: data.id,
                passwd: data.passwd,
            },
            secret: {
                clientToken: 'secret',
            },
        }
        mutation.mutate(request)
    }

    return (
        <div className="flex flex-col items-center w-1/3 h-full">
            <div className="border rounded border-gray-400 w-80 p-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="box-content p-2 pb-4 m-2">
                        <div className="flex flex-row border rounded-t-lg border-gray-400 p-2">
                            <div className="w-5 pt-1 pe-1">
                                <IdIcon />
                            </div>
                            <input
                                id="login/id"
                                className="w-full"
                                placeholder="아이디"
                                maxLength={30}
                                {...register('id', { required: '아이디를 입력해 주세요.' })}
                            />
                        </div>
                        <div className="flex flex-row border-b border-s border-e rounded-b-lg border-gray-400 p-2">
                            <div className="w-5 pt-1 pe-1">
                                <PasswdIcon />
                            </div>
                            <input
                                id="login/passwd"
                                className="w-full"
                                type={showPasswd ? 'text' : 'password'}
                                placeholder="비밀번호"
                                maxLength={30}
                                {...register('passwd', {
                                    required: '비밀번호를 입력해 주세요.',
                                })}
                            />
                            <button
                                className="w-5 text-gray-500"
                                onClick={() => {
                                    setShowPasswd(!showPasswd)
                                }}
                            >
                                <ShowIcon slash={showPasswd} />
                            </button>
                        </div>
                        <FormError message={errorMessage} />
                    </div>
                    <div className="px-2 m-2">
                        <button
                            type="submit"
                            className="border rounded text-2xl w-full p-1 text-white bg-[#c4b5fd] border-[#b0a2e3]"
                            disabled={isSubmitting}
                        >
                            로그인
                        </button>
                    </div>
                </form>
            </div>
            {/*TODO: make authorization login*/}
            <div className="flex flex-row text-gray-500 pt-2">
                <Link href="/auth/signup">회원가입</Link>
            </div>
        </div>
    )
}
