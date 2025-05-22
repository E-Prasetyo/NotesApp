import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { deleteNote,archiveNote, unarchiveNote } from '../utils/api'
import Modal from './Modal';
import useLoading from '../hooks/useLoading';

function ButtonAction({ type = "", id, archived }) {
    const [loading, toggleLoading] = useLoading();
    const navigate = useNavigate();

    function GotoPage(page) {
        navigate(`${page}`);
    }

    async function onArchiveNoteHandler(id) {
        toggleLoading();
        const { data, error } = await archiveNote(id);
        if (!error) {
            toggleLoading();
            alert(`${data.status}, ${data.message}`)
            navigate("/");
        }
    }

    async function onUnarchiveNoteHandler(id) {
        toggleLoading();
        const { data, error } = await unarchiveNote(id);
        if (!error) {
            toggleLoading();
            alert(`${data.status}, ${data.message}`)
            navigate("/");
        }
    }

    async function onDeleteNoteHandler(id) {
        toggleLoading();
        const { data, error } = await deleteNote(id);
        if (!error) {
            toggleLoading();
            alert(`${data.status}, ${data.message}`)
            navigate("/");
        }
    }

    return (
        <>
            {type === "add" && (
                <div className='homepage__action'>
                    <button className='action' type='button' title="Tambah" onClick={()=> GotoPage("/notes/new")}>
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                        </svg>
                    </button>
                </div>
            )}
            {type === "submit" && (
                <div className="add-new-page__action">
                    <button className="action" type="submit" title="Simpan" onClick={()=> GotoPage("/")}>
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                        </svg>
                    </button>
                </div>
            )}
            {type == "detail" && (
                <div className="detail-page__action">
                    {!archived && (
                        <button className="action" type="button" title="Arsipkan"  onClick={()=> onArchiveNoteHandler(id)}>
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 24 24"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.81.97H5.44l.8-.97zM5 19V8h14v11H5zm8.45-9h-2.9v3H8l4 4 4-4h-2.55z"></path>
                            </svg>
                        </button>
                    )}
                    {archived && (
                        <button className="action" type="button" title="Aktifkan" onClick={()=> onUnarchiveNoteHandler(id)}>
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 24 24"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm3-5h2.55v3h2.9v-3H16l-4-4z"></path>
                            </svg>
                        </button>
                    )}
                   
                    <button className="action" type="button" title="Hapus" onClick={()=> onDeleteNoteHandler(id)}>
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"></path>
                        </svg>
                    </button>
                </div>
            )}
            <Modal isOpen={loading} onClose={toggleLoading} />
        </>
        
    );
}

export default ButtonAction;

ButtonAction.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string,
    archived: PropTypes.bool
}