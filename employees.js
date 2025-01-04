const { express, prisma } = require('./common');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Welcome to the Prismatic Employees API.');
});

router.get('/employees', async (req, res) => {
  try {
    const result = await prisma.employee.findMany();
    console.log('fetch employees', result);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(200).json('Nothing found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/employees', async (req, res) => {
  try {
    const { name } = req.body;
    const newEmployee = await prisma.employee.create({
      data: {
        name,
      },
    });
    if (newEmployee) {
      res.status(201).json(newEmployee);
    } else {
      res.status(201).json('User not added');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// router.post('/employees', async (req, res) => {
//   try {
//     const { name } = req.body;

//     // Validate input
//     if (!name || typeof name !== 'string') {
//       return res.status(400).json({ error: 'Invalid or missing "name" field' });
//     }

//     // Create a new employee
//     const newEmployee = await prisma.employee.create({
//       data: {
//         name,
//       },
//     });

//     // Send the newly created employee with status 201
//     res.status(201).json(newEmployee);
//   } catch (error) {
//     console.error('Error creating employee:', error);
//     res.status(500).json({ error: 'Internal Server Error' }); // Handle unexpected server errors
//   }
// });

module.exports = router;
