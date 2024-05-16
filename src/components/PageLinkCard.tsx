import Link from "next/link"
import { ReactNode } from "react";

interface PageLinkCardProps {
    children: ReactNode;
    url: string;
}

const PageLinkCard = ({children, url}: PageLinkCardProps) => {
    return (
        <Link href={`/${url}`} className="flex flex-wrap justify-center text-nowrap gap-4 items-center text-2xl border-4 rounded p-4 border-gray-700 dark:border-gray-300 hover:scale-105 transition">
            {children}
        </Link>
    )
}

export default PageLinkCard