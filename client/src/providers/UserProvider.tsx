import { Props, User } from '@/types/global'
import { useState, useContext, createContext, FC, Dispatch } from 'react'

export type UserContextType = {
    user: User,
    setUser: Dispatch<User>
}

export const UserContext = createContext<UserContextType>({} as UserContextType)
export const useUser = () => useContext(UserContext)

export const UserProvider: FC<Props> = ({ children }) => {
    const [user, setUser] = useState<User>({} as User);

    return (
		<UserContext.Provider
			value={{
                user,
                setUser
            }}
		>
			{ children }
		</UserContext.Provider>
	)
}