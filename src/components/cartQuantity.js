import { useState } from 'react';
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
        <PopupContainer>{/* Popup content here */}</PopupContainer>
      )}
    </>
  );
};

const StyledBasketIcon = styled(FaShoppingBasket)`
  /* Your styles for the basket icon */
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
  right: 30px;
`;

export default ShoppingCartProducts;
