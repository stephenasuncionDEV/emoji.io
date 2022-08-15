import { Text, Flex, HStack, Button, Modal, ModalOverlay, 
    ModalContent, ModalHeader, ModalFooter, ModalBody, 
    ModalCloseButton, VStack, Box, Tag, TagLabel, 
    TagRightIcon, Input, Wrap, Spinner
} from '@chakra-ui/react'
import { FC } from 'react'
import { FaSave } from 'react-icons/fa'
import { BiCopy } from 'react-icons/bi'
import { useUser } from '@/providers/UserProvider'
import { useCopy } from '@/hooks/useCopy'
import { useProfile } from '@/hooks/useProfile'

export interface ProfileProps {
    isProfileOpen: boolean,
    onProfileClose: () => void
}

const ProfileModal: FC<ProfileProps> = ({ isProfileOpen, onProfileClose }) => {
    const { user, setUser } = useUser();
    const [onCopy] = useCopy({
        message: 'Successfully copied user id',
        data: user._id
    })
    const { onSave, name, setName, email, setEmail, onSetEmoji, emoji, isSaving, isSetting } = useProfile({ user, setUser });

    return (
        <Modal onClose={onProfileClose} isOpen={isProfileOpen} isCentered size='lg'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontWeight='normal'>
                    User Profile
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody display='flex' gap='1.5em'>
                    <VStack>
                        <Box p='.5em' border='2px dashed rgb(200,200,200)' borderRadius='5px'>
                            {emoji ? (
                                <Text fontSize='48pt'>
                                    {emoji}
                                </Text>
                            ) : (
                                <Box p='1.25em'>
                                    <Spinner
                                        thickness='4px'
                                        speed='0.65s'
                                        emptyColor='gray.200'
                                        color='orange.500'
                                        size='xl'
                                    />
                                </Box>
                            )}
                        </Box>
                    </VStack>
                    <Flex flexDir='column' flex='1'>
                        <Flex justifyContent='flex-end'>
                            <HStack>
                                <Text fontSize='9pt'>
                                    ID
                                </Text>
                                <Tag justifyContent='space-between' size='sm' maxW='140px'>
                                    <TagLabel>
                                        {user?._id}
                                    </TagLabel>
                                    <TagRightIcon 
                                        cursor='pointer' 
                                        onClick={onCopy} 
                                        color='gray.400' 
                                        _hover={{
                                            color: 'gray.500'
                                        }}
                                    >
                                        <BiCopy fontSize='18pt' />
                                    </TagRightIcon>
                                </Tag>
                            </HStack>
                        </Flex>
                        <VStack>
                            <Input type='text' value={name} mt='1em' size='sm' onChange={(e) => setName(e.target.value)} />
                            <Input type='text' value={email} size='sm' onChange={(e) => setEmail(e.target.value)} disabled/>
                        </VStack>
                        <Text fontSize='10pt' mt='1.5em'>
                            Owned Emojis
                        </Text>
                        <Wrap spacing='.5em' mt='.5em'>
                            <Button 
                                size='sm' 
                                fontSize='12pt' 
                                variant='primary' 
                                onClick={() => onSetEmoji('🐀')} 
                                disabled={user?.player?.emoji === '🐀'}
                            >
                                🐀
                            </Button>
                            {user?.player?.emojiOwned?.map((emoji, idx) => (
                                <Button 
                                    size='sm' 
                                    fontSize='12pt' 
                                    variant='primary' 
                                    onClick={() => onSetEmoji(emoji)} 
                                    key={idx}
                                    disabled={user?.player?.emoji === emoji}
                                    isLoading={isSetting}
                                >
                                    {emoji}
                                </Button>
                            ))}
                        </Wrap>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <HStack>
                        <Button onClick={onProfileClose} size='sm'>
                            Cancel
                        </Button>
                        <Button 
                            onClick={onSave} 
                            size='sm' 
                            leftIcon={<FaSave />} 
                            variant='primary'
                            disabled={name === user?.name}
                            isLoading={isSaving}
                            loadingText='Saving'
                        >
                            Save
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ProfileModal