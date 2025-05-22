const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};

const dictionary = {
  en: {
    //Header
    titleApp: "Notes App",
    archiveMenu: "Archive",
    //Login
    loginTitle: "Login to use app, please.",
    askAccount: "Don't have an account?",
    linkRegister: "Register here",
    buttonLogin: "Login",
    //Register
    registerTitle: "Fill the form to register account.",
    askAccountRegister: "Already have an account?",
    linkLogin: "Login here",
    buttonRegister: "Register",
    //HomePage
    homeTitle: "Active Notes",
    //ArchivePage
    archivesTitle: "Archive Notes",
    //Header
    placeholderSearch: "Search by title ..."
  },
  id: {
    //Header
    titleApp: "Aplikasi Catatan",
    archiveMenu: "Terarsip",
    //Login
    loginTitle: "Yuk, login untuk menggunakan aplikasi.",
    askAccount: "Belum punya akun?",
    linkRegister: "Daftar di sini",
    buttonLogin: "Masuk",
    //Register
    registerTitle: "Isi form untuk mendaftar akun.",
    askAccountRegister: "Sudah punya akun?",
    linkLogin: "Masuk di sini",
    buttonRegister: "Daftar",
    //HomePage
    homeTitle: "Catatan Aktif",
    //ArchivePage
    archivesTitle: "Catatan Arsip",
    //Header
    placeholderSearch: "Cari berdasarkan judul ..."

  }
};

export { showFormattedDate, dictionary };
