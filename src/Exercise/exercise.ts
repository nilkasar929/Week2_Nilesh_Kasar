// Function to filter expensive products (price > $500)
 export const filterExpensiveProducts = (products: { id: number; name: string; price: number }[]): { id: number; name: string; price: number }[] => {
    return products.filter(product => product.price > 500);
  };
  
  // Function to get product names
 export const getProductNames = (products: { id: number; name: string; price: number }[]): string[] => {
    return products.map(product => product.name);
  };
  
  // Function to sort products by price (descending order)
 export const sortProductsByPrice = (products: { id: number; name: string; price: number }[]): { id: number; name: string; price: number }[] => {
    return products.slice().sort((a, b) => b.price - a.price);
  };
  
  // Function to calculate total price of all products
 export const getTotalPrice = (products: { id: number; name: string; price: number }[]): number => {
    return products.reduce((total, product) => total + product.price, 0);
  };
  
  // Function to calculate average price of all products
 export const getAveragePrice = (products: { id: number; name: string; price: number }[]): number => {
    const total = getTotalPrice(products);
    return total / products.length;
  };
  
  // Function to find maximum price among all products
 export const getMaxPrice = (products: { id: number; name: string; price: number }[]): number => {
    return Math.max(...products.map(product => product.price));
  };
  
  // Function to find minimum price among all products
 export const getMinPrice = (products: { id: number; name: string; price: number }[]): number => {
    return Math.min(...products.map(product => product.price));
  };
  
  // Function to filter products by name
  export const filterProductsByName = (products: { id: number; name: string; price: number }[], name: string): { id: number; name: string; price: number }[] => {
    return products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
  };
  

  