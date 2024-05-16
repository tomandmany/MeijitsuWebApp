import { ModeToggle } from '../ModeToggle'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='p-4 border-b-2 border-b-gray-300 dark:border-b-gray-600 flex items-center gap-4 sticky top-0 bg-orange-50 dark:bg-inherit'>
      <ModeToggle />
      <Link href='/'>
        <Image src='/icon.png' alt='アイコン' width={40} height={40} />
      </Link>
    </header>
  )
}

export default Header