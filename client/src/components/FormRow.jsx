import PropTypes from 'prop-types';

const FormRow = ({type,name,labelText,defaultValue}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        className="form-input"
        defaultValue={defaultValue || ''}
        placeholder={labelText || name}
        required
      />
    </div>
  );
};

FormRow.propTypes = {
    type: PropTypes.string.isRequired, // Define 'type' prop with the expected type and any validation rules
    name: PropTypes.string.isRequired, // Define 'name' prop
    labelText: PropTypes.string, // Define 'labelText' prop (optional)
    defaultValue: PropTypes.string, // Define 'defaultValue' prop (optional)
  };

export default FormRow;
