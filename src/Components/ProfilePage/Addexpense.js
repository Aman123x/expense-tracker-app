import React, { useState, useEffect } from "react";
import "./Addexpense.css";

const AddExpense = () => {
  const [expenseData, setExpenseData] = useState({
    amount: "",
    description: "",
    category: "Food",
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [dataFireBase, setDataFireBase] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({ ...expenseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", expenseData);

    setSubmittedData(expenseData);

    setExpenseData({
      amount: "",
      description: "",
      category: "Food",
    });
  };

  const sendSubmittedData = async () => {
    try {
      const response = await fetch(
        "https://expense-tracker-10d64-default-rtdb.firebaseio.com/expenseData.json",
        {
          method: "POST",
          body: JSON.stringify(submittedData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    
    const fetchData = async () => {
      if (submittedData !== null) {
        await sendSubmittedData();
      }

      await gettingDataFromServer();
    };

    fetchData();
  }, [submittedData]);

  async function gettingDataFromServer() {
    try {
      const response = await fetch(
        "https://expense-tracker-10d64-default-rtdb.firebaseio.com/expenseData.json",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      // Convert the object into an array of objects
      const dataArray = Object.keys(data).map((key) => ({
        id: key, 
        ...data[key],
      }));
      setDataFireBase([dataArray]);
    //   console.log(dataFireBase);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

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
      <div>
        <h3>Data from Backend:</h3>
        <ul>
          {dataFireBase.map((itemArray) =>
            itemArray.map((item) => (
              <li key={item.id}>
                <strong>Amount:</strong> {item.amount}
                <br />
                <strong>Description:</strong> {item.description}
                <br />
                <strong>Category:</strong> {item.category}
                <br />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default AddExpense;
