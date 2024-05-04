import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
        setFilteredTransactions(data);
      });
  }, []);

  const addTransaction = (newTransaction) => {
    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTransaction)
    })
      .then((response) => response.json())
      .then((data) => {
        setTransactions((prevTransactions) => [...prevTransactions, data]);

        filterTransactions();
      })
      .catch((error) => console.error("Error adding transaction:", error));
  };

  const filterTransactions = (searchTerm) => {
    if (!searchTerm) {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTransactions(filtered);
    }
  };

  const deleteTransaction = (id) => {
   
    fetch(`http://localhost:8001/transactions/${id}`, {
      method: "DELETE"
    })
      .then(() => {
 
        setTransactions((prevTransactions) =>
          prevTransactions.filter((transaction) => transaction.id !== id)
        );

        filterTransactions();
      })
      .catch((error) => console.error("Error deleting transaction:", error));
  };

  return (
    <div>
      <h1>Bank of Flatiron</h1>
      <Search onSearch={filterTransactions} />
      <AddTransactionForm onAddTransaction={addTransaction} />
      <TransactionsList
        transactions={filteredTransactions}
        onDeleteTransaction={deleteTransaction}
      />
    </div>
  );
}

export default AccountContainer
