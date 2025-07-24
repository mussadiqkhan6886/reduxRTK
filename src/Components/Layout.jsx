import { Outlet } from 'react-router-dom';
import Header from './Header';
const Layout = () => {
    return (
        <>
            <Header />
            <main className="text-gray-400">
                <Outlet />
            </main>
        </>
    )
}

export default Layout