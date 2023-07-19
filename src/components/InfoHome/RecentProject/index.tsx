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
    const newList = projectsRecents?.filter((project) => project.finishedProject != true)
    const Icon = <BiTimeFive />

    return (
        <>
           {newList && newList.length > 0 && <AllProjects participate={""} projectsList={newList} title={"Recently Viewed"} icon={Icon} />}
        </>
    )
}
