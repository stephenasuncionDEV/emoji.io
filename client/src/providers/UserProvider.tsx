import { Props, User } from '@/types/globals'
import { useState, useContext, createContext, FC, Dispatch } from 'react'

export type UserContextType = {
    user: User,
    setUser: Dispatch<User>,
    isGuest: boolean,
    setIsGuest: Dispatch<boolean>
}

export const UserContext = createContext<UserContextType>({} as UserContextType)
export const useUser = () => useContext(UserContext)

export const UserProvider: FC<Props> = ({ children }) => {
    const [user, setUser] = useState<User>({} as User);
    const [isGuest, setIsGuest] = useState<boolean>(false);

    return (
		<UserContext.Provider
			value={{
                user,
                setUser,
                isGuest,
                setIsGuest
            }}
		>
			{ children }
		</UserContext.Provider>
	)
}