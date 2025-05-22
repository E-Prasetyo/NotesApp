import { createContext } from 'react';

const LocaleContext = createContext({
    user:{},
    accessToken: null,
    lang: '',
    theme: '',
    setLogIn: (value)=>{},
    setLogOut: ()=>{},
    setLanguage: () => { },
    setTheme: () => { }
});

export default LocaleContext;