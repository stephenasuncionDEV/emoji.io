import { FC } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, 
    ModalFooter, ModalBody, ModalCloseButton, Center, Text, 
    Flex, Button, Link
} from '@chakra-ui/react'
import { GiBrokenBone } from 'react-icons/gi'

export interface DCModal {
    isDCModalOpen: boolean,
    onDCModalClose: () => void
}

export const DisconnectedModal: FC<DCModal> = ({ isDCModalOpen, onDCModalClose }) => {
    return (
        <Modal onClose={onDCModalClose} isOpen={isDCModalOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader />
                <ModalCloseButton />
                <ModalBody>
                    <Center>
                        <Flex flexDir='column' alignItems='center'>
                            <GiBrokenBone fontSize='36pt' />
                            <Text fontSize='24pt'>
                                Disconnected
                            </Text>
                            <Text fontSize='10pt'>
                                You had been disconnected from the server
                            </Text>
                            <Link href='/game' style={{ textDecoration: 'none' }}>
                                <Button variant='primary' size='sm' mt='1em'>
                                    Reconnect
                                </Button>
                            </Link>
                        </Flex>
                    </Center>
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    )
}