import React, { useEffect, useState } from 'react';
import SearchInput from '../components/SearchInput';
import NoteList from '../components/NoteList';
import { getArchivedNotes } from '../utils/api';
import useLocaleContext from '../hooks/useLocaleContext';
import { dictionary } from '../utils';
import Modal from '../components/Modal';
import useLoading from '../hooks/useLoading';

function ArchivesPage() {
  const localeCtx = useLocaleContext();
  const [loading, toggleLoading] = useLoading();
  const [state, setState] = useState({
    notes: [],
    search: ''
  });

  useEffect(() => {
    toggleLoading();
    getArchivedNotes().then((data) => {   
      setState((prevState) => {
        return {
          ...prevState,
          notes: data.data
        }
      });
      toggleLoading();
    });
  
    // return () => {
    //   second
    // }
  }, [])

  
  function onSearchChangeHandler(event) {
    const { target } = event;
    setState((prevState) => {
      return {
        ...prevState,
        search: target.value.toLowerCase()
      }
    });
  }

  const dataNotes = state.search ? state.notes.filter(note => note.title.toLowerCase().match(state.search)) : state.notes;

  return (
    <section className='homepage'>
      <h2>{dictionary[localeCtx.lang].archivesTitle}</h2>
      <SearchInput onSearchChangeHandler={onSearchChangeHandler} />
      <NoteList dataNotes={dataNotes} />
      <Modal isOpen={loading} onClose={toggleLoading} />
    </section>
  )
}

export default ArchivesPage;