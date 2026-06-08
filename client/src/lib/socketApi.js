import io from 'socket.io-client';
import { store } from '../store';
import { addMessage } from '../slices/messagesSlice';

let socket;

const initSocket = () => {
    socket = io.connect("https://chatapp-node2501.onrender.com")

    socket.on("new_message", (res) => {
        store.dispatch(addMessage(res))
    })
    
}

export { socket, initSocket }