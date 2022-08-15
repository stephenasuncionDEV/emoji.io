import { useToast } from '@chakra-ui/react'

export interface CopyProps {
    message: string
    data: string
}

export const useCopy = ({ message, data }: CopyProps) => {
    const toast = useToast({
        position: 'bottom',
        duration: 3000,
        title: 'Success',
        description: `Successfully copied ${message}`,
        status: 'success'
    })

    const onCopy = async () => {
        await navigator.clipboard.writeText(data);
        toast();
    }

    return [onCopy]
}