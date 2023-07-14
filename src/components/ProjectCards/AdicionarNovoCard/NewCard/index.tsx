import { MdClose } from 'react-icons/md';
import styles from './NewCard.module.scss';
import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CARD } from '@/graphql/projects/CreateCard';
import { UserContext } from '@/providers/UserProvider';

export default function NewCard({ close, userId, projectId }: { close: () => void, userId: string, projectId: string }) {
    const { updateUserInfo } = useContext(UserContext);
    const [createCard, { loading, error }] = useMutation(CREATE_CARD);
    const [value, setValue] = useState("");

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setValue(event.target.value);
        event.target.style.height = "auto";
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    function handleSubmit() {
        if (value === "") {
            return
        }
        createCard({
            variables: {
                userId: userId,
                projectId: projectId,
                card: {
                    titleCard: value
                }
            }
        }).then(() => {
            updateUserInfo()
            close()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className={styles.newList} >
            <textarea rows={1} className={styles.box} maxLength={60} placeholder={"Insira o título do card"} onChange={handleChange} />
            <div className={styles.createList}>
                <button className={styles.buttonAdd} onClick={handleSubmit}>Add Card</button>
                <MdClose onClick={close} className={styles.icon} />
            </div>
        </div>
    )
}