
// outsource dependencies
import { memo } from 'react';

// local dependencies
import logo from '../../assets/logo.png';
import Button from "../../components/button.jsx";

const array = ['About us', 'Contact', 'Pricing', 'Test'];

const Header = memo(function Header() {
    return <header className="d-flex grid grid-cols-6 gap-4 border-2 rounded-md shadow-sm bg-gray-100">
        <div className="flex m-2 col-start-1 col-end-5">
            <Button className="flex m-2 bg-gray-200 hover:bg-gray-300 focus:outline-none">
                <img className="object-fill h-8 w-16 mr-2" src={logo} alt="logo"/>
                <span className="font-bold text-2xl ">Learning</span>
            </Button>
            {array.map((item, index) =>
                <Button key={index} className="m-2 bg-gray-200 hover:bg-gray-300 ">
                    <span className="font-bold text-2xl m-2">{item}</span>
                </Button>)}
        </div>
        <div className="col-end-7 col-span-2">

        </div>
    </header>
});

export default Header;
