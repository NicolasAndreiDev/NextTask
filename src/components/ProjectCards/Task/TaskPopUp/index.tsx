import styles from './TaskPopUp.module.scss';
import PopUp from "@/components/PopUp";
import { BsTextLeft } from "react-icons/bs";
import { MdClose, MdOutlineSubtitles } from "react-icons/md";
import { useContext, useEffect, useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_TASK } from '@/graphql/task/UpdateTask';
import { UserContext } from '@/providers/UserProvider';

interface ValuesProps {
    title: string,
    describe: string | null,
    finish: boolean
}

interface TaskPopUpProps {
    titleTask: string,
    userId: string,
    projectId: string,
    cardId: string,
    taskId: string,
    finish: boolean,
    onClick: () => void,
    describeText: string
}

export default function TaskPopUp({ userId, finish, projectId, cardId, taskId, titleTask, describeText, onClick }: TaskPopUpProps) {
    const { updateUserInfo } = useContext(UserContext);
    const [values, setValues] = useState<ValuesProps>({ title: titleTask, describe: describeText, finish: finish });
    const [view, setView] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [updateTask, { loading, error }] = useMutation(UPDATE_TASK);

    useEffect(() => {
        if (values.describe) {
            return
        }
        if (textAreaRef.current) {
            textAreaRef.current.focus()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [view])

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.target;
        event.target.style.height = "auto";
        event.target.style.height = `${event.target.scrollHeight}px`;
        setValues((prev) => ({ ...prev, [name]: value }))
    }

    function handleClick() {
        if (values.describe !== null && "") {
            return
        }
        setView(prev => !prev)
    }

    function hanldeClickFinish(name: keyof ValuesProps) {
        setValues((prev) => ({ ...prev, [name]: !prev[name] }))
    }

    function handleSubmit() {
        updateTask({
            variables: {
                userId,
                projectId,
                cardId,
                taskId,
                task: {
                    titleTask: values.title,
                    infoTask: values.describe,
                    finishedTask: values.finish
                }
            }
        })
        .then(() => {
            updateUserInfo()
            onClick()
        })
    }

    return (
        <PopUp largura={"54rem"}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <MdClose className={styles.iconClose} onClick={onClick} />
                </div>
                <div className={styles.title}>
                    <MdOutlineSubtitles className={styles.icon} />
                    <textarea value={values.title} className={styles.box} rows={1} spellCheck={false} onChange={handleChange} name={"title"} />
                </div>
                <div className={styles.describe}>
                    <label className={styles.label}>
                        <BsTextLeft />
                        <span>Describe</span>
                    </label>
                    {values.describe ?
                        <textarea ref={textAreaRef} value={values.describe} name={"describe"} spellCheck={false} rows={1} onBlur={handleClick} onChange={handleChange} className={styles.describeText} />
                        :
                        view ?
                            <textarea ref={textAreaRef} value={values.describe ? values.describe : ""} name={"describe"} rows={1} onBlur={handleClick} onChange={handleChange} className={styles.describeText} />
                            :
                            <div className={styles.divDescribe} onClick={handleClick}><span className={styles.detail} spellCheck={false}>Adicione uma descrição mais detalhada...</span></div>
                    }
                </div>
                <div className={styles.linha}></div>
                <div className={styles.buttons}>
                    <button className={styles.salvar} onClick={handleSubmit}>Salvar</button>
                    <button className={styles.complete} style={values.finish ? { backgroundColor: 'gray' } : {}} onClick={() => hanldeClickFinish('finish')}>Complete Task</button>
                </div>
            </div>
        </PopUp>
    )
}