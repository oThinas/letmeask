import { 
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';
import { Error } from './pages/Error';

import { AuthContextProvider } from './contexts/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<NewRoom />} />
          <Route path='/rooms/new' element={<NewRoom />} />
          <Route path='/rooms/:id' element={<Room />} />
          <Route path='/admin/rooms/:id' element={<AdminRoom />}></Route>
          <Route path='*' element={<Error />}></Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;