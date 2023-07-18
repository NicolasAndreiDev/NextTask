import Image from 'next/image';
import styles from './autenticacao.module.scss';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill, BsGithub } from 'react-icons/bs';
import ErrMessage from '../Err';
import { signIn } from 'next-auth/react';

interface FormEvent {
    email: string;
    password: string;
    confirmPassword?: string;
}

interface AutenticacaoProps {
    title: string;
    buttonText: string;
    textAuth: string;
    authUser: string;
    inputExist?: boolean;
    errExist: boolean;
    textErr: string;
    onClick: () => void;
    onSubmit: (event: React.FormEvent) => void;
    setValuesUser: (values: FormEvent) => void;
}

interface FieldStylesState {
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
}

interface RevealState {
    password: boolean;
    confirmPassword: boolean;
}

export default function FormPadrao({
    title,
    inputExist = false,
    errExist,
    onClick,
    onSubmit,
    setValuesUser,
    textErr,
    authUser,
    buttonText,
    textAuth,
}: AutenticacaoProps) {
    const [fieldStyles, setFieldStyles] = useState<FieldStylesState>({
        email: false,
        password: false,
        confirmPassword: false,
    });
    const [values, setValues] = useState<FormEvent>({ 
        email: "", 
        password: "", 
        confirmPassword: "" 
    });
    const [reveal, setReveal] = useState<RevealState>({
        password: false,
        confirmPassword: false,
    });

    function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
        const { name } = event.target;
        setFieldStyles((prevStyles) => ({ ...prevStyles, [name]: true }));
    }

    function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
        const { name } = event.target;
        setFieldStyles((prevStyles) => ({
            ...prevStyles,
            [name]: values[name as keyof FormEvent] !== "",
        }));
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
        setValuesUser({ ...values, [name]: value });
    }

    function handleClick(name: keyof RevealState) {
        setReveal((prevReveal) => ({
            ...prevReveal,
            [name]: !prevReveal[name],
        }));
    }

    function handleSignIn(type: string) {
        signIn(type, {
            callbackUrl: '/',
        })
    }

    return (
        <>
            <Image src={'/assets/LogoCinza.png'} alt={'NextTask'} height={32} width={32} className={styles.logo} />
            <div className={styles.form}>
                <form className={styles.form_info} onSubmit={onSubmit}>
                    <h2 className={styles.title}>{title}</h2>
                    <div className={styles.inputs}>
                        <div className={styles.divType}>
                            <label htmlFor={"Email"} className={styles.labelType} style={fieldStyles.email ? { transform: "translate(-10px, -20px)" } : {}}>Email</label>
                            <input id={"Email"} className={styles.inputType} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} autoComplete={"off"} name={"email"} />
                        </div>
                        <div className={styles.divType}>
                            <label htmlFor={"Password"} className={styles.labelType} style={fieldStyles.password ? { transform: "translate(-10px, -20px)" } : {}}>Password</label>
                            <input id={"Password"} className={styles.inputType} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} autoComplete={"off"} name={"password"} type={reveal.password ? "text" : "password"} />
                            {reveal.password ? <BsEyeFill onClick={() => handleClick("password")} className={styles.icon} /> : <BsEyeSlashFill onClick={() => handleClick("password")} className={styles.icon} />}
                        </div>
                        {inputExist &&
                            <div className={styles.divType}>
                                <label htmlFor={"ConfirmPassword"} className={styles.labelType} style={fieldStyles.confirmPassword ? { transform: "translate(-10px, -20px)" } : {}}>Confirm Password</label>
                                <input id={"ConfirmPassword"} className={styles.inputType} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} autoComplete={"off"} name={"confirmPassword"} type={reveal.confirmPassword ? "text" : "password"} />
                                {reveal.confirmPassword ? <BsEyeFill onClick={() => handleClick("confirmPassword")} className={styles.icon} /> : <BsEyeSlashFill onClick={() => handleClick("confirmPassword")} className={styles.icon} />}
                            </div>
                        }
                    </div>
                    { errExist ? <ErrMessage text={textErr}/> : ""}
                    <button className={styles.buttonForm}>{buttonText}</button>
                    <div className={styles.divTextAuth}>
                        <span className={styles.textAuth}>{textAuth} </span>
                        <span onClick={onClick} className={styles.authUser}>{authUser}</span>
                    </div>
                </form>
                <div className={styles.option}>
                    <div className={styles.linha}></div>
                    <span>or</span>
                    <div className={styles.linha}></div>
                </div>
                <span className={styles.typeUser_button} onClick={() => handleSignIn('google')}>
                    <FcGoogle />
                </span>
                <span className={styles.typeUser_button} onClick={() => handleSignIn('github')}>
                    <BsGithub />
                </span>
            </div>
        </>
    )
}