
import { memo } from 'react';
import SideBar from './side-bar.jsx';
import { useSelector } from 'react-redux';

import NoProjectSelected from './no-project-selected.jsx';
import ActiveProjectPage from './active-project.jsx';

const ToDoListPage = memo(function HomePage() {

    const selectedProject = useSelector(state => state.toDoList.selectedProject);

    return <div>
        <SideBar />
        {selectedProject === undefined
            ? <NoProjectSelected />
            : <ActiveProjectPage />}
    </div>
});

export default ToDoListPage;


