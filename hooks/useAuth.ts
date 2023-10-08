import { User } from "types/User"

const useAuth = () => {
    const isAuthenticated = (): User | null => {
        
        const user: User = {
            id: 1,
            role_id: 1,
            email: "saddan@gmail",
            password: "123"
        }

        // const user = null;

        return user
    }

    return {
        isAuthenticated
    }
}

export default useAuth;