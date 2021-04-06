import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import { Chat } from '../components/chat/Chat';
import { Chats } from '../components/chat/Chats';

import { Navbar } from '../components/nav/Navbar';
const URL = 'https://apapachatestore.com';

const connectSocket = () => {
    const socket = io.connect(URL, {
        transports: ['websocket'],
    });
    return socket;
}

export const LoggedRouter = () => {

    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [online, setOnline] = useState(false);
    const [userTo, setUserTo] = useState(null);
    const [lastSender, setLastSender] = useState(null);
    const [messages, setMessages] = useState(JSON.parse(localStorage.getItem('messages')) || {});
    const { socket: name } = useSelector(state => state.sockets);
    const [socket, setSocket] = useState(undefined);
    if(name && !socket){
        setSocket(connectSocket());
    }else if(!name){
        history.replace('/chat/login');
    }

    useEffect(() => {
        setOnline(socket?.connected);
    }, [socket]);

    useEffect(() => {
        socket?.on('connect', () => {
            setOnline(true);
            socket.emit('[server] register', {name});
        });
    }, [socket]);

    useEffect(() => {
        socket?.on('disconnect', () => {
            setOnline(false);
        });
    }, [socket]);

    useEffect(() => {
        socket?.on('[client] list', (list) => {
            setUsers(list);
        });
    }, [socket]);

    useEffect(() => {
        socket?.on('message', ({value, from}) => {
            const obj = {
                value,
                sender: from,
                read: false
            }
            setLastSender(from);
            setMessages((mess) => {
                return {
                    ...mess,
                    [from]: [...mess[from] || [], obj]
                }
            });
        });
    }, [socket]);

    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        for(let user of users){
            console.log(user);
            if(user?.user === userTo?.user){
                setUserTo({
                    ...userTo,
                    id: user.id
                })
            }
        }
    }, [users]);

    return (
        <>
            <Navbar 
                online={online} 
                users={users} 
                setTo={setUserTo} 
                to={userTo} 
                close={() => {setUserTo(null)}} 
            />
            {
                userTo 
                ? <Chat 
                    setTo={setUserTo} 
                    to={userTo} 
                    socket={socket}
                    messages={messages[userTo.user]}
                    setMessages={setMessages}
                    last={lastSender}
                    users={users}
                />
                : <Chats 
                    messages={messages} 
                    setTo={setUserTo}
                    users={users}
                />
            }
        </>
    )
}
