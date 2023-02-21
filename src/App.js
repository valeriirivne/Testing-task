import ProductList from './components/ProductList';
import styled from 'styled-components';

const App = () => {
  return (
    <AppContainer>
      <h1>My E-Shop</h1>
      <ProductList />
    </AppContainer>
  );
};
const AppContainer = styled.div`
  text-align: center;
  color: #3e8e41;
`;

export default App;
