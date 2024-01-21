import { useState } from "react";
import { useGlobalContext } from "../contextAPI/context";

const Search = () => {

    const [text, setText] = useState('');
    const { setSearchTerm } = useGlobalContext();
    const handleChange = (e) => {
        setText(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (text) {
            setSearchTerm(text);
        }
    }

    return <div className="search-container">
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder="search a meal" value={text} onChange={handleChange} className="form-input" />
            <button type='submit' className="btn">search</button>
        </form>
    </div>
}
export default Search;