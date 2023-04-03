import Employee from './components/Employee';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employee" element={<Employee />} />
          {/* <h2>EMPLOYEE MANAGEMENT</h2>
          <Employee /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
