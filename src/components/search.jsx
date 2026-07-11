import React from "react";

const Search = ({ setSearch, setPageNumber }) => {
    return (
        <form className="w-100 mb-4" onSubmit={(e) => e.preventDefault()}>
            
            <div className="input-group input-group-lg shadow-sm">
                <input
                    onChange={(e) => {
                        setPageNumber(1);
                        setSearch(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Buscar por nombre o año..."
                />
                
                <button type="submit" className="btn btn-primary px-4 fw-bold">
                    <i className="bi bi-search me-2"></i>Buscar
                </button>
            </div>

        </form>
    );
};

export default Search;