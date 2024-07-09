import { getMembers } from "@/data/members";
import WorkNameRaw from "./WorkNameRaw";
import WorkRaw from "./WorkRaw";
import { getMemberWorks } from "@/data/memberWorks";
import { getWorkModels } from "@/data/workModels";

export default async function WorkTable() {
    const members = await getMembers();
    const workModels = await getWorkModels();
    const memberWorks = await getMemberWorks();

    return (
        <div className="flex border-t border-r border-gray-600 dark:border-gray-400 overflow-hidden bg-white dark:bg-inherit">
            <WorkNameRaw members={members} />
            <WorkRaw members={members} memberWorks={memberWorks} workModels={workModels} />
        </div>
    );
}
