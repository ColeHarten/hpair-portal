import React, { useEffect, useState } from 'react';
import Product from './Product';
import {Box, Button} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StoreWidget = () => {
    // fetch the products from the public directory file products.json
    const [products, setProducts] = React.useState([]);
    useEffect(() => {
        fetch('/products.json')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);

    const [itemsCount, setItemsCount] = useState(0);

	useEffect(() => {
        const Snip = window.Snipcart;
      
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
    <Box sx={{overflow: 'auto', zIndex: 0}}>   
        <Button
          startIcon={<ShoppingCartIcon />}
          href="#"
          className="snipcart-checkout"
          sx={{ ml: 'auto', width: '100%', color: 'black' }}
        >
        <div className="snipcart-summary">
         {/* checkout with number of items */}
            Checkout (<span className='snipcart-items-count'>{itemsCount}</span>)
        </div>
        </Button>
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between', // You can use 'space-around' or 'space-evenly' as well
            }}
        >
            {
              products.map((product, i) => <Product {...product} key={i}/>)
            }
        </Box>

        <div
            id="snipcart"
            data-api-key="NWMwZWNkZGMtZjU2ZS00YzM3LWFlZjYtMmM5Zjk0MWViZDcxNjM3Njg0OTY0ODg5NTk4MTM3" hidden
        >
        </div>
    </Box>
    );
};

export default StoreWidget;
