import { Props } from '@/types/globals'
import { useContext, createContext, FC, useRef, MutableRefObject } from 'react'

export type GameContextType = {
    canvasRef: MutableRefObject<HTMLCanvasElement>,
}

export const GameContext = createContext<GameContextType>({} as GameContextType)
export const useGame = () => useContext(GameContext)

export const GameProvider: FC<Props> = ({ children }) => {
    const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;

    return (
		<GameContext.Provider
			value={{
                canvasRef
            }}
		>
			{ children }
		</GameContext.Provider>
	)
}