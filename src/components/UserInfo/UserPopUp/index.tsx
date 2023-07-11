import PopUp from "@/components/PopUp";
import styles from './UserPopUp.module.scss';
import { FaUser } from 'react-icons/fa';
import { useState, useEffect, useRef, useContext } from "react";
import { MdClose } from "react-icons/md";
import { AiFillCamera } from 'react-icons/ai';
import { UserContext } from "@/providers/UserProvider";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface ImageProps {
    banner: boolean,
    perfil: boolean
}

export default function UserPopUp({ onClick }: { onClick: () => void }) {
    const { user } = useContext(UserContext);
    const [inputUsername, setInputUsername] = useState(true);
    const [username, setUsername] = useState(user?.username)
    const [edit, setEdit] = useState<ImageProps>({
        banner: false,
        perfil: false,
    })

    const usernameRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (usernameRef.current) {
            usernameRef.current.focus();
        }
    }, [inputUsername]);

    function handleClick() {
        setInputUsername(prev => !prev)
    }

    function handleMouse(name: keyof ImageProps) {
        setEdit((prev) => ({ ...prev, [name]: !prev[name] }))
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
    }

    return (
        <PopUp>
            <div className={styles.banner}>
                {user?.bannerImage ? <Image src={user.bannerImage} alt={"UserBanner"} width={360} className={styles.bannerFundo} height={80} /> : <div className={styles.bannerFundo}></div>}
                <div className={styles.userPicture} onMouseEnter={() => handleMouse('perfil')} onMouseLeave={() => handleMouse('perfil')}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {user?.perfilImage ? <img src={user.perfilImage} alt={"UserImage"} className={styles.picture} /> : <div className={styles.picture}>
                        <FaUser className={styles.icon} />
                    </div>}
                    {edit.perfil && <div className={styles.editPerfil}><AiFillCamera className={styles.cam} /></div>}
                </div>
                <MdClose className={styles.close} onClick={onClick} />
                <div className={styles.fundo} onMouseEnter={() => handleMouse('banner')} onMouseLeave={() => handleMouse('banner')}>
                    {edit.banner && <div className={styles.editBanner} ><AiFillCamera className={styles.camBanner} /></div>}
                </div>
            </div>
            <div className={styles.userInfo}>
                <span className={styles.labelTitle}>Username</span>
                {inputUsername ? (
                    <div className={styles.inputsDiv} onClick={handleClick}>
                        <span>{username}</span>
                    </div>
                ) : (
                    <input
                        ref={usernameRef}
                        value={username}
                        className={styles.inputs}
                        name={"username"}
                        onChange={handleChange}
                        onBlur={handleClick}
                    />
                )}
            </div>
            <button className={styles.saveButton} onClick={onClick}>Save</button>
            <button className={styles.buttonExit} onClick={() => signOut()}>Log out</button>
        </PopUp>
    )
}
