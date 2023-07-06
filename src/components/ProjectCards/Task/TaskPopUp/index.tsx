import styles from './TaskPopUp.module.scss';
import PopUp from "@/components/PopUp";
import { BsTextLeft } from "react-icons/bs";
import { MdClose, MdOutlineSubtitles } from "react-icons/md";
import { GoCommentDiscussion } from 'react-icons/go';
import { useEffect, useRef, useState } from 'react';

interface ValuesProps {
    title: string,
    describe: string,
    comment: string
}

interface ViewProps {
    describe: boolean,
    comment: boolean
}

export default function TaskPopUp({ onClick }: { onClick: () => void }) {
    const [values, setValues] = useState<ValuesProps>({ title: "To do", describe: "", comment: "" });
    const [view, setView] = useState<ViewProps>({
        describe: false,
        comment: false
    });
    const textAreaRef = useRef<{
        describeRef: HTMLTextAreaElement | null,
        commentRef: HTMLTextAreaElement | null,
    }>({
        describeRef: null,
        commentRef: null
    });

    useEffect(() => {
        if (textAreaRef.current.describeRef) {
            textAreaRef.current.describeRef.focus()
        }
        if (textAreaRef.current.commentRef) {
            textAreaRef.current.commentRef.focus()
        }
    }, [view.describe, view.comment])

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.target;
        event.target.style.height = "auto";
        event.target.style.height = `${event.target.scrollHeight}px`;
        setValues((prev) => ({ ...prev, [name]: value }))
    }

    function handleClick(name: keyof ViewProps) {
        if (!values[name]) {
            setView((prev) => ({ ...prev, [name]: !prev[name] }));
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
                    {view.describe ? <textarea ref={(ref) => textAreaRef.current.describeRef = ref} value={values.describe} name={"describe"} rows={1} onBlur={() => handleClick('describe')} onChange={handleChange} className={styles.describeText} /> : <div className={styles.divDescribe} onClick={() => handleClick('describe')}><span className={styles.detail}>Adicione uma descrição mais detalhada...</span></div>}
                </div>
                <div className={styles.comments}>
                    <label className={styles.label}>
                        <GoCommentDiscussion />
                        <span>Comments</span>
                    </label>
                    {view.comment ? <textarea ref={(ref) => textAreaRef.current.commentRef = ref} value={values.comment} onChange={handleChange} name={"comment"} onBlur={() => handleClick('comment')} rows={1} className={styles.commentText} /> : <div className={styles.divComment} onClick={() => handleClick('comment')}><span className={styles.textComment}>Escrever um comentário...</span></div>}
                </div>
            </div>
        </PopUp>
    )
}