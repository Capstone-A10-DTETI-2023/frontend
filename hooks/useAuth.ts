import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { User } from "types/User"

const useAuth = () => {
    const user1: User = {
        id: 1,
        role_id: 1,
        email: "saddan@gmail",
        password: "123"
    }

    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const router = useRouter();


    const isAuthenticated: boolean = !!user;


    return {
        isAuthenticated,
        isLoading,
        user,
        error
    }
}

export default useAuth;