import { Message } from '@/types/globals'
import { useState, useEffect, useRef, MutableRefObject } from 'react'
import { useToast } from '@chakra-ui/react'
import { useUser } from '@/providers/UserProvider'
import { Socket } from 'socket.io-client'

export interface ChatProps {
    socket: Socket
}

export const useChat = ({ socket }: ChatProps) => {
    const toast = useToast({
        title: 'Error',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom'
    });
    const chatMessagesRef = useRef() as MutableRefObject<HTMLElement>;
    const [isSending, setIsSending] = useState<boolean>(false);
    const [messageInput, setMessageInput] = useState<string>('');
    const [messages, setMessages] = useState<Array<Message>>([]);
    const { user } = useUser();

    useEffect((): any => {
        socket.on('receive-message', (messageData: Message) => {
            let newMessages = [...messages];
            newMessages.push(messageData);
            setMessages(newMessages);
        });
        return () => socket.off('receive-message')
    }, [messages])

    useEffect(() => {
        if (!chatMessagesRef.current) return;
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }, [messages])

    const sendMessage = () => {
        try {
            if (!messageInput.trim().length) return;
            if (messageInput.trim().length > 200) throw new Error('Max message length is 200 characters');

            setIsSending(true);

            const messageData: Message = {
                author: user.name,
                message: messageInput,
                color: user.player.nameColor,
                isVerified: false,
                user
            }

            socket.emit('send-message', messageData);
            
            setMessageInput('');
            setIsSending(false);
        }
        catch (err: any) {
            setIsSending(false);
            console.error(err);
            let msg = 'Something wrong occured';
            if (err.response) msg = err.response.data.message
            else if (err.request)  msg = err.request.data.message
            else msg = err.message
            toast({
                description: msg
            })
        }
    }

    return {
        chatMessagesRef,
        isSending,
        sendMessage,
        messageInput,
        setMessageInput,
        messages,
        setMessages
    }
}