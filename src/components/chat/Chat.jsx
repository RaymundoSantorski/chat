import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';

export const Chat = ({setTo, to, messages = [], socket, setMessages, last, users}) => {


    const { socket: name } = useSelector(state => state.sockets);
    const [{value}, handleChange, reset] = useForm({
        value: ''
    });
    const view = useRef();

    const sendMessage = () => {
        if(value.trim().length > 0){
            setMessages((mess) => {
                return {
                    ...mess,
                    [to.user]: [...mess[to.user] || [], {value, sender: name, read: true}]
                }
            });
            socket.emit('message', {
                to: to.id,
                value
            });
            reset();
        }
        view.current.scrollIntoView(false);
    }

    useEffect(() => {
        if(to?.user === last){
            view.current.scrollIntoView(false);
        }
    }, [messages]);

    useEffect(() => {
        const aux = users.find(({user}) => user === to.user);
        if(aux && !to.id){
            setTo(aux);
        }else if(!aux && to.id){
            setTo({
                user: to.user,
                id: null
            })
        }
    }, [users, setTo, to]);

    useEffect(() => {
        const aux = messages;
        const lastMessage = aux.slice().pop();
        if(!lastMessage.read){
            lastMessage.read = true;
            setMessages((mess) => {
                console.log(lastMessage);
                return {
                    ...mess,
                    [to.user]: [...aux]
                }
            });
        }
    }, [messages])

    return (
        <div className="chat">
            <div className="viewMessages" ref={view}>
                <div>
                    {
                        messages.map(message => (
                            <div className={message.sender === name ? "message self" : "message"}>
                                <p className="messageText">{message.value}</p>
                            </div>
                        ))
                    }
                </div>
                {
                    to.id ? 
                    <div className="chatSend">
                        <input 
                            name="value"
                            value={value}
                            onChange={handleChange}
                            placeholder="Escribe un mensaje"
                            className="messageInput"
                            type="text"
                            autoComplete="off"
                        />
                        <button
                            className="messageSendButton"
                            onClick={sendMessage}
                        >{'\u276F'}</button>
                    </div> : 
                    <div className="chatSend">
                        <center><p> El usuario está desconectado </p></center>
                    </div>
                }
            </div>
        </div>
    )
}
