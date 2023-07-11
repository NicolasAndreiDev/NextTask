import PopUp from "@/components/PopUp";
import styles from './CreateProject.module.scss';
import { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECT } from "@/graphql/projects/CreateProject";
import { ColorOptions } from "../ColorOptions";
import { useRouter } from "next/navigation";
import { UserContext } from "@/providers/UserProvider";

export default function CreateProjectPopUp({ onClick }: { onClick: () => void }) {
    const { user } = useContext(UserContext);
    const route = useRouter();
    const [colorProject, setColorProject] = useState(ColorOptions.color1);
    const [value, setValue] = useState("");
    const [createProject, { loading, error }] = useMutation(CREATE_PROJECT);

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setValue(event.target.value);
        event.target.style.height = "auto";
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    function handleSubmit() {
        createProject({
            variables: {
                project: {
                    userId: user?.id,
                    titleProject: value,
                    colorProject: colorProject,
                    dataAcesso: new Date(),
                    finishedProject: false,
                    participantes: [
                        user?.email,
                    ]
                }
            }
        })
        .then(() => {
            route.push(`/projects/${value}`)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const colorOptionKeys = Object.keys(ColorOptions) as Array<keyof typeof ColorOptions>;

    return (
        <PopUp>
            <div className={styles.createProj}>
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
                    {colorOptionKeys.map((colorOption) => (
                        <div
                            key={colorOption}
                            className={styles.quadro}
                            onClick={() => setColorProject(ColorOptions[colorOption])}
                        ></div>
                    ))}
                </div>
                <button className={styles.button} onClick={() => {onClick(), handleSubmit()}}>Create</button>
            </div>
        </PopUp>
    )
}