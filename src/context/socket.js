import { createContext, useContext, useEffect, useRef } from "react";
import {io} from 'socket.io-client'

const SocketContext = createContext({ instance: null})

export const SocketProvider = ({children}) => {

    const socketRef = useRef(null)

    useEffect(() => {
        if(!socketRef.current){
            const socketIO = io('http://localhost:8011')

            socketIO.on('connect', () => {
                socketRef.current = socketIO
                console.log('socket connected');
            })
            socketIO.on('disconnect', () => {
                console.log('socket dis-connected');
            })
        }
    }, [socketRef])

    return (
        <SocketContext.Provider value={{instance: socketRef.current}}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => useContext(SocketContext)