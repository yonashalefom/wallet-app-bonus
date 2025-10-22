import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionsLayout from './pages/TransactionsLayout';
import { TransactionDetail } from './pages/TransactionDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TransactionsLayout />}>
          <Route path="transaction/:id" element={<TransactionDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
