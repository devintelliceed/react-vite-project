
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
    const dispatch = useDispatch();
    const [errorState, setErrorState] = useState({ title: null, description: null });
    const [projectState, setProjectState] = useState(initialProjectState);
    const allProjects = useSelector(state => state.toDoList.projects);
    const isEditing = useSelector(state => state.toDoList.selectedProject.state === 'edit');
    const projectId = useSelector(state => state.toDoList.selectedProject.id);

    const isNewProject = projectId === 'new';
    const selectedProject = allProjects.find(project => project.id === projectId);
    const handleRemoveProject = useCallback(() => {dispatch(toDoSliceActions.removeProject(projectId));}, [dispatch, projectId]);

    useEffect(() => {
        if (!isNewProject) {
            setProjectState(selectedProject);
        }
        if (isNewProject) {
            setProjectState(initialProjectState);
        }
    }, [ selectedProject, isNewProject ]);
    const handleChangeProjectState = e => setProjectState(prevState => {
        return {
            ...prevState,
            [e.target.name]: e.target.value,
        }
    });
    const handleCancel = useCallback(() => {
        dispatch(toDoSliceActions.cancelEditing());
    }, [ dispatch ]);

    const handleClearErrorTitle = useCallback(() => setErrorState( prev => {
        return { ...prev, title: null };
    }), [setErrorState]);
    const handleClearErrorDesc = useCallback(() => setErrorState( prev => {
        return { ...prev, description: null };
    }), [setErrorState]);

    const handleValidateTitle = useCallback(() => {
        handleClearErrorTitle();
        if ( projectState.title.trim() === '' ) {
            setErrorState(prevState => {
                return {
                    ...prevState,
                    title: '* Title required.',
                }
            });
            return false;
        }
        if ( projectState.title.length < 3 ) {
            setErrorState(prevState => {
                return {
                    ...prevState,
                    title: '* Title should not be less then 3 symbols.',
                }
            });
            return false;
        }
        return true;
    }, [projectState, setErrorState, handleClearErrorTitle]);

    const handleValidateDesc = useCallback(() => {
        handleClearErrorDesc();
        if ( projectState.description.trim() === '' ) {
            setErrorState(prevState => {
                return {
                    ...prevState,
                    description: '* Description required.',
                }
            });
            return false;
        }
        if ( projectState.description.length < 5 ) {
            setErrorState(prevState => {
                return {
                    ...prevState,
                    description: '* Description should not be less then 5 symbols.',
                }
            });
            return false;
        }
        return true;
    }, [projectState, setErrorState, handleClearErrorDesc]);

    const handleValidateForm = useCallback(() => {
        const validateTitle = handleValidateTitle();
        const validateDesc = handleValidateDesc();
        if ( validateTitle && validateDesc ) {
            return true;
        }
        return false;
    }, [handleValidateTitle, handleValidateDesc]);

    const handleSubmitProject = useCallback( e => {
        e.preventDefault();
        if (handleValidateForm()) {
            dispatch(toDoSliceActions.submitProject(projectState));
        }
        }, [ dispatch, projectState, handleValidateForm ]);


    return <div>
        { isEditing
            ? <div className="bg-black/70 fixed w-full h-screen z-10 top-0 left-0"></div>
            : null}
        <div
            className={
                isEditing
                    ? 'fixed top-[100px] left-[370px] w-3/5 h-3/5 bg-gray-100 z-10 p-16 duration-300 rounded-3xl'
                    : 'fixed top-0 left-[-100%] w-[300px] h-screen bg-gray-100 z-10 duration-300'
            }
        >
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <Button
                        type="button"
                        onClick={handleRemoveProject}
                        className="bg-gray-200 text-stone-800 hover:bg-gray-400 hover:border-gray-500"
                    >
                        Delete
                    </Button>
                </li>
                <li>
                    <Button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-gray-500 hover:border-gray-500"
                    >
                        Cancel
                    </Button>
                </li>
            </menu>
            <form onSubmit={handleSubmitProject}>
                <div>
                    <Input
                        name='title'
                        label="Project title"
                        value={projectState.title}
                        onBlur={handleValidateTitle}
                        onFocus={handleClearErrorTitle}
                        onChange={handleChangeProjectState}
                    />
                    {errorState.title && <p><small className='text-red-600'>{errorState.title}</small></p>}
                </div>
                <div>
                    <Input
                        rows="6"
                        isTextArea
                        name='description'
                        label="project description"
                        onBlur={handleValidateDesc}
                        onFocus={handleClearErrorDesc}
                        value={projectState.description}
                        onChange={handleChangeProjectState}
                    />
                    {errorState.description && <small className='text-red-600'>{errorState.description}</small>}

                </div>
            </form>
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <Button
                        type="submit"
                        onClick={handleSubmitProject}
                        className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-gray-500 hover:border-gray-500"
                    >
                        Save
                    </Button>
                </li>
            </menu>
        </div>
    </div>
});

export default EditProject;
