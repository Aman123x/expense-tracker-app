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

  const [changeBtn,setChangeBtn]=useState(false);
  const[keyEdit,setKeyEdit]=useState("");

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
      if (submittedData !== null && keyEdit==="") {
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

  async function handleEdit(key) {
    setChangeBtn(true);
    setKeyEdit(key);
    try {
        const response = await fetch(
          `https://expense-tracker-10d64-default-rtdb.firebaseio.com/expenseData/${key}.json`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
    
        // Set the expenseData state with the retrieved data
        setExpenseData({
          amount: data.amount || "",
          description: data.description || "",
          category: data.category || "Food",
        });
        // await handleDelete(key);
        // setChangeBtn(false);
        console.log(key);
    } 
    catch (err) {
        console.log(err);
    }
  }

  async function handleEditBtn(){
    const key=keyEdit;
    try {
        const response = await fetch(
          `https://expense-tracker-10d64-default-rtdb.firebaseio.com/expenseData/${key}.json`,
          {
            method: "PUT",
            body: JSON.stringify(expenseData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data=await response.json();
        await gettingDataFromServer()
        console.log(data);
        setChangeBtn(false);
        setKeyEdit("");
        console.log(key);
    }
    catch (err) {
        console.log(err);
    }
  }

  async function handleDelete(key) {
    try {
        const response = await fetch(
          `https://expense-tracker-10d64-default-rtdb.firebaseio.com/expenseData/${key}.json`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        await gettingDataFromServer()
        console.log ("Expense successfuly deleted");
    }
    catch (err) {
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

        {!changeBtn ?<button type="submit">Submit</button>:<button onClick={handleEditBtn}>Edit</button>}

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
                <button className="btn_edit" onClick={()=>handleEdit(item.id)}>Edit</button>{" "}
                <button className="btn_delete" onClick={()=>handleDelete(item.id)}>Delete</button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default AddExpense;
