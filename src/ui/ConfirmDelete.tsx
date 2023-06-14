import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

type TProps = {
  resource: string;
  onConfirm: () => void;
  disabled: boolean;
  closeModal: () => void;
};

const ConfirmDelete: React.FC<TProps> = ({
  resource,
  onConfirm,
  disabled,
  closeModal,
}) => {
  const handleConfirmClick = () => {
    onConfirm();
  };

  return (
    <StyledConfirmDelete>
      <Heading type="h3">Delete {resource}</Heading>
      <p>
        Are you sure you want to delete this {resource} permanently? This action
        cannot be undone.
      </p>

      <div>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={handleConfirmClick}
          disabled={disabled}
        >
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
};

export default ConfirmDelete;
