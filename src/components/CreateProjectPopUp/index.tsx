import PopUp from "@/components/PopUp";
import styles from './CreateProject.module.scss';
import { useState } from "react";
import { MdClose } from "react-icons/md";
import Image from "next/image";

const ColorOptions = {
    color1: "linear-gradient(to bottom right, rgb(31, 60, 226), rgb(124, 31, 199), rgb(160, 99, 211))",
    color2: "linear-gradient(to bottom right, rgb(62, 35, 216), rgb(35, 80, 202), rgb(45, 192, 192))",
    color3: "linear-gradient(to bottom right, rgb(226, 38, 13), rgb(235, 74, 10), rgb(235, 205, 37))",
    color4: "linear-gradient(to bottom right, rgb(13, 94, 24), rgb(57, 185, 52), rgb(122, 255, 133))",
    color5: "linear-gradient(to bottom right, #503928, #9a8478,#e6dcc5)"
}

export default function CreateProjectPopUp({ onClick }: { onClick: () => void }) {
    const [colorProject, setColorProject] = useState(ColorOptions.color1);
    const [value, setValue] = useState("");

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setValue(event.target.value);
        event.target.style.height = "auto";
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    const colorOptionKeys = Object.keys(ColorOptions) as Array<keyof typeof ColorOptions>;

    return (
        <PopUp>
            <div className={styles.close}>
                <MdClose className={styles.icon} onClick={onClick} />
            </div>
            <h2 className={styles.titles}>Create Project</h2>
            <div className={styles.visuProject} style={{ background: colorProject }}>
                <Image src={"/assets/fundo.png"} alt={"fundo"} height={140} width={260}/>
            </div>
            <h2 className={styles.titles}>Project title</h2>
            <textarea rows={1} placeholder={"Project Name"} value={value} className={styles.box} onChange={handleChange} />
            <h2 className={styles.titles}>Background</h2>
            <div className={styles.fundoQuadros}>
                {colorOptionKeys.map((colorOptionKey) => (
                    <div
                        key={colorOptionKey}
                        className={styles.quadro}
                        onClick={() => setColorProject(ColorOptions[colorOptionKey])}
                    ></div>
                ))}
            </div>
            <button className={styles.button} onClick={onClick}>Create</button>
        </PopUp>
    )
}