import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="bg-purple-900 flex justify-between p-4 px-5 items-center w-full">
            <h1 className="text-2xl font-semibold text-white">Redux Blog</h1>
            <nav>
                <ul className="flex gap-5 text-white">
                    <li className="hover:underline"><Link to="/">Home</Link></li>
                    <li className="hover:underline"><Link to="post">Post</Link></li>
                    <li className="hover:underline"><Link to="user">User</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header