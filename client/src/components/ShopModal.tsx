import { Text, Flex, HStack, Button, Modal, ModalOverlay, 
    ModalContent, ModalHeader, ModalFooter, ModalBody, 
    ModalCloseButton, VStack, Wrap, Box, Center
} from '@chakra-ui/react'
import { FC } from 'react'
import { useUser } from '@/providers/UserProvider'
import { useShop, ShopCategoriesArr, ShopProductsArr, ProductDisplay, getProductCategory } from '@/hooks/useShop'
import { AiTwotoneShop } from 'react-icons/ai'
import { User } from '@/types/globals'

export interface ShopProps {
    isShopOpen: boolean,
    onShopClose: () => void
}


const Product: FC<ProductDisplay> = ({ user, product, onBuy, isBuying }) => {
    const category = getProductCategory(product);
    const isOwned = {
        shop_emoji: user?.player?.emojiOwned?.includes(product.emoji!),
        shop_color: user?.player?.nameColorOwned?.includes(product.nameColor!)
    }[category]

    return (
        <>
            {{
                shop_emoji: <Text fontSize='24pt'>{product.emoji}</Text>,
                shop_color: <Center p='.5em'><Box bg={product.nameColor} p='1em' /></Center>
            }[category]}
            <Button 
                size='sm' 
                variant='primary'
                onClick={() => onBuy(product)}
                disabled={isOwned || isBuying}
                isLoading={isBuying}
                loadingText='Buying'
            >
                Buy
            </Button>
        </>
    )
}

const ShopModal: FC<ShopProps> = ({ isShopOpen, onShopClose }) => {
    const { user, setUser } = useUser();
    const { 
        category: shopCategory, 
        setCategory, 
        onBuy, 
        isBuying
    } = useShop({ user, setUser });

    return (
        <Modal onClose={onShopClose} isOpen={isShopOpen} isCentered size='3xl'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontWeight='normal' py='.75em'>
                    <HStack>
                        <Text>
                            Shop
                        </Text>
                        <AiTwotoneShop />
                    </HStack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody display='flex' gap='2em'>
                    <VStack maxW='170px' flex='1'>
                        {ShopCategoriesArr?.map((category) => (
                            <Button 
                                variant='secondary' 
                                key={category.key} 
                                w='full'
                                onClick={() => setCategory(category.key)}
                                disabled={shopCategory === category.key}
                            >
                                {category.name}
                            </Button>
                        ))}
                    </VStack>
                    <Flex flexDir='column' flex='1'>
                        <Text fontWeight='bold'>
                            {shopCategory?.slice(shopCategory.indexOf('_') + 1)?.toUpperCase()}
                        </Text>
                        <Wrap mt='1em' h='280px'>
                            {ShopProductsArr[shopCategory].map((product, idx) => (
                                <VStack
                                    key={idx}
                                    flexDir='column'
                                    alignItems='center'
                                    borderRadius='5px'
                                    p='.5em'
                                    px='.75em'
                                    border='1px dashed rgba(0,0,0,.5)'
                                >
                                    <Product 
                                        product={product} 
                                        user={user} 
                                        onBuy={onBuy} 
                                        isBuying={isBuying}
                                    />
                                </VStack>
                            ))}
                        </Wrap>
                    </Flex>
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    )
}

export default ShopModal