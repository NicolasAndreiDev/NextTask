"use client";
import styles from './NewTask.module.scss';
import { useState } from "react";

export default function NewTask() {
    const [value, setValue] = useState("");

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
      setValue(event.target.value);
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    };

    return (
        <textarea rows={1} maxLength={60} value={value} onChange={handleChange} className={styles.box} placeholder={"Insira um título para essa tarefa"} />
    )
}