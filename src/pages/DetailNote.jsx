import React, { Component, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getNote } from '../utils/api.js';
import { showFormattedDate } from '../utils';
import ButtonAction from '../components/ButtonAction';
import PropTypes from 'prop-types';
import NotFoundPage from './NotFoundPage';
import useLoading from '../hooks/useLoading.jsx';
import Modal from '../components/Modal.jsx';
// import parser from 'html-react-parser';


function DetailPageWrapper() {
    const { id } = useParams();
    return <DetailNote id={id} />;
}

function DetailNote({ id }) {
    const [loading, toggleLoading] = useLoading();
    const [state, setState] = useState({
        note: {}
    });

    useEffect(() => {
        toggleLoading();
        getNote(id).then((data) => {
            setState(() => {
                return {
                    note: data.data
                }
            });
            toggleLoading();
        })

      return () => {
          setState({
              note: {}
          });
      }
    }, [id])

    if (!state.note) {
        return (
            <NotFoundPage/>
        )
    }

    return (
        <section className="detail-page">
            <h3 className="detail-page__title">
                {state.note.title}
            </h3>
            <p className="detail-page__createdAt">
                {showFormattedDate(state.note.createdAt)}
            </p>
            <div className="detail-page__body">
                {/* {parser(this.state.note.body)} */}
                {state.note.body}
            </div>
            <ButtonAction type='detail' id={state.note.id} archived={state.note.archived} />
            <Modal isOpen={loading} onClose={toggleLoading} />
        </section>
    )
}

export default DetailPageWrapper;


DetailNote.propTypes = {
    id: PropTypes.string.isRequired
}