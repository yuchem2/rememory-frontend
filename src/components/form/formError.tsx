interface Props {
    message: string | undefined
}

export default function FormError({ message }: Props) {
    if (message) {
        return (
            <div className="relative text-sm px-1 text-[#fb896b]" role="alert">
                <em className="banSelect">• </em>
                <strong className="font-bold">{message}</strong>
            </div>
        )
    }
}
