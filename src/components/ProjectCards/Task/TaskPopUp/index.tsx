import styles from './TaskPopUp.module.scss';
import PopUp from "@/components/PopUp";
import { BsTextLeft } from "react-icons/bs";
import { MdClose, MdOutlineSubtitles } from "react-icons/md";
import { GoCommentDiscussion } from 'react-icons/go';
import { useEffect, useRef, useState } from 'react';

interface ValuesProps {
    title: string,
    describe: string,
}

export default function TaskPopUp({ onClick }: { onClick: () => void }) {
    const [values, setValues] = useState<ValuesProps>({ title: "To do", describe: ""});
    const [view, setView] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.focus()
        }
    }, [view])

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.target;
        event.target.style.height = "auto";
        event.target.style.height = `${event.target.scrollHeight}px`;
        setValues((prev) => ({ ...prev, [name]: value }))
    }

    function handleClick() {
        if (!values.describe) {
            setView(prev => !prev)
        }
    }

    return (
        <PopUp largura={"54rem"}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <MdClose className={styles.iconClose} onClick={onClick} />
                </div>
                <div className={styles.title}>
                    <MdOutlineSubtitles className={styles.icon} />
                    <textarea value={values.title} className={styles.box} rows={1} spellCheck={false} onChange={handleChange} name={"title"}/>
                </div>
                <div className={styles.describe}>
                    <label className={styles.label}>
                        <BsTextLeft />
                        <span>Describe</span>
                    </label>
                    {view ? <textarea ref={textAreaRef} value={values.describe} name={"describe"} rows={1} onBlur={handleClick} onChange={handleChange} className={styles.describeText} /> : <div className={styles.divDescribe} onClick={handleClick}><span className={styles.detail}>Adicione uma descrição mais detalhada...</span></div>}
                </div>
            </div>
        </PopUp>
    )
}