import PopUp from "@/components/PopUp";
import { MdClose } from "react-icons/md";
import styles from './InviteUserPopUp.module.scss';
import { IoIosArrowDown } from "react-icons/io";
import { FaUser } from "react-icons/fa";

type UsersProps = [{
    id: string,
    email: string,
    username: string,
    bannerColor: string,
    perfilColor: string
}]

export default function InviteUserPopUp({ onClick, users }: { onClick: () => void, users:  UsersProps}) {
    return (
        <PopUp largura={"44rem"}>
            <div className={styles.top}>
                <h2 className={styles.title}>Invite participants</h2>
                <MdClose className={styles.icon} onClick={onClick} />
            </div>
            <div className={styles.inviteEmail}>
                <input placeholder={"Email address"} className={styles.inputEmail} />
                <button className={styles.typeUser}>
                    <span>Member</span>
                    <IoIosArrowDown />
                </button>
                <button className={styles.compartilhar}>To share</button>
            </div>
            <div className={styles.allUsers}>
            {users.map((user) => {
                return (
                    <div className={styles.userInfo} key={user.id}>
                        <div className={styles.dados}>
                            <div className={styles.user} style={{backgroundColor: user.perfilColor}}>
                                <FaUser className={styles.icon} />
                            </div>
                            <div className={styles.info}>
                                <span className={styles.username}>{user.username}</span>
                                <span className={styles.email}>{user.email}</span>
                            </div>
                        </div>
                        <button className={styles.userType}>
                            <span>Admin</span>
                            <IoIosArrowDown />
                        </button>
                    </div>
                )
            })}
            </div>
        </PopUp>
    )
}

//· criador do projeto