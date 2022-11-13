import React from "react";

const SearchBar = ({categories, query, handleOnChange, handleOnSubmit}) => {

    const result = <form className="search-form display-flex" onSubmit={handleOnSubmit}>
        <select className="search-input" name="category_id" onChange={handleOnChange}>
            <option value="">All</option>
            {categories && categories.map(function(category){
                return(<option key={category.id} value={category.id}>{category.name}</option>);
            })}
        </select>

        <label className="search-bar-container" htmlFor="search">
            <input className="search-bar" type="text" id="search" name="query" value={query} onChange={handleOnChange}/>
        </label>

        <div className="search-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
        </div>
    </form>

    return result;
}

export default SearchBar;