import { useState } from 'react';

export default function LayoutSwitcher({ layouts }) {
  const [activeLayout, setActiveLayout] = useState('option-1');
  const ActiveComponent = layouts[activeLayout].component;
  
  return (
    <>
      {/* Fixed switcher UI */}
      <div className="fixed top-4 right-4 z-50 bg-white shadow-lg rounded-lg p-4">
        {Object.entries(layouts).map(([key, { label }]) => (
          <button
            key={key}
            type='button'
            onClick={() => setActiveLayout(key)}
            className={activeLayout === key ? 'active' : ''}
          >
            {label}
          </button>
        ))}
      </div>
      
      {/* Render active layout */}
      <ActiveComponent />
    </>
  );
}