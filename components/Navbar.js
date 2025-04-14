import React from 'react'
import Link from 'next/link'
import Button from './Button'
const Navbar = () => {
    return (
        <nav className='max-w-screen h-[104px] bg-[#1c1c1c]'>
            <ul className='py-5 px-20 flex w-full h-full items-center justify-between outline-1 outline-slate-600 text-white'>

                <li className='flex w-max'>
                    <Link href="/" className='w-max flex items-center gap-4'>
                        <img src="/logo.svg" className="w-10 h-auto" alt="" />
                        <div>
                            <h1 className='font-extrabold text-4xl'>LinkTree</h1>
                            <p className='font-light text-[1rem]'>Clone</p>
                        </div>
                    </Link>
                </li>

                <li className='navBarHover p-2 text-[20px] font-bold hover:bg-[#535353]'>
                    <Link href="/aadimgyawali">
                        Aadim Gyawali
                    </Link>
                </li>
                <li>Tech Stack - Next JS, React JS, MongoDB, Tailwind CSS</li>

                {/* <li className='navBarHover p-2 bg-[#194bfd] hover:bg-blue-800'>
                <Link className="text-[20px] font-extrabold "href="/generate">
                   
                </Link>
            </li> */}
                <Button text="Claim your handle" link="/generate" />
            </ul>
        </nav>
    )
}

export default Navbar
