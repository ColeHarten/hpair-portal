import React from 'react';
import Product from './Product';
import products from './products.json';
import {Box} from "@mui/material";

const StoreWidget = () => {
    return (
    <Box sx={{overflow: 'auto'}}>
          <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                // gap: '16px', // Adjust the gap as needed
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
