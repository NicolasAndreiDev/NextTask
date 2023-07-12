'use client';
import Task from '../Task';
import styles from './Card.module.scss';
import { HiOutlineEllipsisHorizontal } from 'react-icons/hi2';
import { MdClose } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import { useState } from 'react';
import ConfigCard from './ConfigCard';
import { CREATE_TASK } from '@/graphql/projects/CreateTask';
import { useMutation } from '@apollo/client';

interface OptionsProps {
  newTask: boolean,
  optionsCard: boolean
}

interface CardProps {
  titleCard: string,
  task: [{ id: string, titleTask: string }],
  userId: string,
  projectId: string,
  cardId: string,
  optionValue: number[]
}

export default function Card({ titleCard, task, userId, projectId, cardId, optionValue }: CardProps) {
  const [options, setOptions] = useState<OptionsProps>({
    newTask: false,
    optionsCard: false
  });
  const [values, setValues] = useState<{titleCardText: string, titleTask: string}>({titleCardText: titleCard, titleTask: ""});
  const [createTask, { loading, error }] = useMutation(CREATE_TASK);

  function handleSubmit() {
    if(values.titleTask === "") {
      return
    }
    createTask({
      variables: {
        userId,
        projectId,
        cardId,
        task: {
          titleTask: values.titleTask
        }
      }
    }).then(() => {
      handleClick('newTask')
    })
  }

  function handleClick(name: keyof OptionsProps) {
    setOptions((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
    setValues((prev) => ({...prev, [name]: value}));
  }

  return (
    <div className={styles.card}>
      <div className={styles.infoCard}>
        <textarea className={styles.titleCard} name={'titleCardText'} value={values.titleCardText} onChange={handleChange} rows={1} spellCheck={false} />
        <div className={styles.configLayout}>
          <HiOutlineEllipsisHorizontal className={styles.options} onClick={() => handleClick('optionsCard')} />
          {options.optionsCard && <ConfigCard close={() => handleClick('optionsCard')} onClick={() => { handleClick('newTask'), handleClick('optionsCard') }} optionValue={optionValue} />}
        </div>
      </div>
      <div className={styles.tasks}>
        {task.map((task) => {
          return (
            <Task key={task.id} titleTask={task.titleTask} />
          )
        })}
      </div>
      {options.newTask ?
        <>
          <textarea rows={1} maxLength={60} name={'titleTask'} value={values.titleTask} onChange={handleChange} className={styles.boxTwo} placeholder={"Insira um título para essa tarefa"} />
          <div className={styles.buttons}>
            <button className={styles.adicionarTarefaTrue} onClick={handleSubmit}>Add task</button>
            <MdClose className={styles.closeIcon} onClick={() => handleClick('newTask')} />
          </div>
        </> 
        : 
        <button className={styles.adicionarTask} onClick={() => handleClick('newTask')}>
          <IoMdAdd className={styles.icon} />
          <span className={styles.text}>Add a new task</span>
        </button>
      }
    </div>
  );
}
