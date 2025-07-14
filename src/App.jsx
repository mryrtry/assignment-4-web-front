import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from "./Components/AuthForm/AuthForm"
import Graph from './Components/Graph/Graph';
import "../public/null.css"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="web/" element={<AuthForm />} />
        <Route path="web/graph" element={<Graph/>} />
      </Routes>
    </Router>
    );
}
