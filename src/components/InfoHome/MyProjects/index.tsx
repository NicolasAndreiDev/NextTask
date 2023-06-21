import AllProjects from "../AllProjects";
import CreateProject from "../CreateProject";

export default function MyProjects() {
    return (
        <AllProjects title={"My Projects"}>
            <CreateProject />
        </AllProjects>
    )
}