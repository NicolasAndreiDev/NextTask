import { MdClose } from 'react-icons/md';
import styles from './NewList.module.scss';
import { CSSProperties, useState } from 'react';

export default function NewList({close }: {close: () => void }) {
    const [value, setValue] = useState("");

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setValue(event.target.value);
        event.target.style.height = "auto";
        event.target.style.height = `${event.target.scrollHeight}px`;
      };

    return(
        <div className={styles.newList} >
            <textarea rows={1} className={styles.box} maxLength={60} placeholder={"Insira o título da lista"} onChange={handleChange}/>
            <div className={styles.createList}>
                <button className={styles.buttonAdd}>Add List</button>
                <MdClose onClick={close} className={styles.icon} />
            </div>
        </div>
    )
}