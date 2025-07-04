import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavLink from '@/components/navbar/NavLink';

const Navbar = () => {
    return (
        <div className='fixed top-0 w-full bg-white shadow-sm z-20'>
            <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
                <Link href="/">
                    <Image src="/logo.png" width={200} height={200} alt='logo' priority />
                </Link>
                <NavLink />
            </div>
        </div>
    )
}

export default Navbar