import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../components/button.jsx';
import image from '../../assets/caveman-procastination.jpeg';
import { toDoSliceActions } from '../../store/todo-list-slice.js';

const NoProjectSelected = () => {
    const dispatch = useDispatch();
    const handleSelectProject = useCallback(project => {dispatch(toDoSliceActions.selectProject(project));}, [dispatch]);
    return <div className="fixed text-center left-[330px] w-3/4">
        <img
            className="object-contain mx-auto w-2/5 "
            src={image} alt="no selected project image"/>
        <h2 className="text-4xl my-4 text-gray-500 font-bold truncate">
            No Project Selected
        </h2>
        <p className="text-xl text-gray-500 mb-4">Select a project or get started with a new one</p>
        <Button
            className="bg-gray-200 text-stone-800 hover:bg-gray-400 hover:border-gray-500"
            onClick={() => handleSelectProject(null)}
        >
            Create new project
        </Button>
    </div>
};
export default NoProjectSelected;
