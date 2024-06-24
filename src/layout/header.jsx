
// outsource dependencies
import { useDispatch } from 'react-redux';
import { memo, useCallback } from 'react';
// local dependencies
import logo from '../assets/logo.png';
import Button from '../components/button.jsx';
//component
import UserInfo from './user-info.jsx';
import { mainSliceActions } from '../store/main-slice.js';
import { SOURCE_TYPE } from '../constants/types-const.js';

const Header = memo(function Header() {
    const dispatch = useDispatch();
    const toggleSideMenu = useCallback(() => {dispatch(mainSliceActions.toggleMenu());}, [dispatch]);
    const handleHomePage = useCallback(() => {dispatch(mainSliceActions.setSource(SOURCE_TYPE.HISTORY_PAGE));}, [ dispatch ]);

    return <header className="d-flex grid grid-cols-6 gap-4 border-2 border-gray-300 rounded-md shadow-sm bg-gray-100 h-1/6">
        <div className="flex m-2 col-start-1 col-end-5">
            <Button
                onClick={handleHomePage}
                className="flex m-2 bg-gray-200 hover:bg-gray-300 hover:border-gray-400 rounded-md shadow-2xl"
            >
                <img className="object-fill h-8 w-16 mr-2" src={logo} alt="logo"/>
                <span className="font-bold text-2xl text-gray-500">Learning Project</span>
            </Button>
            <Button
                onClick={toggleSideMenu}
                className="bg-gray-200 m-2 hover:bg-gray-300 hover:border-gray-400 rounded-md shadow-2xl"
            >
                <svg
                    className="w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                >
                    <path
                        d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                    />
                </svg>
            </Button>
        </div>
        <div className="col-end-7 col-span-2 m-2 flex flex-row-reverse" >
            <UserInfo />
        </div>
    </header>
});

export default Header;
