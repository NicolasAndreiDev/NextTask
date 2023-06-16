'use client';
import Image from "next/image";
import { useState } from "react";
import styles from './UserInfo.module.scss';

export default function UserInfo() {
    const [foto, setFoto] = useState(false)

    return (
        <>
            {foto ? <Image src={'/Logo.png'} alt={"user_picture"} height={40} width={40} /> : <div className={styles.imagemDefault}></div>}
        </>
    )
}