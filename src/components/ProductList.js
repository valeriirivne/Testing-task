import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsFetch } from '../features/basket/basketSlice';
import {
  addProduct,
  removeProduct,
  decrementQuantity,
} from '../features/shoppingCartProducts/shoppingCartProductsSlice';
import ShoppingCartProducts from './ShoppingCartProducts';
import styled from 'styled-components';

function ProductList() {
  const products = useSelector((state) => state.basket.products);
  const cartItems = useSelector((state) => state.shoppingCartProducts.products);
  console.log(cartItems);

  const dispatch = useDispatch();
  console.log('hey');
  useEffect(() => {
    dispatch(getProductsFetch());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addProduct({ ...product, quantity: 1 }));
  };

  const handleDecrementQuantity = (product) => {
    const cartItem = cartItems.find((item) => item.id === product.id);
    if (cartItem && cartItem.quantity > 1) {
      dispatch(decrementQuantity(product));
    } else {
      dispatch(removeProduct(product.id));
    }
  };

  const handleRemoveFromCart = (product) => {
    console.log(product);
    console.log(product.id);
    dispatch(removeProduct(product.id));
  };

  const getCartItemQuantity = (productId) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <ProductListContainer>
      <h2>Products:</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <ProductInfoContainer>
              <div>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>{product.price}</ProductPrice>
              </div>
              <ProductButtonContainer>
                <ProductButton onClick={() => handleAddToCart(product)}>
                  +
                </ProductButton>
                {getCartItemQuantity(product.id) > 0 && (
                  <ProductQuantityContainer>
                    <ProductButton
                      onClick={() => handleDecrementQuantity(product)}
                    >
                      -
                    </ProductButton>
                    <ProductQuantity>
                      {getCartItemQuantity(product.id)}
                    </ProductQuantity>
                  </ProductQuantityContainer>
                )}
                {getCartItemQuantity(product.id) > 0 && (
                  <ProductRemoveButton
                    onClick={() => handleRemoveFromCart(product)}
                  >
                    Remove from cart
                  </ProductRemoveButton>
                )}
              </ProductButtonContainer>
            </ProductInfoContainer>
          </li>
        ))}
      </ul>
      <ShoppingCartProducts />
    </ProductListContainer>
  );
}

const ProductListContainer = styled.div`
  margin: 0 auto;
  max-width: 600px;
  padding: 20px;

  .product-info-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f8f8f8;
    border-radius: 5px;
  }

  h2 {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const ProductInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 5px;
`;

const ProductName = styled.div`
  font-weight: bold;
`;

const ProductPrice = styled.div`
  margin-top: 5px;
`;

const ProductButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;
const ProductButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  font-weight: bold;
  font-size: 16px;
  padding: 10px 15px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background-color: #3e8e41;
  }
`;

const ProductQuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const ProductQuantity = styled.span`
  font-size: 16px;
  margin: 0 10px;
`;

const ProductRemoveButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 3px;
  font-weight: bold;
  font-size: 16px;
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

export default ProductList;
