import {useContext} from 'react'
import LocaleContext from '../contexts/LocaleContext.js'

function useLocaleContext() {
  return useContext(LocaleContext);
}

export default useLocaleContext;