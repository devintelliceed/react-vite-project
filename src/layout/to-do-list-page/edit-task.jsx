
import _ from 'lodash';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useMemo } from 'react';
import Input from '../../components/input.jsx';
import Button from '../../components/button.jsx';
import { toDoSliceActions } from '../../store/todo-list-slice.js';

const EditTask = forwardRef(function EditTask( { children, taskId }, ref) {

    // NOTE prepare state
    const dialog = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();

    // NOTE prepare DATA
    const dispatch = useDispatch();
    const isNewTask = useMemo( () => taskId === 'new', [taskId]);
    const allProjects = useSelector(state => state.toDoList.projects);
    const selectedProjectId = useSelector(state => state.toDoList.selectedProject.id);
    const selectedProject = allProjects.find(project => project.id === selectedProjectId);
    const selectedTask = selectedProject.tasks.find(task => task.id === taskId);
    const errorCss = ' bg-red-100 ';
    // NOTE prepare effects & ref's
    useEffect(() => {
        if (!isNewTask && selectedTask) {
            titleRef.current.value = selectedTask.task;
            descriptionRef.current.value = selectedTask.description;
        } else {
            titleRef.current.value = '';
            descriptionRef.current.value = '';
        }
    }, [ isNewTask, selectedTask ]);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
            close() {
                dialog.current.close();
            },
        };
    });

    // NOTE  prepare actions
    const handleClose = useCallback(() => {
        dialog.current.close();
    }, [dialog]);

    const handleValidateTitle = useCallback(() => {
        if (titleRef.current.value.trim().length < 3) {
            titleRef.current.className += errorCss;
            return false;
        } else {
            return true;
        }
    }, [titleRef]);
    const handleValidateDesc = useCallback(() => {
        if (descriptionRef.current.value.trim().length < 5) {
            descriptionRef.current.className += errorCss;
            return false;
        } else {
            return true;
        }
    }, [descriptionRef]);

    const handleErrorTitle = useCallback(() => {
        const currentCss = titleRef.current.className;
        if (_.some(currentCss.split(' '), e => e.trim() === errorCss.trim())) {
            titleRef.current.className = currentCss.split(' ').filter(e => e !== errorCss.trim()).join(' ');
        }
    }, [titleRef]);
    const handleErrorDesc = useCallback(() => {
        const descriptionCss = descriptionRef.current.className;
        if (_.some(descriptionCss.split(' '), e => e.trim() === errorCss.trim())) {
            descriptionRef.current.className = descriptionCss.split(' ').filter(e => e !== errorCss.trim()).join(' ');
        }
    }, [descriptionRef]);

    const handleSaveTask = useCallback(() => {

        if (handleValidateTitle() && handleValidateDesc()) {
            dispatch(toDoSliceActions.submitTask({
                id: taskId,
                task: titleRef.current.value,
                description: descriptionRef.current.value,
                done: false,
            }));
        }

    }, [ titleRef, descriptionRef, dispatch, handleValidateTitle, handleValidateDesc, taskId ]);
    return createPortal(<dialog
        ref={dialog}
        className="w-3/5 h-3/5 bg-gray-100 p-6 backdrop:bg-gray-900/80 rounded-3xl"
    >
        <menu className="flex items-center justify-end gap-4 my-4">
            <li>
                <Button
                    disabled
                    type="button"
                    // onClick={handleRemoveProject}
                    className="bg-gray-200 text-stone-800 hover:bg-gray-400 hover:border-gray-500"
                >
                    Delete
                </Button>
            </li>
            <li>
                <form method='dialog'>
                    <Button
                        type="button"
                        onClick={handleClose}
                        className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-gray-500 hover:border-gray-500"
                    >
                        Cancel
                    </Button>
                </form>
            </li>
        </menu>
        <div>
            <Input
                name='title'
                ref={titleRef}
                label="Task title"
                onFocus={handleErrorTitle}
                onBlur={handleValidateTitle}
            />
        </div>
        <div>
            <Input
                rows="6"
                isTextArea
                name='description'
                ref={descriptionRef}
                label="Task description"
                onFocus={handleErrorDesc}
                onBlur={handleValidateDesc}
            />
        </div>
        <menu className="flex items-center justify-end gap-4 my-4">
            <li>
                <Button
                    type="submit"
                    onClick={handleSaveTask}
                    className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-gray-500 hover:border-gray-500"
                >
                    Save
                </Button>
            </li>
        </menu>
        {children}
    </dialog>, document.getElementById('modal-root'));
});
EditTask.propTypes = {
    children: PropTypes.node,
    taskId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
EditTask.defaultProps = {
    children: null,
};

export default EditTask;
