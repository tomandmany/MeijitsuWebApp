import WorkNameRaw from "./WorkNameRaw";
import WorkTimeRaw from "./WorkTimeRaw";
import WorkBodyRaw from "./WorkBodyRaw";
import { getMembers } from "@/data/members";
import { getMemberWorks } from "@/data/memberWorks";
import { getWorkModels } from "@/data/workModels";

export default async function WorkTable() {
    const members = await getMembers();
    const workModels = await getWorkModels();
    const memberWorks = await getMemberWorks();

    return (
        <div className="flex border-t border-r border-gray-600 dark:border-gray-400 overflow-hidden bg-white dark:bg-inherit">
            <WorkNameRaw members={members} />
            <div className="overflow-x-auto relative">
                <WorkTimeRaw />
                <WorkBodyRaw members={members} memberWorks={memberWorks} workModels={workModels} />
            </div>
        </div>
    );
}
