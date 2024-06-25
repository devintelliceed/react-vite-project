import _ from 'lodash';
import { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import EditProject from './edit-project.jsx';
import Button from '../../components/button.jsx';

const ActiveProjectPage = memo(function ActiveProjectPage() {
    const selectedProject = useSelector(state => state.toDoList.selectedProject);
    console.log('selectedProject ActivePage', selectedProject);
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

    return <div className="fixed left-[330px]">
        <div className="flex justify-center border-b-2 border-gray-300">
            <header className="flex flex-col">
                <h2 className="text-4xl text-gray-500 font-bold truncate justify-center border-b-gray-400"><strong> {title} </strong></h2>
                <p className="my-4">{description}</p>
            </header>
        </div>
        <div className="fixed left-[320px] w-3/4 border-gray-600 overflow-auto max-h-[640px] min-h-[600px]">
            <ul>
                {_.isArray(tasks) && tasks.map((taskItem) => {
                    return <TaskItem key={taskItem.id} taskItem={taskItem}/>
                })}
            </ul>
            <Button
                className="text-3xl text-gray-500 cursor-pointer p-2 hover:border-gray-400 hover:text-white hover:bg-gray-400"
            >
                +Add Task
            </Button>
        </div>
    </div>
});

const TaskItem = memo(function TaskItem({ taskItem }) {
    const { id, task, description, done, timeRequired, calories, } = taskItem;
    return <li className="block border-b-2 border-gray-300 m-2 mx-4">
        <div className="grid grid-cols-6">
            <div className="flex flex-row m-2 col-start-1 col-end-1">
                <input  type="checkbox" checked={done} onChange={() => {
                    console.log(taskItem, id)
                }}/>
            </div>
            <div className="flex flex-col m-2 col-start-2 col-end-10">
                {task && <h3 className="text-2xl text-gray-500 mr-3">{task}</h3>}
                {timeRequired && <p className="text-sm text-gray-400 mr-2">{timeRequired}</p>}
                {description && <p className="text-sm text-gray-400 mr-2">
                    {description}{calories && <strong className="mx-2">({ calories } Kcal)</strong>}
                </p>}

            </div>
            <div className="col-end-12 col-span-1 m-2 flex flex-col-reverse">
                <Button
                    className="text-xl m-3 cursor-pointer p-2 hover:border-gray-400 hover:text-white hover:bg-gray-400"
                >
                    <svg className="w-5 hover:w-7" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
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
};
