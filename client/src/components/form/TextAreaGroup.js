import React from 'react';
import { func, bool, string } from 'prop-types';

import { FormGroup, Label, Input } from 'reactstrap';

// proptypes
TextAreaGroup.propTypes = {
  name: string.isRequired,
  value: string.isRequired,
  label: string,
  id: string,
  placeholder: string,
  onChange: func.isRequired,
  required: bool,
  info: string,
  error: string,
  displayError: bool
};

TextAreaGroup.defaultProps = {
  required: false,
  displayError: true
};

function TextAreaGroup({
  name,
  value,
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
    <FormGroup className="mb-4">
      {label && (
        <Label htmlFor={id} size="lg">
          {label}
        </Label>
      )}

      <Input
        type="textarea"
        className={error && 'is-invalid'}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        bsSize="lg"
      />
      {displayError && error && <div className="invalid-feedback">{error}</div>}
      {info && <small className="form-text text-muted">{info}</small>}
    </FormGroup>
  );
}

export default TextAreaGroup;
