import { BsArrowLeftShort } from 'react-icons/bs';
import styles from './MoveCard.module.scss';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';

export default function MoveCard({ onClick, close }: { onClick: () => void, close: () => void}) {
    const [value, setValue] = useState<{ number: number; select: boolean }>({
        number: 1,
        select: false,
    });

    function handleClick() {
        setValue((prev) => ({ ...prev, select: !prev.select }));
    }

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedNumber = parseInt(event.target.value, 10);
        setValue({ number: selectedNumber, select: false });
    }

    return (
        <div className={styles.move}>
            <div className={styles.top}>
                <BsArrowLeftShort onClick={onClick} className={styles.icon} />
                <MdClose className={styles.icon} onClick={close}/>
            </div>
            <div className={styles.position} onClick={handleClick}>
                <span className={styles.text}>Position</span>
                <span className={styles.text}>{value.number}</span>
            </div>
            {value.select && (
                <select className={styles.select} value={value.number.toString()} onChange={handleSelectChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            )}
        </div>
    );
}
