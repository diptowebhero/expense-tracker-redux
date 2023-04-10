import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transactions/transactionSlice";
import Transaction from "./Transaction";

const Transactions = () => {
  const { transactions, isError, isLoading, error } = useSelector(
    (state) => state.transaction
  );
  const dispatch = useDispatch();

  //decide what to render
  let content = null;

  if (isLoading && !isError) content = <p>Loading...</p>;

  if (!isLoading && isError) content = <p>{error}</p>;

  if (!isLoading && !isError && transactions.length === 0) {
    content = <p>Not Data Found</p>;
  }

  if (!isLoading && !isError && transactions.length > 0) {
    content = transactions.map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));
  }

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);
  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
};

export default Transactions;
