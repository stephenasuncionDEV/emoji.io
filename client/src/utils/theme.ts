import type { Styles, GlobalStyleProps } from '@chakra-ui/theme-tools'
import type { ComponentStyleConfig, ComponentDefaultProps } from '@chakra-ui/theme'
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

const fonts = {
    heading: 'Poppins, Inter, sans-serif',
    body: 'Poppins, Inter, sans-serif',
}

const styles: Styles = {
    global: (props: GlobalStyleProps) => ({
        body: {
            bg: mode('#eeefe9', 'linear-gradient(0deg, rgba(26,32,44,1) 0%, rgba(17,21,28,1) 100%)')(props),
        }
    })
}

const Button: ComponentStyleConfig = {
    baseStyle: (props: ComponentDefaultProps) => ({
        fontWeight: 'normal'
    }),
    variants: {
        transparent: (props: ComponentDefaultProps) => ({
            bg: 'transparent',
            _hover: {
                bg: 'whiteAlpha.100',
                _disabled: {
                    bg: 'whiteAlpha.100',
                    opacity: '0.6'
                }
            },
            color: mode('black', 'white')(props),
        }),
        primary: (props: ComponentDefaultProps) => ({
            bg: 'rgb(245, 78, 0)',
            borderBottom: '3px solid rgb(186, 59, 0)',
            _hover: {
                bg: 'rgb(242, 102, 36)',
                _disabled: {
                    bg: 'rgb(242, 102, 36)',
                }
            },
            color: 'white',
        }),
        danger: (props: ComponentDefaultProps) => ({
            bg: 'rgb(229,62,62)',
            borderBottom: '3px solid rgb(163, 44, 44)',
            _hover: {
                bg: 'red.400',
                _disabled: {
                    bg: 'red.400',
                }
            },
            color: 'white',
        }),
        login: (props: ComponentDefaultProps) => ({
            bg: 'white',
            borderBottom: '3px solid rgb(230,230,230)',
            _hover: {
                bg: 'rgb(250,250,250)',
                _disabled: {
                    bg: 'rgb(250,250,250)',
                }
            },
            color: 'black',
        })
    }
}

const theme = extendTheme({
    config,
    fonts,
    styles,
    components: {
        Button
    }
})

export default theme