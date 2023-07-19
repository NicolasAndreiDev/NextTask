import { useContext } from "react";
import AllProjects from "../AllProjects";
import CreateProject from "../CreateProject";
import { UserContext } from "@/providers/UserProvider";

export default function MyProjects() {
    const { user } = useContext(UserContext);
    const projects = user?.projects?.filter((project) => project.finishedProject !== true)

    return (
        <AllProjects participate={""} projectsList={projects} title={"My Projects"}>
            <CreateProject />
        </AllProjects>
    )
}