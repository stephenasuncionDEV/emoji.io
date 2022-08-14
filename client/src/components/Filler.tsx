import { Dimension } from '@/types/globals'
import React, { useState, useRef, useLayoutEffect, FC, MutableRefObject, ReactNode, CSSProperties } from 'react'
import { Box } from '@chakra-ui/react'

export interface AutoSizerProps {
    children: (size: Dimension) => ReactNode,
    className?: string,
    style?: CSSProperties
}

const Filler: FC<AutoSizerProps> = ({ children, className, style }) => {
    const [childParams, setChildParams] = useState<Dimension>({ 
        width: 0, 
        height: 0 
    });
    const parentRef = useRef() as MutableRefObject<HTMLDivElement>;

    useLayoutEffect(() => {
        if (!parentRef) return;
        const updateSize = () => {
            if (!parentRef.current) return;
            const childParams: Dimension = {
                width: parentRef.current.clientWidth,
                height: parentRef.current.clientHeight
            }
            setChildParams(childParams);
        }
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, [parentRef])

    return (
        <Box
            ref={parentRef}
            className={className}
            style={{...style}}
            h='full'
            flex='1'
        >
            {children(childParams)}
        </Box>
    )
}

export default Filler