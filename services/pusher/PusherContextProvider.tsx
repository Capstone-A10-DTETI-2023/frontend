import Pusher from 'pusher-js';
import { createContext } from 'react'

const key = "916a2c79fe58f5ae3225";
const cluster = "ap1"
const pusher = new Pusher(key, {
    cluster: cluster,
});
export const PusherContext = createContext(pusher);

const PusherContextProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    return (
        <PusherContext.Provider value={pusher}>
            {children}
        </PusherContext.Provider>
    );
}

export default PusherContextProvider;