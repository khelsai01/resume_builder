import { useState } from 'react';

const Tooltip = ({ children, tooltipText }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        className="flex items-start"
      >
        {children}
      </div>
      {isTooltipVisible && (
        <div className="absolute bottom-full mb-2 w-max px-2 py-1 text-sm text-white bg-gray-800 rounded">
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default Tooltip;