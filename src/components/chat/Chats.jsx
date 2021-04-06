import React from 'react';

export const Chats = ({messages = {}, setTo, users}) => {

    const keys = Object.keys(messages);
    return (
        <div className="chat">
            {
                keys.map(key => {
                    const active = users.find(({user}) => user === key);
                    const id = active?.id;
                    const lastMessage = messages[key].slice().pop();
                    return <div onClick={() => {
                            setTo({
                                user: key, 
                                id
                            });
                        }}
                        className={id?"chatItem active":"chatItem"}
                    >
                        <p className="chatSender">{key}</p>
                        <p className={lastMessage.read ? "lastMessage read" : "lastMessage"}>{lastMessage.value}</p>
                    </div>;
                })
            }
        </div>
    )
}
