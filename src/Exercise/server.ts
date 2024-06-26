import express,{Request,Response} from 'express';
import { filterExpensiveProducts, getProductNames, sortProductsByPrice, getTotalPrice, getAveragePrice, getMaxPrice, getMinPrice, filterProductsByName } from './exercise';

const port = 3000;
const app = express();
app.use(express.json());

// Route to filter expensive products
app.post('/products/filterExpensive', (req:Request, res:Response) => {
  const products = req.body;
  const expensiveProducts = filterExpensiveProducts(products);
  res.json(expensiveProducts);
});

// Route to get product names
app.post('/products/getProductNames', (req:Request, res:Response)=> {
  const products = req.body;
  const productNames = getProductNames(products);
  res.json(productNames);
});

// Route to sort products by price
app.post('/products/sortByPrice',(req:Request, res:Response) => {
  const products = req.body;
  const sortedProducts = sortProductsByPrice(products);
  res.json(sortedProducts);
});

// Route to get total price of all products
app.post('/products/getTotalPrice',(req:Request, res:Response)=> {
  const products = req.body;
  const totalPrice = getTotalPrice(products);
  res.json({ totalPrice });
});

// Route to get average price of all products
app.post('/products/getAveragePrice', (req:Request, res:Response) => {
  const products = req.body;
  const averagePrice = getAveragePrice(products);
  res.json({ averagePrice });
});

// Route to get maximum price among all products
app.post('/products/getMaxPrice', (req:Request, res:Response) => {
  const products = req.body;
  const maxPrice = getMaxPrice(products);
  res.json({ maxPrice });
});

// Route to get minimum price among all products
app.post('/products/getMinPrice',(req:Request, res:Response)=> {
  const products = req.body;
  const minPrice = getMinPrice(products);
  res.json({ minPrice });
});

// Route to filter products by name
app.post('/products/filterByName', (req:Request, res:Response) => {
  const { name } = req.body;
  const products = req.body.products;
  const filteredProducts = filterProductsByName(products, name);
  res.json(filteredProducts);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


