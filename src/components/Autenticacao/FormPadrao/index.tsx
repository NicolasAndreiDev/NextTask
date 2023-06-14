import Image from 'next/image'
import styles from './autenticacao.module.scss'
import { FcGoogle } from 'react-icons/fc'

interface AutenticacaoProps {
    title: string;
    buttonText: string;
    textAuth: string;
    authUser: string;
    inputExist?: boolean;
    onClick: () => void;
    onSubmit: (event: React.FormEvent) => void;
}

export default function FormPadrao({ 
    title, 
    inputExist = false, 
    onClick, 
    authUser, 
    buttonText, 
    textAuth, 
    onSubmit
}: AutenticacaoProps) {
    return (
        <>
            <Image src={'/Logo.png'} alt={'NextTask'} height={32} width={32} className={styles.logo} />
            <div className={styles.form}>
                <form className={styles.form_info} onSubmit={onSubmit}>
                    <h2>{title}</h2>
                    <div className={styles.divType}>
                        <label className={styles.labelType}>Email</label>
                        <input className={styles.inputType}/>
                    </div>
                    <div className={styles.divType}>
                        <label className={styles.labelType}>Password</label>
                        <input className={styles.inputType}/>
                    </div>
                    {inputExist &&
                        <div className={styles.divType}>
                            <label className={styles.labelType}>Confirm Password</label>
                            <input className={styles.inputType}/>
                        </div>
                    }
                    <button>{buttonText}</button>
                    <div>
                        <span>{textAuth}</span>
                        <span onClick={onClick}>{authUser}</span>
                    </div>
                </form>
                <span className={styles.typeUser_button}>
                    <FcGoogle />
                </span>
            </div>
        </>
    )
}