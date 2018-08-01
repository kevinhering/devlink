import React from 'react';
import { object, func, bool, string, oneOfType } from 'prop-types';
import classnames from 'classnames';

// reactstrap
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

// proptypes
SocialInputGroup.propTypes = {
  name: string.isRequired,
  value: string.isRequired,
  prepend: oneOfType([string, object]),
  label: string,
  id: string,
  placeholder: string,
  onChange: func.isRequired,
  required: bool,
  error: string,
  displayError: bool
};

SocialInputGroup.defaultProps = {
  required: false,
  displayError: true
};

function SocialInputGroup({
  name,
  value,
  prepend,
  placeholder,
  onChange,
  required,
  error,
  displayError
}) {
  return (
    <InputGroup className="mb-4">
      {prepend && (
        <InputGroupAddon addonType="prepend">
          <InputGroupText>{prepend}</InputGroupText>
        </InputGroupAddon>
      )}
      <Input
        type="text"
        className={classnames('', { 'is-invalid': error })}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        bsSize="lg"
      />
      {displayError && error && <div className="invalid-feedback">{error}</div>}
    </InputGroup>
  );
}

export default SocialInputGroup;
