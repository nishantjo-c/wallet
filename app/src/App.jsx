import appcss from './App.module.css';
import { Outlet, Link } from "react-router-dom";

function App() {
  

  return (
    <div className={appcss.page}>
      <h1>Wallet</h1>
      <div className={appcss.container}>
        <Link to={`create-new`} className={appcss.lnk}><button className={appcss.btn}>Create a new wallet</button></Link>
        <Link to={`existing`} className={appcss.lnk}><button className={appcss.btn}>Import existing wallet</button></Link>
      </div>
    </div>
  )
}

export default App
