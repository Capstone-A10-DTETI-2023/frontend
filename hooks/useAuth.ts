const useAuth = () => {
    const isAuthenticated = (): boolean => {
        return false
    }

    return {
        isAuthenticated
    }
}
 
export default useAuth;