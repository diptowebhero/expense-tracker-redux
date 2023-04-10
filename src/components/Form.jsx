import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTransaction,
  createTransaction,
} from "../features/transactions/transactionSlice";

const Form = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [editMode, setEditMode] = useState(false);

  const { isError, isLoading } = useSelector((state) => state.transaction);
  const { editing } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  //handle create transaction
  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(
      createTransaction({
        name,
        amount: Number(amount),
        type,
      })
    );

    //reset
    reset();
  };

  //handle update transaction
  const updateTransaction = (e) => {
    e.preventDefault();
    dispatch(
      changeTransaction({
        id: editing?.id,
        data: {
          name: name,
          amount: amount,
          type: type,
        },
      })
    );
    reset();
    setEditMode(false);
  };

  //cancel edit
  const cancelEdit = () => {
    reset();
    setEditMode(false);
  };

  //reset form
  function reset() {
    setName("");
    setAmount("");
    setType("");
  }

  //listen for edit mode active
  useEffect(() => {
    const { id, name, amount, type } = editing || {};

    if (id) {
      setEditMode(true);
      setName(name);
      setAmount(amount);
      setType(type);
    } else {
      reset();
      setEditMode(false);
    }
  }, [editing]);

  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={editMode ? updateTransaction : handleCreate}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group radio">
          <label>Type</label>
          <div className="radio_group">
            <input
              type="radio"
              value="income"
              name="type"
              checked={type === "income"}
              onChange={(e) => setType(e.target.value)}
              required
            />
            <label>Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              placeholder="Expense"
              checked={type === "expense"}
              onChange={(e) => setType(e.target.value)}
              required
            />
            <label>Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="Enter Amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button className="btn" type="submit">
          {editMode ? "Update Transaction" : "Add Transaction"}
        </button>

        {!isLoading && isError && <p>There was an error occurred</p>}
      </form>

      {editMode && (
        <button className="btn cancel_edit" onClick={cancelEdit}>
          Cancel Edit
        </button>
      )}
    </div>
  );
};

export default Form;
