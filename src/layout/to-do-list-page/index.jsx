
import _ from 'lodash';
import { memo } from 'react';
import SideBar from './side-bar.jsx';
import { useSelector } from 'react-redux';

import image from '../../assets/caveman-procastination.jpeg'
import PropTypes from 'prop-types';
import Button from '../../components/button.jsx';
import Input from '../../components/input.jsx';

const ToDoListPage = memo(function HomePage() {
    const selectedProject = useSelector(state => state.toDoList.selectedProject);

    return <div >
        <SideBar />
        {selectedProject
            ? <ActiveProjectPage project={selectedProject} />
            : <div className="fixed left-[650px] m-5 w-3/4">
                <h2 className="flex text-5xl text-gray-500 font-bold truncate pl-4">
                    <strong> Please select the Project! </strong>
                </h2>
                <img
                    className="object-cover w-3/5 "
                    src={ image } alt="no selected project image"/>
            </div>
        }

    </div>
});

export default ToDoListPage;

const ActiveProjectPage = memo(function ActiveProjectPage() {
    const selectedProject = useSelector(state => state.toDoList.selectedProject);
    const { description, title, tasks } = selectedProject;

    return <div className="fixed left-[330px]">
        <div className="flex justify-center border-b-2 border-gray-300">
            <header className="flex flex-col">
                <h2 className="text-4xl text-gray-500 font-bold truncate justify-center border-b-gray-400"><strong> {title} </strong></h2>
                <p className="my-4">{description}</p>
            </header>
        </div>
        <div className="fixed left-[320px]">
            <ul>
                {_.isArray(tasks) && tasks.map((taskItem) => {
                    return <TaskItem key={taskItem.id} taskItem={taskItem}/>
                })}
            </ul>
        </div>
    </div>
});

const TaskItem = memo(function TaskItem({ taskItem }) {
    const { id, task, description, done, timeRequired, calories, } = taskItem;
    return <li className="block border-b-2 border-gray-300 m-2 mx-4">
        <div className="grid grid-cols-6">
            <div className="flex flex-row m-2 col-start-1 col-end-2">
                <Input className="align-middle m-4 mt-6" type="checkbox" checked={done} onChange={() => {
                    console.log(taskItem, id)
                }}/>
            </div>
            <div className="flex flex-col m-2 col-start-2 col-end-11">
                {task && <h3 className="text-3xl text-gray-500 mr-3">{task}</h3>}
                {timeRequired && <p className="text-l text-gray-400 mr-2">{timeRequired}</p>}
                {description && <p className="text-l text-gray-400 mr-2">
                    {description}{calories && <strong className="mx-2">({ calories } Kcal)</strong>}
                </p>}

            </div>
            <div className="col-end-12 col-span-1 m-2 flex flex-col-reverse">
                <Button
                    className="text-xl m-3 cursor-pointer p-2 hover:border-gray-400 hover:text-white hover:bg-gray-400"
                >
                    <svg className="w-6" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
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

const Priority = memo(function Priority({ priority }) {
    let icon;
    switch (priority) {
        case 'High':
            icon = <svg className="w-8 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                    d="M246.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 109.3 361.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160zm160 352l-160-160c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 301.3 361.4 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z"/>
            </svg>;
            break;
        case 'Medium':
            icon = <svg className="w-8 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                    d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>
            </svg>
            break;
        case 'Low':
            icon = <svg className="w-8 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                    d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
            </svg>
            break;
        default:
            icon = null;
    }
    return icon
});
Priority.propTypes = {
    priority: PropTypes.string.isRequired,
}
