import React from 'react';
import "./App.css";

function App() {

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token_in_url = urlParams.get('token');
    localStorage.setItem('token', token_in_url);
  }, [])

  return (
    <div />
  );
}
export default App;
