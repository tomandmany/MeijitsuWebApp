import Link from "next/link"

const MemberNameCell = ({ id, name }: Member) => {
  return (
    <Link
      className="px-6 py-2 block text-nowrap border-b last:border-b-0 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
      href={`/members/${id}`}
    >
      {name}
    </Link>
  )
}

export default MemberNameCell