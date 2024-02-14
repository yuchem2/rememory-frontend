import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

interface Inputs {
    id: string
    passwd: string
}

export default function Page() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<Inputs>()
    const errorMessage: string | undefined = errors?.id?.message || errors?.passwd?.message

    const mutation = useMutation()


    return <div>Hello</div>
}
