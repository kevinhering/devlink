import React from 'react';
import { func, array, bool, string } from 'prop-types';
import classnames from 'classnames';

// reactstrap
import { FormGroup, Label, Input } from 'reactstrap';

// proptypes
SelectListGroup.propTypes = {
  name: string.isRequired,
  value: string.isRequired,
  label: string,
  id: string,
  onChange: func.isRequired,
  required: bool,
  info: string,
  options: array.isRequired,
  error: string,
  displayError: bool
};

SelectListGroup.defaultProps = {
  required: false,
  displayError: true
};

function SelectListGroup({
  name,
  value,
  label,
  id,
  onChange,
  required,
  info,
  options,
  error,
  displayError
}) {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <FormGroup className="mb-4">
      {label && (
        <Label htmlFor={id} size="lg">
          {label}
        </Label>
      )}

      <Input
        type="select"
        className={classnames('form-control form-control-lg', { 'is-invalid': error })}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        {selectOptions}
      </Input>
      {displayError && error && <div className="invalid-feedback">{error}</div>}
      {info && <small className="form-text text-muted">{info}</small>}
    </FormGroup>
  );
}

export default SelectListGroup;
