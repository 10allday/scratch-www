const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
import {Field} from 'formik';

const ValidationMessage = require('../forms/validation-message.jsx');

require('../forms/input.scss');
require('../forms/row.scss');

const FormikInput = ({
    className,
    error,
    validationClassName,
    ...props
}) => (
    <div className="col-sm-9 row row-relative">
        <Field
            className={classNames(
                'input',
                className
            )}
            {...props}
        />
        {error && (
            <ValidationMessage
                className={validationClassName}
                message={error}
            />
        )}
    </div>
);


FormikInput.propTypes = {
    className: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string,
    validationClassName: PropTypes.string
};

module.exports = FormikInput;
