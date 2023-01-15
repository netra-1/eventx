import {createContext, useContext, useEffect, useRef, useState} from "react";
import {io} from 'socket.io-client'

const SocketContext = createContext({})
const socketIO = io('ws://localhost:8011')

const staffId = localStorage.getItem('staff_id')

socketIO.on('connect', () => {
    console.log('socket connected');
    socketIO.emit('add-user', staffId)
})
socketIO.on('disconnect', () => {
    console.log('socket dis-connected');
})
export const SocketProvider = ({children}) => {

    const socketRef = useRef(socketIO)

    const [receivedMessage, setReceivedMessage] = useState(null)

    const sendMessage = (message, to) => {
        socketIO.emit('send-msg', ({ to, from: staffId, message }))
    }

    socketIO.on('msg-receive', (data) => {
        setReceivedMessage(data)
        const tempTimout = setTimeout(() => {
            setReceivedMessage(null)
            clearTimeout(tempTimout)
        }, 100)
    })

    return (
        <SocketContext.Provider value={{ instance: socketRef.current, sendMessage, receivedMessage }}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => useContext(SocketContext)