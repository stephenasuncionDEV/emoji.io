import { FC, MutableRefObject, Dispatch, SetStateAction, CSSProperties } from 'react'
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerContent, 
    DrawerCloseButton, Button, Input, Tag, TagLabel, InputGroup, 
    InputRightElement, Text, HStack, Box
} from '@chakra-ui/react'
import { Message } from '@/types/globals'
import Filler from '@/components/Filler'
import { VariableSizeList } from 'react-window'

export interface ChatModalProps {
    chatMessagesRef: MutableRefObject<HTMLElement>;
    isSending: boolean;
    sendMessage: () => void;
    messageInput: string;
    setMessageInput: Dispatch<SetStateAction<string>>;
    messages: Message[];
    setMessages: Dispatch<SetStateAction<Message[]>>;
    isChatOpen: boolean;
    onChatClose: () => void;
}

export interface ChatRowProps {
    index: number;
    style: CSSProperties;
    data: {
        messages: Array<Message>
    }
}

const Row: FC<ChatRowProps> = ({ index, style, data } ) => {
    const currentMsg = data.messages[index];
    const { author, message, isVerified } = currentMsg;

    return (
        <HStack key={index} style={style} flex='1' alignItems='flex-start'>
            <Text style={{ color: isVerified ? 'rgb(245, 78, 0)' : 'black', fontWeight: isVerified ? 'bold' : 'normal'}}>
                {author}
            </Text>
            <Box wordBreak='break-all' justifySelf='flex-start'>
                <Text>
                    {message}
                </Text>
            </Box>
        </HStack>
    )
}

const getItemSize: ((index: number, messages: Array<Message>) => number) = (index, messages) => {
    const { author, message } = messages[index];

    const CHAR_WIDTH = 10.1142857143;
    const maxChatWidth = 255 - (author.length * CHAR_WIDTH) - 8;
    const maxCharPerLine = maxChatWidth / CHAR_WIDTH;
    const lineCount = Math.floor((message.length / maxCharPerLine) + 1);
    const height = lineCount * 24;

    return height;
} 

const ChatModal: FC<ChatModalProps> = ({ 
    chatMessagesRef, 
    isSending, 
    sendMessage, 
    messageInput, 
    setMessageInput, 
    messages, 
    setMessages, 
    isChatOpen, 
    onChatClose 
}) => {

    return (
        <Drawer
            isOpen={isChatOpen}
            placement='right'
            onClose={onChatClose}
        >
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader display='flex' alignItems='center' gap={4}>
                    Chat
                    <Tag>
                        <TagLabel>
                            Server: Global
                        </TagLabel>
                    </Tag>
                </DrawerHeader>
                <DrawerBody>
                    <Filler>
                        {({ width, height }) => (
                            <VariableSizeList
                                width={width}
                                height={height}
                                itemSize={(index) => getItemSize(index, messages)} 
                                itemCount={messages?.length} 
                                itemData={{ messages }}
                                outerRef={chatMessagesRef}
                            >
                                {Row}
                            </VariableSizeList>
                        )}
                    </Filler>
                </DrawerBody>
                <DrawerFooter>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type='text'
                            placeholder='Type here...'
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button 
                                h='1.75rem' 
                                size='sm' 
                                disabled={isSending}
                                isLoading={isSending}
                                loadingText='Sending'
                                onClick={sendMessage}
                            >
                                Send
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default ChatModal