import { BiTimeFive } from "react-icons/bi";
import AllProjects from "../AllProjects";
import { useContext } from "react";
import { UserContext } from "@/providers/UserProvider";

export default function RecentProject() {
    const { user } = useContext(UserContext);
    const fourHoursAgo = new Date();
    fourHoursAgo.setHours(fourHoursAgo.getHours() - 4);
    const projectsRecents = user?.projects?.filter((project) => {
        const dataAcesso = new Date(project.dataAcesso);
        return dataAcesso >= fourHoursAgo;
    });
    const Icon = <BiTimeFive />

    return (
        <>
           {projectsRecents && projectsRecents.length > 0 && <AllProjects projectsList={projectsRecents} title={"Recently Viewed"} icon={Icon} />}
        </>
    )
}
