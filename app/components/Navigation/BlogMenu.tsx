import Link from "next/link";
import {usePathname} from "next/navigation";
import {Rss, ScrollText} from "lucide-react";


export default function BlogMenu() {
    const pathname = usePathname();
    const isActive = (currentPath: string) => {
        return pathname === currentPath;
    }

    return (
        <li>
                <summary className={isActive("/blog") ? "menu-active" : ""}>
                    <ScrollText size={16}/>
                    <Link href="/blog" >Blog</Link>
                </summary>

        </li>
    )
}