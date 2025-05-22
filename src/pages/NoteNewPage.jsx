import React, { useState } from 'react';
import ButtonAction from '../components/ButtonAction';
import { postAddNotes } from '../utils/api';
import useLoading from '../hooks/useLoading';
import Modal from '../components/Modal';

function NoteNewPage() {
    const [loading, toggleLoading] = useLoading();
    const [state, setState] = useState({
        title: '',
        body: '',
    });

    function onTitleChangeHandler(event) {
        const { target } = event;
        setState((prevState) => {
            return {
                ...prevState,
                title: target.value
            };
        });
    }

    function onBodyChangeHandler(event) {
        const { target } = event;
        setState((prevState) => {
            return {
                ...prevState,
                body: target.value,
            }
        });
    }

    // // handler
    // function onInputHandler(event) {
    //     setState((prevState) => {
    //         return {
    //             ...prevState,
    //             body: event.target.innerHTML, // Ingat! innerHTML, bukan value.
    //         }
    //     });
    // }

    async function onSubmitHandler(event) {
        event.preventDefault();
        toggleLoading();
        const { error } = await postAddNotes(state.title, state.body);
        if (!error) {
            alert("Success, add new note");
            setState(() => {
                return {
                    title: '',
                    body: '',
                }
            })
            toggleLoading();
        } else {
            toggleLoading();
        }
        
    }

    return (
        <section className='add-new-page'>
            <form onSubmit={onSubmitHandler}>
                <div className="add-new-page__input">
                    <input
                        className="add-new-page__input__title"
                        placeholder="Catatan rahasia"
                        onChange={(e)=> onTitleChangeHandler(e)}
                    />
                    <textarea
                        className="add-new-page__input__body"
                        placeholder="Sebenarnya saya adalah ...."
                        onChange={(e) => onBodyChangeHandler(e)}
                    >
                    </textarea>
                    {/* <div
                        className="add-new-page__input__body"
                        contentEditable="true"
                        data-placeholder="Sebenarnya saya adalah ...."
                        onInput={onInputHandler}
                    > 
                    </div>*/}
                </div>
                <ButtonAction type="submit" />
                <Modal isOpen={loading} onClose={toggleLoading} />
            </form>
        </section>
    )
}

export default NoteNewPage;