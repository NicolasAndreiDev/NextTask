import { BsArrowLeftShort } from 'react-icons/bs';
import styles from './MoveCard.module.scss';
import { useContext, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useMutation } from '@apollo/client';
import { MOVE_CARD } from '@/graphql/card/MoveCard';
import { UserContext } from '@/providers/UserProvider';

type MoveCard = {
    userId: string,
    projectId: string,
    position: number,
    cardId: string,
    onClick: () => void,
    close: () => void,
    optionValue: number[]
}

export default function MoveCard({ userId, position, projectId, cardId, onClick, close, optionValue }: MoveCard) {
    const { updateUserInfo } = useContext(UserContext);
    const [value, setValue] = useState<{ number: number; select: boolean }>({
        number: position + 1,
        select: false,
    });
    const [moverCard, {loading, error}] = useMutation(MOVE_CARD);

    function handleClick() {
        setValue((prev) => ({ ...prev, select: !prev.select }));
    }

    function handleSubmit(value: number) {
        moverCard({
            variables: {
                userId,
                projectId,
                cardId,
                position: value - 1
            }
        })
        .then(() => {
            updateUserInfo()
            close()
        })
    }

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedNumber = parseInt(event.target.value, 10);
        setValue({ number: selectedNumber, select: false });
        handleSubmit(selectedNumber);
    }

    return (
        <div className={styles.move}>
            <div className={styles.top}>
                <BsArrowLeftShort onClick={onClick} className={styles.icon} />
                <MdClose className={styles.icon} onClick={close} />
            </div>
            <div className={styles.position} onClick={handleClick}>
                <span className={styles.text}>Position</span>
                <span className={styles.text}>{value.number}</span>
            </div>
            {value.select && (
                <select className={styles.select} value={value.number.toString()} onChange={handleSelectChange}>
                    {optionValue.map((option, index) => {
                        return (
                            <option key={index} value={option}>{option}</option>
                        )
                    })}
                </select>
            )}
        </div>
    );
}
