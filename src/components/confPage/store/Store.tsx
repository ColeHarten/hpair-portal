import { Box, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { useEffect, useState } from 'react';

interface Product {
  // Define the properties of your product
  // Example:
  id: number;
  name: string;
  price: number;
  // ... other properties
}

interface StoreProps {
  user: any; // Change the type to match your user type
}

const Product: React.FC<Product> = ({ name, price }) => {
  // Implement your Product component
  return (
    <Box sx={{ padding: '10px', margin: '10px', border: '1px solid black' }}>
      <p>{name}</p>
      <p>{price}</p>
      {/* Add more details as needed */}
    </Box>
  );
};

const Store: React.FC<StoreProps> = ({ user }) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [itemsCount, setItemsCount] = useState(0);

  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data: Product[]) => {
        setProducts(data);
      });
  }, []);

  useEffect(() => {
    const Snip = (window as any).Snipcart;

    if (Snip && Snip.store) {
      const initialState = Snip.store.getState();
      setItemsCount(initialState.cart.items.count);

      const unsubscribe = Snip.store.subscribe(() => {
        const newState = Snip.store.getState();
        setItemsCount(newState.cart.items.count);
      });

      return () => unsubscribe();
    }
  }, [setItemsCount]);

  return (
    <Box sx={{ overflow: 'auto', zIndex: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* Cart */}
      <Button
        startIcon={<ShoppingCartIcon />}
        href="#"
        className="snipcart-checkout"
        sx={{ ml: 'auto', width: '100%', color: 'black' }}
      >
        <div className="snipcart-summary">
          Checkout (<span className='snipcart-items-count'>{itemsCount}</span>)
        </div>
      </Button>

      {/* Products Grid */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around', // Center the items
          '@media screen and (max-width: 600px)': {
            justifyContent: 'center', // Center for small screens
          },
        }}
      >
        {products.map((product) => <Product key={product.id} {...product} />)}
      </Box>

      {/* Snipcart */}
      <div
        id="snipcart"
        data-api-key="NWMwZWNkZGMtZjU2ZS00YzM3LWFlZjYtMmM5Zjk0MWViZDcxNjM3Njg0OTY0ODg5NTk4MTM3"
        hidden
      >
      </div>
    </Box>
  );
};

export default Store;
