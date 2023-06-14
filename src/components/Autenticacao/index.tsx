'use client'
import { useState } from "react";
import Login from "./Login";
import Cadastro from "./Cadastro";

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