import PropTypes from 'prop-types';
import { dictionary } from '../utils';
import useLocaleContext from '../hooks/useLocaleContext';

function SearchInput({ onSearchChangeHandler }) {
    const localeCtx = useLocaleContext();
    
        return (    
            <section className="search-bar">
                <input
                    onChange={(event) => onSearchChangeHandler(event)}
                    type="text"
                    placeholder={`${dictionary[localeCtx.lang].placeholderSearch}`}
                />
            </section>
        )
}

export default SearchInput;

SearchInput.propTypes = {
    onSearchChangeHandler: PropTypes.func.isRequired
};