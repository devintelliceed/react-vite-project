
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback, useState, useEffect } from 'react';


import Input from '../../components/input.jsx';
import Button from '../../components/button.jsx';
import { toDoSliceActions } from '../../store/todo-list-slice.js';

const initialProjectState = {
    title: '',
    id: '',
    description: '',
    tasks: []
};

const EditProject = memo(function EditProject() {
    const [projectState, setProjectState] = useState(initialProjectState);
    const allProjects = useSelector(state => state.toDoList.projects);
    const projectId = useSelector(state => state.toDoList.selectedProject.id);

    const selectedProject = allProjects.find((project) => project.id === projectId);
    const isNewProject = projectId === 'new';
    useEffect(() => {
        if (selectedProject) {
            setProjectState(selectedProject);
        }
        if (isNewProject) {
            setProjectState(initialProjectState);
        }
    }, [ selectedProject, isNewProject ]);
    const dispatch = useDispatch();
    const handleChangeProjectState = useCallback(e => setProjectState(prevState => {
        return {
            ...prevState,
            [e.target.name]: e.target.value,
        }
    }), [setProjectState]);
    const handleCancelProject = useCallback(() => {
        if ( projectState ===  initialProjectState ) {
            dispatch(toDoSliceActions.selectProject(null));
        } else {
            alert('you have unsaved project change!')
        }
        }, [projectState, dispatch]);


    return <div className="fixed left-[330px] w-[50rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <Button
                        onClick={handleCancelProject}
                        className="bg-gray-200 text-stone-800 hover:bg-gray-400 hover:border-gray-500"
                    >
                        Cancel
                    </Button>
                </li>
                <li>
                    <Button
                        className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-gray-500 hover:border-gray-500"
                    >
                        Save
                    </Button>
                </li>
            </menu>
            <div>
                <Input label="title" name='title' value={projectState.title} onChange={handleChangeProjectState} />
                <Input label="description" name='description' value={projectState.description} onChange={handleChangeProjectState} isTextArea rows="6"/>
            </div>
        </div>;
});

export default EditProject;
