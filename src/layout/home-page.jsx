
import { memo } from 'react';

const HomePage = memo(function HomePage() {
    return <>
        <header className="flex justify-center p-5">
            <h2 className="text-6xl text-gray-500 font-bold truncate"><strong> Welcome To Our Home Page! </strong></h2>
        </header>
        <p>Home page in process</p>
    </>
});

export default HomePage;
