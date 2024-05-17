import express,{Request,Response} from 'express';
import { filterItems, storeItems,tableExistCheck,filterPassedStudents, getStudentNames, sortStudentsByGrade, getAverageAge  } from './service';
import pool from './pgConfig'
const port:Number = 8000;
const app = express();
app.use(express.json());

app.get('/',(req:Request, res:Response)=>{
  res.send("This is assignment of week2")
})


app.post('/items/process', async(req:Request, res:Response) => {
  const items: any = req.body.items;

  try {
    //To filter the items
    const filteredItems = filterItems(items);

    //To Check and create a table orders if not exist
    await tableExistCheck();

    //To store the ID's into the orders table
    await storeItems(filteredItems);
    
    res.status(201).json({ message: 'Filtered items processed and its ID stored in the database',filteredItems });
  } 
  catch (error:any) {
    
    res.status(500).json({ message: 'An error occurred while processing items ',error });
  }
});


app.get('/students/filterPassed', (req:Request, res:Response)=> {
  const passedStudents = filterPassedStudents();
  res.json(passedStudents);
});

// GET endpoint to get student names
app.get('/students/getNames', (req:Request, res:Response) => {
  const names = getStudentNames();
  res.json(names);
});

// GET endpoint to sort students by grade
app.get('/students/sortByGrade',(req:Request, res:Response)=> {
  const sortedStudents = sortStudentsByGrade();
  res.json(sortedStudents);
});

// GET endpoint to get average age of students
app.get('/students/getAverageAge', (req:Request, res:Response)=> {
  const averageAge = getAverageAge();
  res.json({ averageAge });
});



//To show successful database connection

pool.on('connect', () => {
  console.log('Connected to the database');
});

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
})

