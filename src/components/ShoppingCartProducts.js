import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaShoppingBasket } from 'react-icons/fa';
import styled from 'styled-components';

const ShoppingCartProducts = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const cartItems = useSelector((state) => state.shoppingCartProducts.products);
  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <StyledCartCounter>{cartQuantity}</StyledCartCounter>
      <StyledBasketIcon onClick={handlePopupOpen} />
      {isPopupOpen && (
        <PopupContainer>
          <PopupContent>
            <PopupHeader>
              <h2>Shopping Cart</h2>
              <CloseButton onClick={handlePopupClose}>X</CloseButton>
            </PopupHeader>
            <PopupItems>
              {cartItems.map((item) => (
                <PopupItem key={item.id}>
                  <p>{item.name}</p>
                  <p>
                    {item.quantity} x ${item.price}
                  </p>
                </PopupItem>
              ))}
            </PopupItems>
            <TotalPrice>
              Total: $
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </TotalPrice>
          </PopupContent>
        </PopupContainer>
      )}
    </>
  );
};

const StyledBasketIcon = styled(FaShoppingBasket)`
  font-size: 44px;
  color: #fff;
  margin-right: 30px;
  margin-top: 20px;
  position: fixed;
  top: 0;
  right: 0;
  background-color: #ff9800;
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 999;
  cursor: pointer;
  transition: transform;
  &:hover {
    transform: scale(1.1);
  }
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background-color: #fff;
  width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 20px;
  border-radius: 5px;
`;
const StyledCartCounter = styled.span`
  background-color: #f00;
  color: #fff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  position: absolute;
  top: 10px;
  right: 90px;
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const PopupItems = styled.div`
  margin: 20px 0;
`;

const PopupItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TotalPrice = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
`;

export default ShoppingCartProducts;
