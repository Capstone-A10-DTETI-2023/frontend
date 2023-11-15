import { useContext } from "react"
import { PusherContext } from "./PusherContextProvider"

export const usePusherContext = () => {
    const context = useContext(PusherContext)

    if (!context) {
        throw Error('Something bad occured on auth context 😟')
    }

    return context;
}