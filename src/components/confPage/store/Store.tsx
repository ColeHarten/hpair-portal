import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from 'react';
import Product from './Product';
import { User } from '../../../utils/types';
import MenuBar from '../menuBar/MenuBar';

interface ProductInfo {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    url: string;
};

interface StoreProps {
    user : User | null;
}

const Store = ({user} : StoreProps) => {
    // fetch the products from the public directory file products.json
    const [products, setProducts] = React.useState([]);
    useEffect(() => {
        fetch('/products.json')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);

    const [itemsCount, setItemsCount] = useState<number>(0);
	useEffect(() => {
        const Snip = (window as any).Snipcart;
      
        // Check if Snip and Snip.store are defined
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
        <>
        <MenuBar user={user} />
        <Box sx={{ overflow: 'auto', zIndex: 0, display: 'flex', flexDirection: 'column', justifyContent: "center", marginTop: '64px' }}>
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
            {products.map((product, i) => <Product {...(product as ProductInfo)} key={i} />)}
          </Box>
      
          {/* Snipcart */}
          <div
            id="snipcart"
            data-api-key="NWMwZWNkZGMtZjU2ZS00YzM3LWFlZjYtMmM5Zjk0MWViZDcxNjM3Njg0OTY0ODg5NTk4MTM3"
            hidden
          >
          </div>
        </Box>
        </>
      );
      
};

export default Store;