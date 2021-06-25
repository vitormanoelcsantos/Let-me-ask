import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from '../src/components/Home';
import { NewRoom } from '../src/components/NewRoom';
import { Room } from '../src/components/Room';
import { AdminRoom } from './components/AdminRoom';

import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}


export default App;
