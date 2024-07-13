import WorkNameRaw from "./WorkNameRaw";
import WorkTimeRaw from "./WorkTimeRaw";
import WorkBody from "./WorkBody";
import { getMembers } from "@/data/members";
import { getMemberWorks } from "@/data/memberWorks";
import { getWorkModels } from "@/data/workModels";
import WorkProvider from "../contexts/WorkProvider";

export default async function WorkTable() {
    const members = await getMembers();
    const workModels = await getWorkModels();
    const memberWorks = await getMemberWorks();

    return (
        <div className="flex border-t border-r border-gray-600 dark:border-gray-400 overflow-hidden bg-white dark:bg-inherit">
            <WorkNameRaw members={members} />
            <div className="overflow-x-auto relative">
                <WorkTimeRaw />
                <WorkProvider members={members} memberWorks={memberWorks} workModels={workModels}>
                    <WorkBody />
                </WorkProvider>
            </div>
        </div>
    );
}
