import styled from "styled-components";
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import useOnClickOutside from "@/hooks/useOnClickOutside";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

type TStyledListProps = {
  position: {
    x: number;
    y: number;
  };
};

const StyledList = styled.ul<TStyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

export interface TMenusContextProps {
  openId: string;
  close: () => void;
  open: (id: string) => void;
  position: {
    x: number;
    y: number;
  };
  setPosition: (position: { x: number; y: number }) => void;
}

const MenusContext = createContext<TMenusContextProps>({
  openId: "",
  close: () => {},
  open: () => {},
  position: null,
  setPosition: () => {},
});

type TProps = {
  children: React.ReactNode;
};

const Menus: React.FC<TProps> = ({ children }) => {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

type TToggleProps = {
  id: string;
};
const Toggle: React.FC<TToggleProps> = ({ id }) => {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  const handleClick = (e) => {
    e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

type TListProps = {
  id: string;
  children: React.ReactNode;
};

const List: React.FC<TListProps> = ({ id, children }) => {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOnClickOutside(close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
};

type TButtonProps = {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
};

const Button: React.FC<TButtonProps> = ({ children, icon, onClick }) => {
  const { close } = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
