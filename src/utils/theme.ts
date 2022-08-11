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
            bg: mode('white', 'black')(props),
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
            bg: 'rgb(52,140,212)',
            _hover: {
                bg: 'rgb(39,107,163)',
                _disabled: {
                    bg: 'rgb(39,107,163)',
                }
            },
            color: 'white',
        }),
        danger: (props: ComponentDefaultProps) => ({
            bg: 'red.500',
            _hover: {
                bg: 'red.400',
                _disabled: {
                    bg: 'red.400',
                }
            },
            color: 'white',
        }),
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