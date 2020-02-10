import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './SearchInput.module.scss';

const SearchInput = (props) => {
  const [ searchValue, setSearchValue ] = useState('');
  const handleInputChange = ({ target }) => {
    setSearchValue(target.value);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(searchValue){
      props.history.push(`/s/photos/${searchValue}`)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} >
        <input
          onChange={handleInputChange}
          value={searchValue}
          className={styles.Search_input}
          placeholder="Search free high-resolution photo"
        />
    </form>
  );
};

const SearchInputWithRouter = withRouter(SearchInput);

export { SearchInputWithRouter as SearchInput };