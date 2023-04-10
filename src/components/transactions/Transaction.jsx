import React from "react";
import { useDispatch } from "react-redux";
import {
  editActive,
  removeTransaction,
} from "../../features/transactions/transactionSlice";
import { numberWithCommas } from "../../utils/numberWithCommas";
import deleteImg from "./../../images/delete.svg";
import editImg from "./../../images/edit.svg";

const Transaction = ({ transaction }) => {
  const { id, type, amount, name } = transaction || {};
  const dispatch = useDispatch();

  //handle delete
  const handleDelete = () => {
    dispatch(removeTransaction(id));
  };

  //handle edit
  const handleEdit = () => {
    dispatch(editActive(transaction));
  };

  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {numberWithCommas(amount)}</p>
        <button className="link"  onClick={handleEdit}>
          <img className="icon" src={editImg} />
        </button>
        <button className="link" onClick={handleDelete}>
          <img className="icon" src={deleteImg} />
        </button>
      </div>
    </li>
  );
};

export default Transaction;
