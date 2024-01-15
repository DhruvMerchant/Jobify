import PropTypes from 'prop-types';

const FormRowSelect = ({ name, labelText, list, defaultValue = '' }) => {
    return (
      <div className='form-row'>
        <label htmlFor={name} className='form-label'>
          {labelText || name}
        </label>
        <select
          name={name}
          id={name}
          className='form-select'
          defaultValue={defaultValue}
        >
          {list.map((itemValue) => {
            return (
              <option key={itemValue} value={itemValue}>
                {itemValue}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  FormRowSelect.propTypes = {
    name: PropTypes.string, // Define 'type' prop with the expected type and any validation rules
    labelText: PropTypes.string, // Define 'name' prop
    // list: PropTypes.string, // Define 'labelText' prop (optional)
    defaultValue: PropTypes.string, // Define 'defaultValue' prop (optional)
  };

  export default FormRowSelect;