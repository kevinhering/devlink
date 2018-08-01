import React from 'react';
import { func, bool, string } from 'prop-types';
import classnames from 'classnames';

import { FormGroup, Label, Input } from 'reactstrap';

// proptypes
FormInputGroup.propTypes = {
  type: string.isRequired,
  name: string.isRequired,
  value: string.isRequired,
  label: string,
  id: string,
  placeholder: string,
  onChange: func.isRequired,
  required: bool,
  info: string,
  error: string,
  displayError: bool,
  disabled: bool
};

FormInputGroup.defaultProps = {
  type: 'text',
  required: false,
  displayError: true,
  disabled: false
};

function FormInputGroup({
  type,
  name,
  value,
  id,
  label,
  placeholder,
  onChange,
  required,
  info,
  error,
  displayError,
  disabled
}) {
  return (
    <FormGroup className="mb-4">
      {label && (
        <Label htmlFor="{id}" size="lg">
          {label}
        </Label>
      )}

      <Input
        type={type}
        className={classnames({ 'is-invalid': error })}
        name={name}
        value={value}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        disabled={disabled}
        bsSize="lg"
      />
      {displayError && error && <div className="invalid-feedback">{error}</div>}
      {info && <small className="form-text text-muted">{info}</small>}
    </FormGroup>
  );
}

export default FormInputGroup;
