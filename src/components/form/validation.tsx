import { useState } from 'react'
import { Tooltip } from 'react-tooltip'
import { UseFormSetError } from 'react-hook-form'
import { useQuery } from 'react-query'
import { CheckIcon } from '@/icon'
import { idValidation, nicknameValidation } from '@/api/user'
import { IGetValidationResponse } from '@/types/user'

interface Inputs {
    id: string
    passwd1: string
    passwd2: string
    nickname: string
}

interface Props {
    children: React.ReactNode
    inData: string
    setError: UseFormSetError<Inputs>
}

export function NicknameValidation({ children, inData, setError }: Props) {
    const [send, onSend] = useState(false)
    const data =
        useQuery(['nicknameValidation', inData, 'secret'], nicknameValidation, {
            enabled: send && !!inData,
            cacheTime: 0,
        })?.data || ({} as IGetValidationResponse)

    if (send) {
        if (!data.success) {
            setError('nickname', {
                type: 'manual',
                message: data.message,
            })
        }
        onSend(false)
    }

    const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        onSend(true)
    }

    return (
        <div className="flex flex-row">
            {children}
            <button className="w-5 text-gray-500" data-tooltip-content="닉네임 중복 확인" data-tooltip-id="nickname/validation" onClick={onClick}>
                <CheckIcon />
            </button>
            <Tooltip id="nickname/validation" place="top" style={{ color: '#FFFFFF', backgroundColor: 'rgb(196, 181, 253)' }} />
        </div>
    )
}

export function IdValidation({ children, inData, setError }: Props) {
    const [send, onSend] = useState(false)
    const data =
        useQuery(['idValidation', inData, 'secret'], idValidation, {
            enabled: send && !!inData,
            cacheTime: 0,
        })?.data || ({} as IGetValidationResponse)

    if (send) {
        if (!data.success) {
            setError('nickname', {
                type: 'manual',
                message: data.message,
            })
        }
        onSend(false)
    }

    const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        onSend(true)
    }

    return (
        <div className="flex flex-row">
            {children}
            <button className="w-5 text-gray-500" data-tooltip-content="아이디 중복 확인" data-tooltip-id="id/validation" onClick={onClick}>
                <CheckIcon />
            </button>
            <Tooltip id="id/validation" place="top" style={{ color: '#FFFFFF', backgroundColor: 'rgb(196, 181, 253)' }} />
        </div>
    )
}
