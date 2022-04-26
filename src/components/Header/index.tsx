// Assets
import logoImg from "../../assets/logo.png";

// Styles
import { Container, Content } from "./style";

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export const Header = ({ onOpenNewTransactionModal }: HeaderProps) => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="gofinances web" style={{ width: 200 }} />
        <button type="button" onClick={onOpenNewTransactionModal}>
          New Transaction
        </button>
      </Content>
    </Container>
  );
};
