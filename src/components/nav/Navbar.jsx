import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export const Navbar = ({online, users, setTo, to, close}) => {

    const { socket: name } = useSelector(state => state.sockets);
    const [show, setShow] = useState(false);

    return (
        <div className={online ? "navbar online" : "navbar"}>
            <div className={show ? "modal show" : "modal"}>
                <div className="modalOffset" onClick={() => {setShow(false)}}></div>
                <div className="modalContent">
                    {
                        users.map(({user, id}) => (
                            <div key={id} className="modalUser" 
                                onClick={() => {setTo({user, id})}}
                            >
                                <div className="modalUserImg"></div>
                                { user }
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="row">
                {to && <p className="reverse" onClick={close}>{'\u279C'}</p>}
                <h3>{to ? `${name} \u276F ${to.user}` : `${name}`}</h3>
            </div>
            <div 
                className={show ? "burger active" : "burger"}
                onClick={() => {setShow(!show)}}
            >
                <div className="burgerTop"></div>
                <div className="burgerMiddle"></div>
                <div className="burgerBottom"></div>
            </div>
        </div>
    )
}
