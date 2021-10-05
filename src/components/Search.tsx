import React, { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="search w-100 position-relative">
      <input
        type="text"
        value={search}
        name=""
        placeholder="Enter your search..."
        id=""
        className="form-control me-2 w-100 my-2"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
