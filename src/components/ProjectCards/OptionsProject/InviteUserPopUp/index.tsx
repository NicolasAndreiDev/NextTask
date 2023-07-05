import PopUp from "@/components/PopUp";
import { MdClose } from "react-icons/md";
import styles from './InviteUserPopUp.module.scss';
import { IoIosArrowDown } from "react-icons/io";

export default function InviteUserPopUp({onClick}: {onClick: () => void}) {
    return(
        <PopUp largura={"44rem"}>
            <div className={styles.top}>
                <h2 className={styles.title}>Invite participants</h2>
                <MdClose className={styles.icon} onClick={onClick}/>
            </div>
            <div className={styles.inviteEmail}>
                <input placeholder={"Email address"} className={styles.inputEmail} />
                <button className={styles.typeUser}>
                    <span>Member</span>
                    <IoIosArrowDown />
                </button>
                <button className={styles.compartilhar}>To share</button>
            </div>
            <div>

            </div>
        </PopUp>
    )
}