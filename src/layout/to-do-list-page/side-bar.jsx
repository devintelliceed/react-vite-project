
import _ from 'lodash';
import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toDoSliceActions } from '../../store/todo-list-slice.js';
import Button from '../../components/button.jsx';

const SideBar = memo( function SideBar() {
    const dispatch = useDispatch();
    const selectedProject = useSelector(state => state.toDoList.selectedProject);
    const projects = useSelector(state => state.toDoList.projects);

    const handleSelectViewProject = useCallback(id => {dispatch(toDoSliceActions.viewProject(id));}, [dispatch]);
    const handleSelectEditProject = useCallback(id => {dispatch(toDoSliceActions.editProject(id));}, [dispatch]);

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
                            ? 'text-xl flex justify-between  p-2 text-white bg-gray-400 hover:bg-gray-600'
                            : 'text-xl flex justify-between p-2 hover:text-white hover:bg-gray-400'
                        }
                    >
                        <div className='cursor-pointer' onClick={() => handleSelectViewProject(project.id)}>
                            <strong className="truncate">{project.title}</strong>
                        </div>
                        <div className='cursor-pointer' onClick={() => handleSelectEditProject(project.id)}>
                            <svg className="w-5 hover:w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path
                                    d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
                            </svg>
                        </div>
                    </li>
                )}
            </ul>
        </div>
        <div className="flex justify-center m-3 border-t-2 border-gray-300">
            <Button
                onClick={() => handleSelectEditProject('new')}
                className="text-xl m-3 flex cursor-pointer p-2 hover:border-gray-400 hover:text-white hover:bg-gray-400">
                + Add New Project
            </Button>
        </div>
    </aside>
});
export default SideBar;
