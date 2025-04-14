import React from 'react'
import Link from 'next/link'

const Button = ({ text, link }) => {
    return (
        <Link href={link}>
            <div className='cursor-pointer py-4 px-8 flex jusitfy-center items-center bg-[#194bfd] hover:bg-blue-800 text-[20px] font-extrabold rounded-full '>
                {text}
            </div>
        </Link>
    )
}
export default Button