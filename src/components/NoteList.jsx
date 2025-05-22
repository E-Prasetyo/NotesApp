import Note from './Note';
import PropTypes from 'prop-types';

function NoteList({ dataNotes }) {

    if (dataNotes.length <= 0) {
        return (
            <section className="notes-list-empty">
                <p className="notes-list__empty">
                    Tidak ada catatan
                </p>
            </section>
        )
    }

    return (
        <section className="notes-list">
            {dataNotes?.length > 0 && dataNotes?.map((note) => (
                    <Note
                        key={note.id}
                        note={note}
                    />
                ))}
        </section>
    )
}

export default NoteList;

NoteList.propTypes = {
    dataNotes: PropTypes.array.isRequired
};