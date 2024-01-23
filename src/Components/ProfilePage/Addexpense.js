// Addexpense.js
import React, { useState } from 'react';
import './Addexpense.css'; // Import the styles

const AddExpense = () => {
  const [expenseData, setExpenseData] = useState({
    amount: '',
    description: '',
    category: 'Food', // Default category
  });

  const [submittedData, setSubmittedData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({ ...expenseData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', expenseData);

    setSubmittedData((prevData) => [...prevData, expenseData]);

    setExpenseData({
      amount: '',
      description: '',
      category: 'Food',
    });
  };

  return (
    <div className="add-expense-container">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={expenseData.amount}
            onChange={handleInputChange}
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={expenseData.description}
            onChange={handleInputChange}
            placeholder="Enter description"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={expenseData.category}
            onChange={handleInputChange}
          >
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Groceries">Groceries</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travel">Travel</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div className="submitted-data-container">
          <h3>Submitted Data:</h3>
          {submittedData.map((item, index) => (
            <ul key={index} className="submitted-data-item">
              <li>Amount: {item.amount}</li>
              <li>Description: {item.description}</li>
              <li>Category: {item.category}</li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddExpense;
