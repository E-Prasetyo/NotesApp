import React, { useEffect, useState } from 'react';
import SearchInput from '../components/SearchInput';
import NoteList from '../components/NoteList';
import { getActiveNotes } from '../utils/api';
import ButtonAction from '../components/ButtonAction';
import { dictionary } from '../utils';
import useLocaleContext from '../hooks/useLocaleContext';
import useLoading from '../hooks/useLoading';
import Modal from '../components/Modal';

function HomePage() {
  const localeCtx = useLocaleContext();
  const [ loading, toggleLoading ] = useLoading();

  const [state, setState] = useState({
    notes: [],
    search: ''
  });

  useEffect(() => {
    toggleLoading();
    getActiveNotes().then((data) => {
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
      <h2>{dictionary[localeCtx.lang].homeTitle}</h2>
      <SearchInput onSearchChangeHandler={onSearchChangeHandler} />
      <NoteList dataNotes={dataNotes} />
      <ButtonAction type="add" />
      <Modal isOpen={loading} onClose={toggleLoading} />
    </section>
  );
}

export default HomePage;