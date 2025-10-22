import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'motion/react';
import TransactionsLayout from './pages/TransactionsLayout';
import { TransactionDetail } from './pages/TransactionDetail';

function App() {
  return (
    <Router>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ minHeight: "100vh" }}
      >
        <Routes>
          <Route path="/" element={<TransactionsLayout />}>
            <Route path="transaction/:id" element={<TransactionDetail />} />
          </Route>
        </Routes>
      </motion.div>
    </Router>
  );
}

export default App;
