import React, { useState, useEffect, useRef } from 'react';

function InputFilter({ variable, setFunction }) {
    const [inputValue, setInputValue] = useState('');
    const [suggestionsList, setSuggestionsList] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const fetchCountrySuggestions = async () => {
            try {
                const response = await fetch(`https://dashboard-7fo2.onrender.com/suggestion/${variable}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch suggestions');
                }
                const data = await response.json();
                const countryNames = data.map(item => item._id);
                setSuggestionsList(countryNames);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountrySuggestions();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setFunction(variable, value);
        const filteredSuggestions = suggestionsList.filter(suggestion =>
            suggestion.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
        setShowSuggestions(true); 
    };
    
    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
        setFunction(variable, suggestion);
        setSuggestions([]); 
        setShowSuggestions(false); 
    };

    return (
        <div className="mb-3 w-64" ref={inputRef}>
            <input 
                className="w-full px-2 py-1 rounded border focus:outline-none focus:border-sky-500 focus:border-2"
                type="text" 
                value={inputValue} 
                onChange={handleInputChange} 
                placeholder={`Enter ${variable}`} 
            />
            {showSuggestions && (
                <ul className="absolute z-10 mt-1 py-1 w-fit bg-white rounded-md shadow-md border-1">
                    {suggestions.map((suggestion, index) => (
                        <li 
                            key={index} 
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-3 py-1 cursor-pointer text-xs hover:bg-sky-200"
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>)
            }
        </div>
    );
};

export default InputFilter
