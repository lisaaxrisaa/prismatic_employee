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

router.put('/employees/:id', async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Invalid or missing "name" field' });
  }
  try {
    const result = await prisma.employee.update({
      where: { id },
      data: { name },
    });
    res.status(200).json(result);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Employee not found' });
    }
  }
});

router.delete('/employees/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await prisma.employee.delete({
      where: {
        id,
      },
    });
    res.status(204).json(result);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Employee not found' });
    }
  }
});

module.exports = router;
