import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';




function App() {
  const history = useNavigate();
  useEffect(() => {
      if (localStorage.getItem("token")) {
        history("/Profile")
      }
      else {
        history("/Login")
      }
  })
  return (
    <div className="App">
        
    </div>
  );
}


export default App;
