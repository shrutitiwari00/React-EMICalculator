import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEmi] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const calculateEMI = (e) => {
    e.preventDefault();

    const principal = parseFloat(amount);
    const monthlyRate = parseFloat(rate) / (12 * 100);
    const numberOfPayments = parseInt(tenure) * 12;

    const emiCalc =
      principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, numberOfPayments) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const emiRounded = emiCalc.toFixed(2);
    setEmi(emiRounded);

    const newEntry = {
      amount,
      rate,
      tenure,
      emi: emiRounded,
    };
    setHistory([newEntry, ...history]);

    setAmount('');
    setRate('');
    setTenure('');
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="container">
      <h2 className="title">EMI Calculator</h2>
      <form onSubmit={calculateEMI} className="form">
        <div className="form-group">
          <label>Loan Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Interest Rate (annual %):</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Loan Tenure (years):</label>
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn calculate-btn">Calculate EMI</button>
      </form>

      {emi && (
        <div className="result">
          <h3>Calculated EMI: <span>{emi}</span></h3>
        </div>
      )}

      <button onClick={toggleHistory} className="btn history-btn">
        {showHistory ? 'Hide History' : 'Show History'}
      </button>

      {showHistory && (
        <div className="history">
          <h3>Calculation History</h3>
          {history.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Loan Amount</th>
                  <th>Interest Rate (%)</th>
                  <th>Tenure (years)</th>
                  <th>EMI</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.amount}</td>
                    <td>{entry.rate}</td>
                    <td>{entry.tenure}</td>
                    <td>{entry.emi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No history yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
