import PopUp from "@/components/PopUp";
import styles from './UserPopUp.module.scss';
import { FaUser } from 'react-icons/fa';
import { useState, useEffect, useRef, useContext } from "react";
import { MdClose } from "react-icons/md";
import { UserContext } from "@/providers/UserProvider";
import { signOut } from "next-auth/react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/graphql/user/UpdateUser";
import ColorOptionsUser from "./ColorOptionsUser";

export default function UserPopUp({ onClick }: { onClick: () => void }) {
    const { user } = useContext(UserContext);
    const [inputUsername, setInputUsername] = useState(true);
    const [select, selectColors] = useState<{
        banner: string,
        perfil: string
    }>({
        banner: '',
        perfil: ''
    })
    const [username, setUsername] = useState(user?.username)
    const usernameRef = useRef<HTMLInputElement>(null);
    const [updateUser, { loading, error }] = useMutation(UPDATE_USER);

    useEffect(() => {
        if (usernameRef.current) {
            usernameRef.current.focus();
        }
    }, [inputUsername]);

    function handleClick() {
        setInputUsername(prev => !prev)
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
    }

    function handleSubmit() {
        updateUser({
            variables: {
                id: user?.id,
                user: {
                    username: username,
                    perfilColor: select.perfil,
                    bannerColor: select.banner
                }
            }
        })
            .then(() => {
                onClick()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <PopUp>
            <div className={styles.banner}>
                <div className={styles.bannerFundo}></div>
                <div className={styles.userPicture} >
                    <div className={styles.picture} style={{ backgroundColor: select.perfil }}>
                        <FaUser className={styles.icon} />
                    </div>
                </div>
                <MdClose className={styles.close} onClick={onClick} />
                <div className={styles.fundo} style={{ backgroundColor: select.banner }}></div>
            </div>
            <div className={styles.optionsUser}>
                <ColorOptionsUser value={{ perfil: user!.perfilColor, banner: user!.bannerColor }} selectColors={selectColors} />
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
                            spellCheck={false}
                            onChange={handleChange}
                            onBlur={handleClick}
                        />
                    )}
                </div>
                <button className={styles.buttonExit} onClick={() => signOut()}>Log out</button>
            </div>
            <button className={styles.saveButton} onClick={handleSubmit}>Save</button>
        </PopUp>
    )
}
