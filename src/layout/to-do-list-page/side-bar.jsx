
import _ from 'lodash';
import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toDoSliceActions } from '../../store/todo-list-slice.js';
import Button from '../../components/button.jsx';

const SideBar = memo( function SideBar() {
    const dispatch = useDispatch();
    const selectedProject = useSelector(state => state.toDoList.selectedProject);
    const projects = useSelector(state => state.toDoList.projects);

    const handleSelectProject = useCallback(project => {dispatch(toDoSliceActions.selectProject(project));}, [dispatch]);

    return <aside className="fixed top-24 left-0 w-[310px] h-[900px] bg-gray-200 duration-300 rounded-br-[111px] shadow-2xl">
        <div className="flex justify-center border-b-2 border-gray-300  m-3">
            <h2 className="font-bold text-xl text-gray-400 m-2 truncate ">
                Your Projects:
            </h2>
            <hr className="rounded-md bg-gray-100 shadow-2xl"/>
        </div>
        <div>
            <ul className="flex flex-col text-gray-500">
                {_.isArray(projects) && projects.map(project =>
                    <li
                        key={project.id}
                        className={selectedProject && selectedProject.id === project.id
                            ? 'text-xl flex cursor-pointer p-2 text-white bg-gray-400 hover:bg-gray-600'
                            : 'text-xl flex cursor-pointer p-2 hover:text-white hover:bg-gray-400'
                        }
                        onClick={() => handleSelectProject(project)}
                    >
                        <strong className="truncate">{project.title}</strong>
                    </li>
                )}
            </ul>
        </div>
        <div className="flex justify-center m-3 border-t-2 border-gray-300">
            <Button
                className="text-xl m-3 flex cursor-pointer p-2 hover:border-gray-400 hover:text-white hover:bg-gray-400">
                + Add Project
            </Button>
        </div>
    </aside>
});
export default SideBar;
