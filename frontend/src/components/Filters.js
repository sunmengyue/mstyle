import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { categories } from './filterContent';

const Filters = () => {
  const [selected, setSelected] = useState(false);

  const toggle = () => {
    if (selected) {
      // if selected is already active, then close it
      return setSelected(false);
    }
    setSelected(true);
  };

  return (
    <div className="mb-3 md:hidden">
      <div className="flex items-center cursor-pointer" onClick={toggle}>
        <h3 className="tracking-wider mr-2 my-1 uppercase font-semibold">
          Categories
        </h3>
        <span>
          {selected ? (
            <ChevronUpIcon className="h-6" />
          ) : (
            <ChevronDownIcon className="h-6" />
          )}
        </span>
      </div>
      <div className={selected ? 'content show' : 'content'}>
        {categories.map((category) => (
          <div key={uuidv4()}>
            <input
              type="checkbox"
              id={category.id}
              name={category.category}
              value={category.category}
            />
            <label className="ml-2 cursor-pointer" htmlFor={category.id}>
              {category.category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
