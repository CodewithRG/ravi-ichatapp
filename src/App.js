import './App.css';
import {Route, Routes} from 'react-router-dom'
import  Join  from './components/Join/Join';
import  Chat from './components/Chat/Chat';



function App() {

  return (
      <Routes>
        <Route path="/" element={<Join/>}/>
        <Route path="/chatroom" element={<Chat/>}/>
      </Routes>
  );
}

export default App;
