import React, { useState, useEffect } from 'react';

const ThemeSwitcher = (): JSX.Element => {
  // State variable to store the mode
  const [mode, setMode] = useState<string>(
    localStorage.getItem('mode') || 'light'
  );

  // Function to handle changes in the checkbox
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const newMode = isChecked ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('mode', newMode);
    trans();
  };

  // Function to handle the transition
  const trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
      document.documentElement.classList.remove('transition');
    }, 1000);
  };

  // Set the theme on initial load
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);

    // Add event listener to the checkbox
    const checkbox = document.querySelector<HTMLInputElement>(
      'input[name=mode]'
    );
    checkbox.addEventListener('change', handleCheckboxChange);

    // Cleanup function to remove event listener
    return () => {
      checkbox.removeEventListener('change', handleCheckboxChange);
    };
  }, [mode]);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          name="mode"
          checked={mode === 'dark'}
          onChange={handleCheckboxChange}
        />
        Dark mode
      </label>
    </div>
  );
};

export default ThemeSwitcher;
