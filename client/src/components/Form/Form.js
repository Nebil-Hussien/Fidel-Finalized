import React from "react";

const Form = ({ onSubmit, children }) => {
  return (
    <form className="form" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

const Group = ({ children, className }) => {
  return <div className={`form__group ${className}`}>{children}</div>;
};

const Label = ({ children, controlId }) => {
  return (
    <label className="form__label" htmlFor={controlId}>
      {children}
    </label>
  );
};

const Control = ({
  type,
  placeHolder,
  onChange,
  onClick,
  style,
  value,
  controlId,
  required,
  min,
  max,
  className,
}) => {
  return (
    <input
      style={style}
      min={min}
      max={max}
      className={`form__input ${className && className}`}
      type={type}
      placeholder={placeHolder}
      onChange={onChange}
      id={controlId}
      value={value}
      required={required && true}
    />
  );
};

const TextArea = ({
  placeHolder,
  onChange,
  value,
  controlId,
  required,
  min,
  max,
  className,
  children,
}) => {
  return (
    <textarea
      min={min}
      max={max}
      className={`form__textarea ${className && className}`}
      placeholder={placeHolder}
      onChange={onChange}
      id={controlId}
      value={value}
      required={required && true}
    >
      {children}
    </textarea>
  );
};

const Select = ({
  style,
  onChange,
  value,
  controlId,
  options = [],
  required,
  loading,
}) => {
  return (
    <select
      style={style}
      disabled={loading}
      className="form__select"
      required={required}
      value={value}
      id={controlId}
      onChange={onChange}
    >
      <option value="" hidden>
        {loading ? "Loading..." : "Choose"}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

const Radio = ({
  onChange,
  value,
  controlId,
  name,
  label,
  required,
  defaultChecked,
  checked,
}) => {
  return (
    <div className="form__radio-group">
      <input
        className="form__radio-input"
        type="radio"
        onChange={onChange}
        id={controlId}
        value={value}
        name={name}
        required={required && true}
        defaultChecked={defaultChecked}
        checked={checked}
      />
      <label className="form__radio-label" htmlFor={controlId}>
        <span className="form__radio-button"></span>
        {label}
      </label>
    </div>
  );
};

const Check = ({
  onChange,
  value,
  controlId,
  name,
  label,
  required,
  defaultChecked,
  checked,
}) => {
  return (
    <label className="form__checkbox-group">
      {label}
      <input
        type="checkbox"
        onChange={onChange}
        id={controlId}
        value={value}
        name={name}
        required={required && true}
        defaultChecked={defaultChecked}
        checked={checked}
      />
      <span className="checkmark"></span>
    </label>
  );
};

const File = ({
  accept,
  onChange,
  value,
  controlId,
  required,
  min,
  max,
  className,
}) => {
  return (
    <input
      min={min}
      max={max}
      accept={accept}
      className={`form__file ${className && className}`}
      type="file"
      onChange={onChange}
      id={controlId}
      value={value}
      required={required && true}
    />
  );
};

Form.Group = Group;
Form.Control = Control;
Form.TextArea = TextArea;
Form.Radio = Radio;
Form.Check = Check;
Form.File = File;
Form.Select = Select;
Form.Label = Label;

export default Form;
