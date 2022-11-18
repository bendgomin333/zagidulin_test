const express = require('express')
const { DataTypes, Sequelize } = require('sequelize')
const dbconfig = require('../dbconfig.json')

const app = express()
app.use(express.json());
const { username, password, database, host, dialect } = dbconfig

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  additional: { timeStamps: false }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Debt = sequelize.define('Debt', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  personid: { type: DataTypes.INTEGER, allowNull: true },
  amount: { type: DataTypes.NUMBER, allowNull: false },
  date: { type: DataTypes.NUMBER, defaultValue: DataTypes.NOW }
}, {
  tableName: 'debts',
  timestamps: false
});

const Person = sequelize.define('Person', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  firstname: { type: DataTypes.STRING, allowNull: false },
  secondname: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'persons',
  timestamps: false
});

app.listen(3001, () => {
  console.log('Listening on 3001 port')
})

app.get('/getDebts', async (req, res) => {
  try {
    const data = await Debt.findAll()
    res.status(200).send(data)
  } catch (err) {
    console.log(err)
    res.status(500).send({ status: 'error', error: "Something went wrong" })
  }
})

app.get('/getData', async (req, res) => {
  try {
    const data = await Person.findAll()
    res.status(200).send(data)
  } catch (err) {
    console.log(err)
    res.status(500).send({ status: 'error', error: "Something went wrong" })
  }
})

app.put('/edit', async (req, res) => {
  try {
    const { id, firstname, secondname } = req.body

    if (!id || !firstname || !secondname) throw new Error('Invalid data')

    try {
      await Person.update(
        { firstname, secondname },
        { where: { id } }
      )
    } catch (err) {
      throw new Error('Invalid data')
    }

    try {
      res.status(200).send({ status: 'success', ...(await Person.findOne({ where: { id } })).dataValues })
    } catch (err) {
      throw new Error(`No user with id=${id}`)
    }
    return
  } catch (err) {
    console.log(err)
    res.status(400).send({ status: 'error', error: err.message })
    return
  }
})

app.post('/add', async (req, res) => {
  try {
    const { firstname, secondname } = req.body
    if (!firstname || !secondname) throw new Error('Invalid data')

    try {
      await Person.create(
        { firstname, secondname }
      )
    } catch (err) {
      throw new Error('Invalid data')
    }
    res.status(200).send({ status: 'success' })
    return
  } catch (err) {
    console.log(err)
    res.status(400).send({ status: 'error', error: err.message })
    return
  }
})

app.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body

    if (!id) throw new Error('Invalid data')

    try {
      await Person.destroy(
        { where: { id } }
      )
    } catch (err) {
      throw new Error('Invalid data')
    }

    res.status(200).send({ status: 'success' })
    return
  } catch (err) {
    console.log(err)
    res.status(400).send({ status: 'error', error: err.message })
    return
  }
})