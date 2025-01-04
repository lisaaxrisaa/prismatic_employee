const { prisma } = require('./common');
const seed = async () => {
  const employees = [
    { name: 'Emma' },
    { name: 'Asher' },
    { name: 'Poggo' },
    { name: 'Kwin' },
    { name: 'Delilah' },
    { name: 'Cooper' },
    { name: 'Louie' },
    { name: 'Leo' },
    { name: 'Bali' },
    { name: 'Angie' },
  ];
  await prisma.employee.createMany({
    // method name should be singular
    data: employees,
  });
  console.log('Sending complete');
};

seed();
