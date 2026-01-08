"use client"

import NavBar from "@/app/components/Navigation/NavBar";
import Image from "next/image";
import BlogMenu from "@/app/components/Navigation/BlogMenu";
import ProjectMenu from "@/app/components/Navigation/ProjectMenu";
import Link from "next/link";

interface NavProps {
    children: React.ReactNode;
}

export default function Nav({children}: NavProps) {

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content flex flex-col  ">
                <NavBar/>
                {children}
            </div>
            <div className="drawer-side bg-base-100 min-h-screen">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu  rounded-box w-60 pr-10">
                    <li className="mb-4">
                        <Link href="/">
                            <Image
                                src="/wdq-dark.png"
                                alt="logo"
                                width={150}
                                height={150}
                                className="w-full h-auto"
                                priority
                            />
                        </Link>
                    </li>
                    <BlogMenu/>
                    <ProjectMenu/>
                </ul>
            </div>
        </div>
    )
}