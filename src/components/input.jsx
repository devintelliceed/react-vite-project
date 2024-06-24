
import PropTypes from 'prop-types';

const Input = ({ label, isTextArea, ...attr }) => {
    return <div>
        <label htmlFor={name}>{label}</label>
        {isTextArea ? <textarea id={name} {...attr}></textarea> : <input {...attr} />}
    </div>
};
Input.propTypes = {
    label: PropTypes.string,
    isTextArea: PropTypes.bool,
};

export default Input;
