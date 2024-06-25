
import PropTypes from 'prop-types';

const labelClasses = 'text-sm font-bold uppercase text-gray-500';
const inputClasses = 'w-full p-1 border-b-2 rounded-sm border-gray-300 bg-gray-200 text-gray-600 focus:outline-none focus:border-gray-600';

const Input = ({ label, isTextArea, name, ...attr }) => {
    return <p className='className="flex flex-col gap-1 my-4'>
        <label className={labelClasses} htmlFor={name+label}>{label}</label>
        {isTextArea ? <textarea className={inputClasses} id={name+label} name={name} {...attr} />
            : <input id={name+label} name={name} className={inputClasses} {...attr} />}
    </p>
};
Input.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    isTextArea: PropTypes.bool,
};

export default Input;
