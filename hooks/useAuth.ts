import { useState } from "react"
import { User } from "types/User"

const useAuth = () => {
    const user1: User = {
        id: 1,
        role_id: 1,
        email: "saddan@gmail",
        role: "technician",
        password: "123"
    }

    const [user, setUser] = useState<User | null>(user1);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const isAuthenticated: boolean = !!user;

    const getRole = () => {
        return user?.role;
    }

    return {
        isAuthenticated,
        getRole,
        isLoading,
        user,
        error
    }
}

export default useAuth;