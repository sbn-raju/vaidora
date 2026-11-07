import React, { useState } from 'react';

const RecipeCard = ({ title, image, ingredients }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <div
                className='relative mt-16 w-40 cursor-pointer'
                // onMouseEnter={() => setIsHovered(true)}
                // onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsHovered(true)}
            >
                <div className='bg-green-4 m-2 md:m-0 h-44 p-4 rounded-xl text-white text-sm pt-20 shadow-lg flex items-end'>
                    <p>{title}</p>
                </div>
                <img src={image} className='absolute left-10 -top-16 w-24' />
            </div>

            {isHovered && (
                <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-all duration-1000'>
                    <div className='text-green-4 text-center p-4 bg-white rounded-lg shadow-lg'>
                        <h3 className='text-lg font-bold mb-2'>{title}</h3>
                        <div className='text-left'>
                        <h4 className='font-semibold'>Ingredients:</h4>
                        <ul className='list-disc list-inside'>
                            {ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    {ingredient.name} - {ingredient.quantity}
                                </li>
                            ))}
                        </ul>
                        <button 
                            className='bg-red-500 rounded-md px-4 py-1 text-white my-2'
                            onClick={() => setIsHovered(false)}>
                            Close
                        </button>
                    </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default RecipeCard;
