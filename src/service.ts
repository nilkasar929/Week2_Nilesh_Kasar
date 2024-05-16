import pool from './pgConfig';



// Function to check if the table exists and create it if it doesn't
let isTableChecked = false;
export const tableExistCheck = async () => {
  

 // Skip if the table already exists
  if (isTableChecked) return;

  const checkTableQuery = `
    SELECT to_regclass('public.orders') IS NOT NULL AS table_exists;
  `;

  const { rows } = await pool.query(checkTableQuery);
  const tableExists = rows[0].table_exists;

  if (tableExists) {
    console.log('Table "orders" exists ');
  } else {
    const createTableQuery = `
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        orderID VARCHAR(255) NOT NULL
      );
    `;
    await pool.query(createTableQuery);
    console.log('Table "orders" created');
  }

  isTableChecked = true;
  
};



//a) Function to filter the items
export const filterItems = (items: any[]): any[] => {
  if (!Array.isArray(items)) {
    throw new Error('Invalid input: items must be an array');
  }

  return items.filter((item: any) => {
    const orderBlocks = item.OrderBlocks;
    
    return !orderBlocks.some((block: any) => {
      const lineNo = block.lineNo;
      if (Array.isArray(lineNo)) {
        return lineNo.some((no: any) => no % 3 === 0);
      } else {
        return lineNo % 3 === 0;
      }
    });
  });
};

//To store the ID's into the orders table 
export const storeItems = async (items: any[]): Promise<void> => {
  if (!Array.isArray(items)) {
    throw new Error('Invalid input: items must be an array');
  }

  for (const item of items) {
    await pool.query('INSERT INTO orders (orderID) VALUES ($1)', [item.orderID]);
  }
};


// Define the array of student objects
const students = [
  { name: "Alice", age: 20, grade: 75 },
  { name: "Bob", age: 22, grade: 85 },
  { name: "Charlie", age: 21, grade: 60 },
  { name: "David", age: 19, grade: 45 },
  { name: "Eve", age: 20, grade: 90 }
];

// Function to filter out students who passed (grade >= 50)
export const filterPassedStudents = (): { name: string; age: number; grade: number }[] => {
  return students.filter(student => student.grade >= 50);
};

// Function to get the names of all students
export const getStudentNames = (): string[] => {
  return students.map(student => student.name);
};

// Function to sort students by their grades in ascending order
export const sortStudentsByGrade = (): { name: string; age: number; grade: number }[] => {
  return students.slice().sort((a, b) => a.grade - b.grade);
};

// Function to calculate the average age of students
export const getAverageAge = (): number => {
  const totalAge = students.reduce((sum, student) => sum + student.age, 0);
  return totalAge / students.length;
};




