import React, { lazy, useEffect, useState } from 'react';
import LocaleContext from './LocaleContext';
import { putAccessToken } from '../utils/api';
import { func } from 'prop-types';

const LocaleConsumer = LocaleContext.Consumer;

const LocalProvider = ({ children }) => {
    const [state, setState] = useState({
        lang: localStorage.getItem('lang') || 'id',
        theme: localStorage.getItem('theme') || 'light',
        accessToken: localStorage.getItem('accessToken') || null
    })

    function setLogIn(token) {
        setState((prevState) => {
            return {
                ...prevState,
                accessToken: token
            }
        });
    }

    function setLogOut() {
        setState((prevState) => {
            return {
                ...prevState,
                accessToken: null
            }
        });
    }

    function setLanguage() {
        setState((prevState) => {
            return {
                ...prevState,
                lang: prevState.lang == 'id' ? 'en' : 'id'
            }
        });
        localStorage.setItem('lang', state.lang == 'id' ? 'en' : 'id');
    }

    function setTheme() {
        setState((prevState) => {
            return {
                ...prevState,
                theme: prevState.theme == 'light' ? 'dark' : 'light'
            }
        });
        localStorage.setItem('theme', state.theme == 'light' ? 'dark' : 'light');
    }

    function setUserContext(data) {
        setState((prevState) => {
            return {
                ...prevState,
                user: data
            }
        });
    }
    
    // const valueContext = React.useMemo(() => {
    //     return {
    //         isLoggedIn: state.isLoggedIn,
    //         lang: state.lang,
    //         theme: state.theme,
    //         setLogIn: setLogIn,
    //         setLogOut: setLogOut,
    //         setLanguage: setLanguage
    //     }
    // }, [state.lang]);

    const valueContext = {
        accessToken: state.accessToken,
        lang: state.lang,
        theme: state.theme,
        setLogIn: setLogIn,
        setLogOut: setLogOut,
        setLanguage: setLanguage,
        setTheme: setTheme,
        setUserContext: setUserContext
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', state.theme);
    
    //   return () => {
    //     second
    //   }
    }, [state.theme])

    return (
        <LocaleContext.Provider value={valueContext}>
            {children}
        </LocaleContext.Provider>
    );
}

export default LocalProvider;
export {
    LocaleConsumer
}
