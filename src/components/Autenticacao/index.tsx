'use client'
import { useState } from "react";
import Cadastro from "./Cadastro";
import Login from "./Login";

export default function AutenticacaoComponent() {
    const [userType, setUserType] = useState(false);

    function handleClick() {
        setUserType(prev => !prev)
    }

    return (
        <>
            {userType ? <Login onClick={handleClick} /> : <Cadastro onClick={handleClick} />}
        </>
    )
}