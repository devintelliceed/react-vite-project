
// import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/button.jsx';
import Input from '../../components/input.jsx';


// import Input from '../../components/input.jsx';
// import Button from '../../components/button.jsx';
// import { toDoSliceActions } from '../../store/todo-list-slice.js';
//
// const initialTaskState = {
//     title: '',
//     id: '',
//     description: '',
// };

const EditTask = forwardRef(function EditTask( { children, taskId }, ref) {
    const dialog = useRef();
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
    console.log(taskId);
    console.log(typeof taskId);
    return createPortal(<dialog
        ref={dialog}
        className="w-3/5 h-3/5 bg-gray-100 p-6 backdrop:bg-gray-900/80 rounded-3xl"
    >
        <menu className="flex items-center justify-end gap-4 my-4">
            <li>
                <Button
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
                        // onClick={handleCancel}
                        className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-gray-500 hover:border-gray-500"
                    >
                        Cancel
                    </Button>
                </form>
            </li>
        </menu>
        <form
            // onSubmit={handleSubmitProject}
        >
            <div>
                <Input
                    name='title'
                    label="Task title"
                    // value={projectState.title}
                    // onBlur={handleValidateTitle}
                    // onFocus={handleClearErrorTitle}
                    // onChange={handleChangeProjectState}
                />
                {/*{errorState.title && <p><small className='text-red-600'>{errorState.title}</small></p>}*/}
            </div>
            <div>
                <Input
                    rows="6"
                    isTextArea
                    name='description'
                    label="Task description"
                    // value={projectState.description}
                    // onChange={handleChangeProjectState}
                    // onBlur={handleValidateDesc}
                    // onFocus={handleClearErrorDesc}
                />
                {/*{errorState.description && <small className='text-red-600'>{errorState.description}</small>}*/}

            </div>
        </form>
        <menu className="flex items-center justify-end gap-4 my-4">
            <li>
                <Button
                    type="submit"
                    // onClick={handleSubmitProject}
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
    children: PropTypes.node.isRequired,
}

export default EditTask;
