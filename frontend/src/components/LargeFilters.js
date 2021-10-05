import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { categories } from './filterContent';
import { v4 as uuidv4 } from 'uuid';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { FormGroup } from '@mui/material';
import { Checkbox } from '@mui/material';
import { FormControlLabel } from '@mui/material';

const LargeFilters = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);
  const [checkedCategories, setCheckedCategories] = useState([]);

  const toggleSelected = () => {
    if (selected) {
      return setSelected(false);
    }
    setSelected(true);
  };

  const handleCheckCategory = (e) => {
    let inState = [...checkedCategories];
    let currentlyChecked = e.target.value;
    let foundInState = inState.indexOf(currentlyChecked);

    if (foundInState === -1) {
      inState.push(currentlyChecked);
    } else {
      inState.splice(foundInState, 1);
    }
    console.log(inState);
    setCheckedCategories(inState);

    // pass instate up to parent component
  };

  return (
    <div className="border-gray-300 border-t first:border-t-0 p-5 w-72">
      <div
        className="flex cursor-pointer items-center"
        onClick={toggleSelected}
      >
        <h5 className="uppercase font-semibold py-3 tracking-widest mr-3">
          Categories
        </h5>
        {selected ? (
          <ChevronUpIcon className="h-6" />
        ) : (
          <ChevronDownIcon className="h-6" />
        )}
      </div>
      <div className={selected ? 'content show' : 'content'}>
        <FormGroup>
          {categories.map((category) => (
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckCategory}
                  value={category.category}
                  id={String(category.id)}
                />
              }
              label={category.category}
              key={category.id}
            />
          ))}
        </FormGroup>
      </div>
    </div>
  );
};

export default LargeFilters;
