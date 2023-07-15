import { useState, useEffect, useRef } from 'react';

const PollForm = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log('Selected Option:', value);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = event.target.value;
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  return (
    <div className="relative">
      <label className="block font-medium">Poll Options:</label>
      <button
        id="dropdownRadioHelperButton"
        className="text-gray-900 sm:text-sm md:text-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={toggleDropdown}
      >
        Select One{' '}
        <svg
          className={`w-2.5 h-2.5 ml-2.5 transition-transform ${
            dropdownOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {dropdownOpen && (
        <div
          id="dropdownRadioHelper"
          ref={dropdownRef}
          className="z-10 absolute right-0 mt-2 w-60 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownRadioHelperButton"
          >
            <li>
              <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <div className="flex items-center h-5">
                  <input
                    id="helper-radio-4"
                    name="helper-radio"
                    type="radio"
                    value="single"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onChange={handleRadioChange}
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label
                    htmlFor="helper-radio-4"
                    className="font-medium text-gray-900 dark:text-gray-300"
                  >
                    <div>Single Choice</div>
                    <p
                      id="helper-radio-text-4"
                      className="text-xs font-normal text-gray-500 dark:text-gray-300"
                    >
                      Can choose only one option.
                    </p>
                  </label>
                </div>
              </div>
            </li>
            <li>
              <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <div className="flex items-center h-5">
                  <input
                    id="helper-radio-5"
                    name="helper-radio"
                    type="radio"
                    value="multiple"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onChange={handleRadioChange}
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label
                    htmlFor="helper-radio-5"
                    className="font-medium text-gray-900 dark:text-gray-300"
                  >
                    <div>Multiple Choice</div>
                    <p
                      id="helper-radio-text-5"
                      className="text-xs font-normal text-gray-500 dark:text-gray-300"
                    >
                      Can choose multiple options.
                    </p>
                  </label>
                </div>
              </div>
            </li>
          </ul>

          <div className="p-3">
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(e, index)}
                  className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md p-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveOption(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddOption}
              className="text-indigo-500 hover:text-indigo-700"
            >
              Add Option
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PollForm;
