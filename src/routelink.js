import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from './App';
import Weather from './components/Weather';

const routesLink = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/weather" element={<Weather />} />
    </>
  )
);

export default routesLink;