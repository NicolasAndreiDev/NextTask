import PopUp from "@/components/PopUp";
import styles from './UserPopUp.module.scss';
import { FaUser } from 'react-icons/fa';
import { useState, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import { AiFillCamera } from 'react-icons/ai';

interface ImageProps {
    banner: boolean,
    perfil: boolean
}

interface ValueProps {
    username: string,
    email: string
}

interface InputInfoProps {
    username: boolean,
    email: boolean
}

export default function UserPopUp({ onClick }: { onClick: () => void }) {
    const [inputInfo, setInputInfo] = useState<InputInfoProps>({
        username: true,
        email: true
    });
    const [value, setValue] = useState<ValueProps>({
        username: "Nicolas",
        email: "nicolasandreislc@gmail.com"
    })
    const [edit, setEdit] = useState<ImageProps>({
        banner: false,
        perfil: false,
    })

    const inputRefs = useRef<{
        username: HTMLInputElement | null,
        email: HTMLInputElement | null
    }>({
        username: null,
        email: null,
    });

    useEffect(() => {
        if (inputRefs.current.username) {
            inputRefs.current.username.focus();
        }
        if (inputRefs.current.email) {
            inputRefs.current.email.focus();
        }
    }, [inputInfo.email, inputInfo.username]);

    function handleClick(name: keyof InputInfoProps) {
        setInputInfo((prev) => ({ ...prev, [name]: !prev[name] }))
    }

    function handleMouse(name: keyof ImageProps) {
        setEdit((prev) => ({ ...prev, [name]: !prev[name] }))
    }

    return (
        <PopUp>
            <div className={styles.banner}>
                <div className={styles.picture} onMouseEnter={() => handleMouse('perfil')} onMouseLeave={() => handleMouse('perfil')}>
                    <FaUser className={styles.icon} />
                    {edit.perfil && <div className={styles.editPerfil}><AiFillCamera className={styles.cam} /></div>}
                </div>
                <MdClose className={styles.close} onClick={onClick} />
                <div className={styles.fundo} onMouseEnter={() => handleMouse('banner')} onMouseLeave={() => handleMouse('banner')}>
                    {edit.banner && <div className={styles.editBanner} ><AiFillCamera className={styles.camBanner} /></div>}
                </div>
            </div>
            <div className={styles.userInfo}>
                <span className={styles.labelTitle}>Username</span>
                {inputInfo.username ? (
                    <div
                        className={styles.inputsDiv}
                        onClick={() => handleClick('username')}
                    >
                        <span>{value.username}</span>
                    </div>
                ) : (
                    <input
                        ref={(ref) => inputRefs.current.username = ref}
                        value={value.username}
                        className={styles.inputs}
                        onBlur={() => { handleClick('username') }}
                    />
                )}
                <span className={styles.labelTitle}>Email</span>
                {inputInfo.email ? (
                    <div
                        className={styles.inputsDiv}
                        onClick={() => handleClick('email')}
                    >
                        <span>{value.email}</span>
                    </div>
                ) : (
                    <input
                        ref={(ref) => inputRefs.current.email = ref}
                        value={value.email}
                        className={styles.inputs}
                        onBlur={() => { handleClick('email') }}
                    />
                )}
            </div>
            <button className={styles.saveButton} onClick={onClick}>Save</button>
            <button className={styles.buttonExit}>Log out</button>
        </PopUp>
    )
}
