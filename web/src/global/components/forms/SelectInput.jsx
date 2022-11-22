/**
 * Helper component for rendering styled select inputs
 * Adapted from here: https://headlessui.com/react/listbox
 */
import PropTypes from 'prop-types';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Handles arrays of objects and arrays of strings
 * NOTE: if you pass an array of objects, you must also pass a displayKey and valueKey, if you pass an array of strings, you can pass a displayKey and valueKey, but they will be ignored
 * @param {Object} props
 * @param {function} props.change - the change handler for the input
 * @param {string?} props.className - the className for the input wrapper
 * @param {boolean} props.disabled - whether the input is disabled
 * @param {string?} props.displayKey - the key to use for the display value if items is an array of objects, do not set if items is an array of strings
 * @param {string} props.helpText - the help text to display below the input
 * @param {(string[]|object[])} props.items - the items to display in the list, can be an array of strings or objects
 * @param {string} props.label - the label for the input
 * @param {boolean} props.multiple - whether the input is a multiple select, if true, selectedValue must be an array of strings or objects
 * @param {string} props.name - the name of the input
 * @param {string?} props.placeholder - the placeholder for the input
 * @param {boolean} props.required - whether the input is required
 * @param {(string|string[])} props.selectedValue - the current value of the input, for multiple selects, this is an array of values
 * @param {string?} props.valueKey - the key to use for the value if items is an array of objects, do not set if items is an array of strings
 */
const SelectInput = ({
  change
  , className = ''
  , disabled
  , displayKey
  , helpText
  , items = []
  , label
  , multiple
  , name
  , placeholder = 'Select an option'
  , required
  , selectedValue // can be a string or an array of strings (for multiple select)
  , valueKey
}) => {
  if(multiple && !Array.isArray(selectedValue)) {
    console.error(`Error in SelectInput for name: ${name}: selectedValue must be an array for multiple select, received ${typeof selectedValue}`, selectedValue);
    return null;
  }
  if(items[0] && typeof items[0] === 'object' && (!displayKey || !valueKey)) {
    console.error(`Error in SelectInput for name: ${name}: if items is an array of objects, you must also pass displayKey and valueKey`);
    return null;
  }
  if(items[0] && typeof items[0] === 'string' && (displayKey || valueKey)) {
    console.warn(`Error in SelectInput for name: ${name}: if items is an array of strings, you shouldn't pass a displayKey or valueKey`);
  }

  // get the item type so we know how to handle it
  const itemType = typeof items?.[0]

  const getSelectedItem = () => {
    if(!selectedValue) return null;
    if(itemType === 'string') {
      return selectedValue;
    } else {
      if(multiple) return items.filter(item => item && selectedValue.includes(item[valueKey]));
      return items.find(item => item && item[valueKey] === selectedValue);
    }
  }
  const selectedItem = getSelectedItem();

  const getSelectedValueString = () => {
    if(!selectedItem || (multiple && !selectedItem?.[0])) return null;
    if(itemType === 'string') {
      // return a string containing each selected item separated by a comma
      if(multiple) return selectedItem.join(', ');
      // return the selected item string
      return selectedItem;
    } else {
      // return a string containing each selected item's display value separated by a comma
      if(multiple) return selectedItem.map(item => item && item[displayKey]).join(', ');
      // return the selected item's display value
      return selectedItem[displayKey];
    }
  }
  const selectedDisplay = getSelectedValueString();

  const handleChange = (selectedItem) => {
    // can be a string or an array of strings
    if(itemType === 'string') {
      return change({ target: { name, value: selectedItem } });
    } else {
      if(multiple) {
        const selectedValues = selectedItem.map(item => item[valueKey]);
        return change({ target: { name, value: selectedValues } });
      } else {
        return change({ target: { name, value: selectedItem[valueKey] } });
      }
    }
  }

  return (
    <Listbox
      as="div"
      className={`relative w-full max-w-xs mb-4 border-transparent z-10 ${className}`}
      disabled={disabled}
      onChange={handleChange}
      name={name}
      value={selectedItem}
      by={itemType === 'string' ? undefined : valueKey}
      multiple={multiple}
    >
      {label ? (
        <Listbox.Label
          htmlFor={name}
          className="px-2 text-xs absolute top-0 origin-0 text-gray-500 bg-transparent z-10"
        >
          {label} <sup className="text-red-500">{required ? '*' : null}</sup>
        </Listbox.Label>
      )
        :
        null
      }
      <Listbox.Button
        className={`px-2 text-base text-gray-800 text-left ${label ? 'pt-4 pb-1' : 'pt-2 pb-3'} block w-full mt-0 border-2 rounded appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 border-transparent bg-indigo-50 disabled:opacity-70 `}
      >
        {({ open }) => (
          <>
            {selectedDisplay || placeholder}
            {open ? <ChevronUpIcon className="h-5 w-5 text-gray-400 absolute right-2 top-3" aria-hidden="true" /> : <ChevronDownIcon className="h-5 w-5 text-gray-400 absolute right-2 top-3" aria-hidden="true" />}
          </>
        )}
      </Listbox.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        {items?.length > 0 && (
          <Listbox.Options className="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-sm bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {items?.map((item) => (
              item && (
                <Listbox.Option
                  key={`option_${itemType === 'string' ? item : item[valueKey]}`}
                  value={item}
                  className={({ active }) =>
                    classNames(
                      'relative cursor-default select-none py-2 pl-8 pr-4',
                      active ? 'bg-gray-100' : 'text-gray-900'
                    )
                  }
                >
                  {({ active, selected }) => (
                    multiple ? (
                      <>
                        <span className={classNames('block truncate', selected && 'font-semibold text-indigo-600')}>{itemType === 'string' ? item : item[displayKey]}</span>
                        {selected && (
                          <span
                            className='absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600'
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    ) : (
                      <span className={classNames('block truncate', selected && 'font-semibold text-indigo-600')}>{itemType === 'string' ? item : item[displayKey]}</span>
                    )
                  )}
                </Listbox.Option>
              )
            ))}
          </Listbox.Options>
        )}
      </Transition>
      {helpText && <small className="block"><em>{helpText}</em></small>}
    </Listbox>
  )
}

SelectInput.propTypes = {
  change: PropTypes.func.isRequired
  , disabled: PropTypes.bool
  , displayKey: PropTypes.string
  , helpText: PropTypes.any
  , items: PropTypes.array.isRequired
  , label: PropTypes.string
  , multiple: PropTypes.bool
  , name: PropTypes.string.isRequired
  , placeholder: PropTypes.string
  , required: PropTypes.bool
  , selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
  , valueKey: PropTypes.string
}


export default SelectInput;