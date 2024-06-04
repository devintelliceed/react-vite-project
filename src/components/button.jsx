
// outsource dependencies
import { memo } from 'react';
import PropTypes from 'prop-types';


const Button = memo(function Button({ onClick, children, ...attr }) {
    return <button onClick={onClick} {...attr}>{children}</button>;
});

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
};

export default Button;
