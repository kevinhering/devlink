import React from 'react';
import { object, func, bool, string, oneOfType } from 'prop-types';
import classnames from 'classnames';

// reactstrap
// import { InputGroupText } from 'reactstrap';

// proptypes
InputGroup.propTypes = {
  type: string.isRequired,
  name: string.isRequired,
  value: string.isRequired,
  prepend: oneOfType([string, object]),
  label: string,
  id: string,
  placeholder: string,
  onChange: func.isRequired,
  required: bool,
  info: string,
  error: string,
  displayError: bool
};

InputGroup.defaultProps = {
  type: 'text',
  required: false,
  displayError: true
};

function InputGroup({
  type,
  name,
  value,
  prepend,
  label,
  id,
  placeholder,
  onChange,
  required,
  info,
  error,
  displayError
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className="lead" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="input-group">
        {prepend && (
          <div className="input-group-prepend">
            <span className="input-group-text">{prepend}</span>
          </div>
        )}
        <input
          type={type}
          className={classnames('form-control form-control-lg', { 'is-invalid': error })}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
        />
        {displayError && error && <div className="invalid-feedback">{error}</div>}
      </div>
      {info && <small className="form-text text-muted display-block">{info}</small>}
    </div>
  );
}

export default InputGroup;
