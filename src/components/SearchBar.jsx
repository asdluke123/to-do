import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
const SearchBar = ({setSearching}) => {
  return (
    <div className='search-comp'><span><SearchIcon color='inherit' /></span><input className="searchBar"placeholder='Search for a To-Do'type='text' onChange={(e)=>setSearching(e.target.value)}></input></div>
  )
}

export default SearchBar