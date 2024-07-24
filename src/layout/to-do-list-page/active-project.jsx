import _ from 'lodash';
import { memo, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import EditProject from './edit-project.jsx';
import Button from '../../components/button.jsx';
import { toDoSliceActions } from '../../store/todo-list-slice.js';
import EditTask from './edit-task.jsx';

const ActiveProjectPage = memo(function ActiveProjectPage() {
    const selectedProject = useSelector(state => state.toDoList.selectedProject);
    return <>
        {selectedProject.state === 'view' && <ProjectShow />}
        {selectedProject.state === 'edit' && <EditProject />}
    </>
});
export default ActiveProjectPage;

const ProjectShow = memo(function ProjectShow () {
    const projectId = useSelector(state => state.toDoList.selectedProject.id);
    const allProjects = useSelector(state => state.toDoList.projects);
    const selectedProject = allProjects.find((project) => project.id === projectId);
    const { description, title, tasks } = selectedProject;
    const tasksDone = tasks.filter(task => task.done === true);
    const percentage = (100 * tasksDone.length) / tasks.length;

    return <div className="fixed left-[330px]">
        <div className="flex m-4 justify-center border-b-2 border-gray-300">
            <header className="flex flex-col ">
                <h2 className="text-4xl text-gray-500 font-bold truncate justify-center border-b-gray-400">
                    <strong> {title} </strong></h2>
                <p className="my-4">{description}</p>
                <p><small>Project progress {_.isNaN(percentage) ? '...' : ` ${percentage}%`}</small></p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                </div>
            </header>
        </div>
        <Tasks tasks={tasks}/>
    </div>
});

const Tasks = memo(function Tasks({ tasks }) {
    const edit = useRef();
    const [taskId, setTaskId] = useState();
    const handleOpenTaskEdit = useCallback(() => {
        edit.current.open();
    }, [edit]);
    const handleEditCurrentTask = useCallback( id => {
        setTaskId(id);
        handleOpenTaskEdit();
    }, [ handleOpenTaskEdit, setTaskId ]);
    return <>
        <EditTask ref={edit} taskId={taskId} ></EditTask>
        <div className="fixed left-[320px] w-3/4 border-gray-600 overflow-auto max-h-[640px] min-h-[600px]">
            <ul>
                {_.isArray(tasks) && tasks.map((taskItem) => {
                    return <TaskItem key={taskItem.id} taskItem={taskItem} openTaskEdit={handleEditCurrentTask} />
                })}
            </ul>
            <Button
                onClick={() => handleEditCurrentTask('new')}
                className="text-3xl ml-12 text-gray-500 cursor-pointer p-2 hover:border-gray-400 hover:text-white hover:bg-gray-400"
            >
                +Add Task
            </Button>
        </div>
    </>
});
Tasks.propTypes = {
    tasks: PropTypes.array.isRequired,
}

const TaskItem = memo(function TaskItem({ taskItem, openTaskEdit }) {
    const dispatch = useDispatch();
    const { id, task, description, done } = taskItem;
    const handleCheckTaskToggle = useCallback(() => {
        dispatch(toDoSliceActions.checkTaskToggle(id));
    }, [id, dispatch]);
    const handleEditTask = useCallback(() => openTaskEdit(id), [id, openTaskEdit]);

    return <li className="block border-b-2 border-gray-300 m-2 mx-4">
        <div className="grid grid-cols-6">
            <div className="flex flex-row m-2 col-end-1">
                <input className="hover:cursor-pointer accent-gray-500" type="checkbox" checked={done} onChange={handleCheckTaskToggle}/>
            </div>
            <div className="flex flex-col m-2 col-start-1 col-end-10">
            <h3 className="text-2xl text-gray-500 mr-3">{task}</h3>
                <p className="text-sm text-gray-400 mr-2">{description}</p>

            </div>
            <div className="col-end-12 col-span-1 m-2 flex flex-row">
                <Button
                    onClick={handleEditTask}
                    className="text-xl m-3 cursor-pointer p-2 hover:border-gray-400 hover:text-white hover:bg-gray-400"
                >
                    <svg className="w-5 hover:w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                            d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
                    </svg>
                </Button>
                <Button
                    disabled={true}
                    className="text-xl m-3 cursor-pointer p-2 hover:border-gray-400 hover:text-white hover:bg-gray-400"
                >
                    <svg className="w-5 hover:w-6" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
                    </svg>
                </Button>
            </div>
        </div>
    </li>
        ;
});

TaskItem.propTypes = {
    taskItem: PropTypes.object.isRequired,
    openTaskEdit: PropTypes.func.isRequired,
};
