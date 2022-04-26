// React
import { FormEvent, useState } from "react";

// React Modal
import Modal from "react-modal";

// Assets
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import closeImg from "../../assets/close.svg";

// Hooks
import { useTransactions } from "../../hooks/useTransactions";

// Styles
import { Container, TransactionTypeContainer, RadioBox } from "./style";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const NewTransactionModal = ({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) => {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  const [type, setType] = useState("deposit");

  async function handleCreateNewTransaction(e: FormEvent) {
    e.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,
    });

    setTitle("");
    setAmount(0);
    setCategory("");
    setType("deposit");
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Close modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Register Transaction</h2>

        <input
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Value"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => {
              setType("deposit");
            }}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="Deposit" />
            <span>Income</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => {
              setType("withdraw");
            }}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Withdraw" />
            <span>Outcome</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button type="submit">Register</button>
      </Container>
    </Modal>
  );
};
