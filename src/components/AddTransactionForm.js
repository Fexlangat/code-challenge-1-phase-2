import React, { useState } from "react";

function AddTransactionForm({ onAddTransaction }) {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any field is empty
    for (const key in formData) {
      if (formData[key] === "") {
        alert("Please fill out all fields");
        return;
      }
    }
    
    const amount = parseFloat(formData.amount);
    if (isNaN(amount)) {
      alert("Amount must be a number");
      return;
    }
   
    const newTransaction = {
      date: formData.date,
      description: formData.description,
      category: formData.category,
      amount: amount
    };
 
    onAddTransaction(newTransaction);
   
    setFormData({
      date: "",
      description: "",
      category: "",
      amount: ""
    });
  };

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
