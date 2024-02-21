'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { ILoginRequest } from '@/types/user'
import { login } from '@/api/user'
import { IdIcon, PasswdIcon, ShowIcon } from '@/icon'
import FormError from '@/components/form/formError'
import { useRSA } from '@/hooks'
import { encryptPasswd } from '@/services/auth'

interface Inputs {
    id: string
    passwd: string
}

export default function Page() {
    const [showPasswd, setShowPasswd] = useState(false)
    const [queryError, setQueryError] = useState('')
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
        onSuccess: async data => {
            if (data.message) {
                setQueryError('아이디가 존재하지 않거나 비밀번호가 틀렸습니다')
            } else {
                // TODO: change url
                sessionStorage.setItem('nickname', data.nickname)
                router.push('/')
            }
        },
        retry: false,
    })
    const [secret, target] = useRSA()
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        // TODO: change provider
        const encryptData = encryptPasswd(secret, target, data.passwd)
        const request: ILoginRequest = {
            body: {
                provider: 'rememory',
                id: data.id,
                passwd: encryptData.encrypted,
                iv: encryptData.iv,
                tag: encryptData.tag,
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
                            <i className="w-5 pt-1 pe-1">
                                <IdIcon />
                            </i>
                            <input
                                id="login/id"
                                className="w-full"
                                placeholder="아이디"
                                maxLength={30}
                                {...register('id', { required: '아이디를 입력해 주세요.' })}
                            />
                        </div>
                        <div className="flex flex-row border-b border-s border-e rounded-b-lg border-gray-400 p-2">
                            <i className="w-5 pt-1 pe-1">
                                <PasswdIcon />
                            </i>
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
                            <i
                                className="cursor-pointer w-5 pt-1 text-gray-500"
                                onClick={() => {
                                    setShowPasswd(!showPasswd)
                                }}
                            >
                                <ShowIcon slash={showPasswd} />
                            </i>
                        </div>
                        <FormError message={errorMessage} />
                        <FormError message={queryError} />
                    </div>
                    <div className="px-2 m-2">
                        <button
                            type="submit"
                            className="banSelect border rounded text-2xl w-full p-1 text-white bg-[#c4b5fd] border-[#b0a2e3]"
                            disabled={isSubmitting}
                        >
                            로그인
                        </button>
                    </div>
                </form>
            </div>
            {/*TODO: make authorization login*/}
            <div className="banSelect flex flex-row text-gray-500 pt-2">
                <Link href="/auth/signup">회원가입</Link>
            </div>
        </div>
    )
}
