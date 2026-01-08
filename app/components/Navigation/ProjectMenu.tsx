import {usePathname} from "next/navigation";
import Link from "next/link";
import {TrafficCone} from "lucide-react";


export default function ProjectMenu() {
    const pathname = usePathname();
    const isActive = (currentPath: string) => {
        return pathname === currentPath;
    }

    return (
        <li>
            <details>
                <summary>
                    <TrafficCone size={16} />
                    Projects
                </summary>
                <ul>
                    <li><Link href="/blog" className={isActive("/blog") ? "menu-active" : ""}>blog</Link></li>
                    <li>
                        <a>Parent</a>
                        <ul>
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                            <li>
                                <a>Parent</a>
                                <ul>
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li><a>Item 3</a></li>
                </ul>
            </details>
        </li>
    )
}