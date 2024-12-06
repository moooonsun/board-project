
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import List from './comp/board/BoardList'
import Regist from './comp/board/BoardRegist'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <About />
        <Routes>
          <Route path={"/boardList"} element={<List />} />
          <Route path={"/boardRegist"} element={<Regist />} />
          <Route path={"/boardFind"} element={<Find />} />
          <Route path={"/boardModify"} element={<Modify />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
function About() {
  return (
    <div>
      <Link to="/boardList">Main</Link><br />
    </div>
  )
}


export default A