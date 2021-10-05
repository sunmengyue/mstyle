import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { XIcon, SearchIcon } from '@heroicons/react/outline';

const Search = ({ showSearchBar, setShowSearchBar }) => {
  const [text, setText] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const hideSearchBar = () => {
    setShowSearchBar(false);
  };
  const deleteSearch = () => {
    setText('');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (text.trim()) {
      history.push(`/search/${text}`);
    } else {
      history.push('/');
    }
  };

  return (
    showSearchBar && (
      <div className=" bg-brown-light py-5  border-t-2 border-gray-900">
        <div className="flex items-center max-w-6xl m-auto">
          <button className="mr-8 cursor-pointer" onClick={hideSearchBar}>
            <XIcon className="h-6" />
          </button>
          <form
            className="flex items-center flex-grow"
            onSubmit={submitHandler}
          >
            <SearchIcon className="h-6" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none ml-3 placeholder-gray-500 text-sm font-light w-full "
              onChange={handleChange}
              value={text}
            />
          </form>
          {text !== '' && (
            <p className="text-sm font-medium" onClick={deleteSearch}>
              Clear
            </p>
          )}
        </div>
      </div>
    )
  );
};

export default Search;
