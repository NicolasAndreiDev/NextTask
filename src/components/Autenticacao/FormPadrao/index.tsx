import Image from 'next/image'
import styles from './autenticacao.module.scss'
import { FcGoogle } from 'react-icons/fc'
import { useState } from 'react';

interface FormEvent {
    email: string,
    password: string,
    confirmPassword?: string
}

interface AutenticacaoProps {
    title: string;
    buttonText: string;
    textAuth: string;
    authUser: string;
    inputExist?: boolean;
    onClick: () => void;
    onSubmit: (event: React.FormEvent) => void;
    setValuesUser: (values: FormEvent) => void;
}

export default function FormPadrao({
    title,
    inputExist = false,
    onClick,
    onSubmit,
    setValuesUser,
    authUser,
    buttonText,
    textAuth,
}: AutenticacaoProps) {
    const [fieldStyles, setFieldStyles] = useState<{ [key: string]: boolean }>({
        email: false,
        password: false,
        confirmPassword: false,
    });
    const [values, setValues] = useState<FormEvent>({ email: "", password: "", confirmPassword: "" });

    function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
        const { name } = event.target;
        setFieldStyles((prevStyles) => ({ ...prevStyles, [name]: true }));
    }

    function handleBlur() {
        const updatedStyles: any = {};
        for (const key in fieldStyles) {
            if (values[key as keyof FormEvent] === "") {
                updatedStyles[key] = false;
            } else {
                updatedStyles[key] = fieldStyles[key];
            }
        }
        setFieldStyles(updatedStyles);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
        setValuesUser(values);
    }

    return (
        <>
            <Image src={'/assets/LogoCinza.png'} alt={'NextTask'} height={32} width={32} className={styles.logo} />
            <div className={styles.form}>
                <form className={styles.form_info} onSubmit={onSubmit}>
                    <h2 className={styles.title}>{title}</h2>
                    <div className={styles.inputs}>
                        <div className={styles.divType}>
                            <label htmlFor={"Email"} className={styles.labelType} style={fieldStyles.email ? { transform: "translate(-10px, -22px)" } : {}}>Email</label>
                            <input id={"Email"} className={styles.inputType} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} autoComplete={"off"} name={"email"} />
                        </div>
                        <div className={styles.divType}>
                            <label htmlFor={"Password"} className={styles.labelType} style={fieldStyles.password ? { transform: "translate(-10px, -22px)" } : {}}>Password</label>
                            <input id={"Password"} className={styles.inputType} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} autoComplete={"off"} name={"password"} type={"password"} />
                        </div>
                        {inputExist &&
                            <div className={styles.divType}>
                                <label htmlFor={"ConfirmPassword"} className={styles.labelType} style={fieldStyles.confirmPassword ? { transform: "translate(-10px, -22px)" } : {}}>Confirm Password</label>
                                <input id={"ConfirmPassword"} className={styles.inputType} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} autoComplete={"off"} name={"confirmPassword"} type={"password"}/>
                            </div>
                        }
                    </div>
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
                <span className={styles.typeUser_button}>
                    <FcGoogle />
                </span>
            </div>
        </>
    )
}