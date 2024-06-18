
import { memo } from 'react';

const AboutUsPage = memo(function HomePage() {
    return <>
        <header className="flex justify-center p-5">
            <h2 className="text-6xl text-gray-500 font-bold truncate"><strong> About Us! </strong></h2>
        </header>
    </>
});

export default AboutUsPage;
