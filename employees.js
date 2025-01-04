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
      res.status(201).json('Employee not added');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/employees/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await prisma.employee.findFirst({
      where: {
        id,
      },
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json('Employee not found');
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
