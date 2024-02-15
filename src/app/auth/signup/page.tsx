'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useMutation } from 'react-query'

import { ISignupRequest } from '@/types/user'
import { signup } from '@/api/user'
import { IdIcon, PasswdIcon, ShowIcon } from '@/icon'
import FormError from '@/components/form/formError'
import { IdValidation, NicknameValidation } from '@/components/form/validation'

interface Inputs {
    id: string
    passwd1: string
    passwd2: string
    nickname: string
}

export default function Page() {
    const [showPasswd1, setShowPasswd1] = useState(false)
    const [showPasswd2, setShowPasswd2] = useState(false)
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: { isSubmitting, errors },
    } = useForm<Inputs>()

    const errorMessages = [errors?.nickname?.message, errors?.id?.message, errors?.passwd1?.message, errors?.passwd2?.message]
    const router = useRouter()
    const mutation = useMutation({
        mutationFn: (request: ISignupRequest) => {
            return signup(request)
        },
        onSuccess: async () => {
            // TODO: change url
            router.push('/')
        },
    })

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        // TODO: passwd encryption
        // TODO: change provider
        if (data.passwd1 !== data.passwd2) {
            setError('passwd2', {
                type: 'manual',
                message: '비밀번호와 같게 입력해주세요.',
            })
        } else {
            const request: ISignupRequest = {
                body: {
                    provider: 'rememory',
                    id: data.id,
                    passwd: data.passwd1,
                    nickname: data.nickname,
                },
                secret: {
                    clientToken: 'secret',
                },
            }
            mutation.mutate(request)
        }
    }

    return (
        <div className="flex flex-col items-center w-1/3 h-full">
            <div className="border rounded border-gray-400 w-80 p-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="box-content p-2 pb-4 m-2">
                        <div className="border-t border-x rounded-t-lg border-gray-400 p-2">
                            <NicknameValidation inData={getValues('nickname')} setError={setError}>
                                <div className="w-5 pt-1 pe-1">
                                    <IdIcon />
                                </div>
                                <input
                                    id="sign/nickname"
                                    className="w-full"
                                    placeholder="닉네임"
                                    maxLength={30}
                                    {...register('nickname', {
                                        required: '닉네임을 입력해 주세요.',
                                        minLength: { value: 2, message: '닉네임은 2글자에서 8글자 사이여야 합니다.' },
                                        maxLength: { value: 8, message: '닉네임은 2글자에서 8글자 사이여야 합니다.' },
                                    })}
                                />
                            </NicknameValidation>
                        </div>
                        <div className="border-t border-x border-gray-400 p-2">
                            <IdValidation inData={getValues('id')} setError={setError}>
                                <div className="w-5 pt-1 pe-1">
                                    <IdIcon />
                                </div>
                                <input
                                    id="sign/id"
                                    className="w-full"
                                    placeholder="아이디"
                                    maxLength={30}
                                    {...register('id', {
                                        required: '아이디를 입력해 주세요.',
                                        minLength: { value: 3, message: '아이디는 3글자에서 8글자 사이여야 합니다.' },
                                        maxLength: { value: 8, message: '아이디는 3글자에서 8글자 사이여야 합니다.' },
                                    })}
                                />
                            </IdValidation>
                        </div>
                        <div className="flex flex-row border-t border-x border-gray-400 p-2">
                            <div className="w-5 pt-1 pe-1">
                                <PasswdIcon />
                            </div>
                            <input
                                id="sign/passwd1"
                                className="w-full"
                                type={showPasswd1 ? 'text' : 'password'}
                                placeholder="비밀번호"
                                maxLength={30}
                                {...register('passwd1', {
                                    required: '비밀번호를 입력해 주세요.',
                                    minLength: { value: 8, message: '비밀번호는 8글자에서 14글자 사이이여야 합니다.' },
                                    maxLength: { value: 14, message: '비밀번호는 8글자에서 14글자 사이여야 합니다.' },
                                })}
                            />
                            <button
                                className="w-5 text-gray-500"
                                onClick={() => {
                                    setShowPasswd1(!showPasswd1)
                                }}
                            >
                                <ShowIcon slash={showPasswd1} />
                            </button>
                        </div>
                        <div className="flex flex-row border rounded-b-lg border-gray-400 p-2">
                            <div className="w-5 pt-1 pe-1">
                                <PasswdIcon />
                            </div>
                            <input
                                id="sign/passwd2"
                                className="w-full"
                                type={showPasswd2 ? 'text' : 'password'}
                                placeholder="비밀번호 확인"
                                maxLength={30}
                                {...register('passwd2', { required: '비밀번호와 같게 입력해 주세요.' })}
                            />
                            <button
                                className="w-5 text-gray-500"
                                onClick={() => {
                                    setShowPasswd2(!showPasswd2)
                                }}
                            >
                                <ShowIcon slash={showPasswd2} />
                            </button>
                        </div>
                        {errorMessages &&
                            errorMessages.map((errorMessage, index) => {
                                if (errorMessage) {
                                    return <FormError key={`errorMessage${index}`} message={errorMessage} />
                                }
                            })}
                    </div>
                    <div className="px-2 m-2">
                        <button
                            type="submit"
                            className="border rounded text-2xl w-full p-1 text-white bg-[#c4b5fd] border-[#b0a2e3]"
                            disabled={isSubmitting}
                        >
                            회원가입
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
