
//outsource dependencies
import _ from 'lodash';
import { memo, useCallback } from 'react'

//local dependencies
import logo from '../assets/logo.png';
import UserInfo from './user-info.jsx';
import Button from '../components/button.jsx';
import { SOURCE_TYPE } from '../constants/types-const.js';
import { sideMenuItems } from '../constants/layoutConsts.jsx';
import { mainSliceActions } from '../store/main-slice.js';
import { useDispatch, useSelector } from 'react-redux';

const SideMenu = memo( function SideMenu() {
    const isMenuOpen = useSelector(state => state.main.isMenuOpen);

    const dispatch = useDispatch();
    const handleToggleSideMenu = useCallback(() => {dispatch(mainSliceActions.toggleMenu());}, [dispatch]);
    const handleChangeSource = useCallback(action => {dispatch(mainSliceActions.setSource(action));}, [dispatch]);

    return (
        <div>
            {isMenuOpen ? (
                <div className="bg-black/70 fixed w-full h-screen z-10 top-0 left-0" onClick={handleToggleSideMenu}></div>
            ) : null}
            <div
                className={
                    isMenuOpen
                        ? 'fixed top-0 left-0 w-[310px] h-screen bg-gray-200 z-10 duration-300'
                        : 'fixed top-0 left-[-100%] w-[300px] h-screen bg-gray-100 z-10 duration-300'
                }
            >
                <header className="flex my-2 items-center justify-between w-full">
                    <div className="flex ">
                        <Button
                            onClick={() => handleChangeSource(SOURCE_TYPE.HISTORY_PAGE)}
                            className="flex m-2 bg-gray-200 hover:bg-gray-300 hover:border-gray-400 rounded-md shadow-2xl"
                        >
                            <img className='object-fill h-8 w-16' src={ logo } alt='logo'/>
                            <span className="font-bold text-2xl text-gray-500">Learning Project</span>
                        </Button>
                    </div>
                </header>
                <Button
                    onClick={handleToggleSideMenu}
                    className="absolute top-4 right-[-90px] bg-gray-300 hover:bg-gray-400 hover:border-gray-400 rounded-md shadow-2xl"
                >
                    <svg
                        className="w-8"
                        viewBox="0 0 448 512"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                        />
                    </svg>
                </Button>
                <hr className="border-2 mt-3 border-gray-300 rounded-md bg-gray-100 shadow-2xl"/>
                <div className="flex items-center justify-center w-full my-3">
                    <span className="font-bold text-xl text-gray-400 mr-2 truncate">Welcome:</span>
                </div>
                <div className="flex items-center justify-center w-full">
                    <UserInfo/>
                </div>
                <hr className="border-2 mt-3 border-gray-300 rounded-md shadow-sm bg-gray-100"/>
                <nav>
                    <ul className="flex flex-col text-gray-500">
                        {_.isArray(sideMenuItems) && sideMenuItems.map(({ icon, text, link }) =>
                            <li
                                key={text}
                                onClick={() => handleChangeSource(link)}
                                className="text-xl flex cursor-pointer p-2 hover:text-white hover:bg-gray-400">
                                {icon}
                                <strong className="truncate">{text}</strong>
                            </li>)
                        };
                    </ul>
                </nav>
            </div>
        </div>
    );
});

export default SideMenu;

