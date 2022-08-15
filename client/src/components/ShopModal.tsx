import { Text, Flex, HStack, Button, Modal, ModalOverlay, 
    ModalContent, ModalHeader, ModalFooter, ModalBody, 
    ModalCloseButton, VStack, Wrap, Box, Center
} from '@chakra-ui/react'
import { FC } from 'react'
import { useShop, ShopCategoriesArr, ShopProductsArr, ProductDisplay } from '@/hooks/useShop'
import { AiTwotoneShop } from 'react-icons/ai'
import { useUser } from '@/providers/UserProvider'

export interface ShopProps {
    isShopOpen: boolean,
    onShopClose: () => void
}

const Product: FC<ProductDisplay> = ({ product, onBuy, isBuying, isOwned }) => {
    const { isGuest } = useUser();
    const owned = isOwned(product);

    return (
        <>
            {{
                shop_emoji: <Text fontSize='24pt'>{product?.value}</Text>,
                shop_color: <Center p='.5em'><Box bg={product?.value} p='1em'/></Center>
            }[product?.category]}
            <Button 
                size='sm' 
                variant='primary'
                onClick={() => onBuy(product)}
                disabled={owned || isBuying || isGuest}
                isLoading={isBuying}
            > 
                Buy
            </Button>
        </>
    )
}

const ShopModal: FC<ShopProps> = ({ isShopOpen, onShopClose }) => {
    const { 
        category: shopCategory, 
        setCategory, 
        onBuy, 
        isBuying,
        isOwned
    } = useShop();

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
                                        onBuy={onBuy} 
                                        isBuying={isBuying}
                                        isOwned={isOwned}
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