import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { ToastContainer } from 'react-toastify';
import Router from './routes/Router';



import { baselightTheme } from "./theme/DefaultColors";



function App() {
  // const routing = useRoutes(Router);
  const theme = baselightTheme;
  return (
    <>
    <ThemeProvider theme={theme}>
      
      <CssBaseline/>
      <Router/>
    <ToastContainer/>
    </ThemeProvider>
  
     </>
  );
}

export default App;
