import React, { useState } from 'react';
import { Container, Grid, Typography, Paper, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';

function App() {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productList, setProductList] = useState([]);

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddProduct = () => {
    if (productName && quantity) {
      const newProduct = { name: productName, quantity: parseInt(quantity) };
      setProductList([...productList, newProduct]);
      setProductName('');
      setQuantity('');
    }
  };

  const handleIncreaseQuantity = (index) => {
    const updatedProductList = [...productList];
    updatedProductList[index].quantity++;
    setProductList(updatedProductList);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedProductList = [...productList];
    if (updatedProductList[index].quantity > 0) {
      updatedProductList[index].quantity--;
    }
    setProductList(updatedProductList);
  };

  const handleDeleteProduct = (index) => {
    const updatedProductList = productList.filter((_, i) => i !== index);
    setProductList(updatedProductList);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Product Page</Typography>
            <TextField
              label="Product Name"
              value={productName}
              onChange={handleProductNameChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Quantity"
              value={quantity}
              onChange={handleQuantityChange}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleAddProduct}>
              Add Product
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Product Listing</Typography>
            <List>
              {productList.map((product, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={product.name}
                    secondary={`Quantity: ${product.quantity}`}
                  />
                  <ListItemSecondaryAction>
                    <Button onClick={() => handleIncreaseQuantity(index)}>
                      +
                    </Button>
                    <Button onClick={() => handleDecreaseQuantity(index)}>
                      -
                    </Button>
                    {product.quantity === 0 && (
                      <Button onClick={() => handleDeleteProduct(index)}>
                        Delete
                      </Button>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
