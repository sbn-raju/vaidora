import React, {useState} from 'react'

const FaqAccordin = ({ text, answer }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpansion = () => {
      setIsExpanded(!isExpanded);
    };
  
    return (
      <div className={`my-4 transition-all duration-300 ${isExpanded ? 'h-auto' : 'h-12'}`}>
        <div className="flex justify-between items-start">
          <p className="text-base md:text-lg text-green-4 font-medium w-5/6">{text}</p>
          <button
            className={`text-4xl font-medium transform transition-transform duration-300 ${isExpanded ? '-rotate-45' : 'rotate-0'}`}
            onClick={handleExpansion}>
              +
            </button>
        </div>
        {isExpanded && (
          <div className="w-full transition-all duration-300">
            <p className="text-sm mt-2">{answer}</p>
          </div>
        )}
      </div>
    );
}

export default FaqAccordin