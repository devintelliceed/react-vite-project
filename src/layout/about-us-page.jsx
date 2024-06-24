
import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../components/button.jsx';
import image from '../assets/under construction.jpg';
import { mainSliceActions } from '../store/main-slice.js';
import { SOURCE_TYPE } from '../constants/types-const.js';

const AboutUsPage = memo(function HomePage() {
    const dispatch = useDispatch();
    const handleChangeSource = useCallback(action => {dispatch(mainSliceActions.setSource(action));}, [dispatch]);

    return <>
        <header className="flex flex-col items-center p-5">
            <h2 className="text-4xl text-gray-500 font-bold truncate"><strong> About Us! </strong></h2>
            <img src={ image } alt="Page under construcnion" className="object-center object-fill h-4/4 w-3/6 "/>
            <Button
                onClick={() => handleChangeSource(SOURCE_TYPE.HISTORY_PAGE)}
                className=" m-2 bg-gray-200 hover:bg-gray-300 hover:border-gray-400 rounded-md shadow-2xl">
                <strong> Leave this page </strong>
            </Button>
        </header>
    </>
});

export default AboutUsPage;
