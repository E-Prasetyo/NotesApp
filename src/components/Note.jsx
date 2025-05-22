import { showFormattedDate } from '../utils/index.js' 
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import parser from 'html-react-parser';

function Note({ note }) {
    const { id, title, createdAt, body } = note;
    
    return (
        <article className='note-item'>
            <h3 className="note-item__title">
                <Link to={`notes/${id}`}>{title}</Link>
            </h3>
            <p className="note-item__date">
                {showFormattedDate(createdAt)}
            </p>
            <p className="note-item__body">
                {/* {parser(body)} */}
                {body}
            </p>
        </article>
    )
}
export default Note;

Note.propTypes = {
    note: PropTypes.object.isRequired
};
