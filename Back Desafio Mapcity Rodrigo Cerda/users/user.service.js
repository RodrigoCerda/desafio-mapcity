const config = require('config.json');
const jwt = require('jsonwebtoken');
var Sequelize = require('sequelize')
sequelize = new Sequelize(config.DB.database, config.DB.username, config.DB.password, {host: config.DB.host,  dialect: 'postgres'})
module.exports = {
    authenticate,
    register
};

//modelo user
const User = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    email: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    password: {
        type: Sequelize.STRING
      }
  }, { timestamps: false });
//modelo point
const Point = sequelize.define('points', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    shape: {
        type: Sequelize.GEOMETRY('POINT', 4326),
    },
    title: {
        type: Sequelize.STRING,
    }
}, { timestamps: false })


async function authenticate({ username, password }) {
    const users = await User.findAll({
        where: {
          name: username,
          password
        }
      });
    console.log(users)
    if (users.length) {
        const points = await Point.findAll();
        const user = users[0];
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            id: user["id"],
            name: user["name"],
            email: user["email"],
            points,
            token
        };
    }
}


async function register(body) {
    console.log(body)
    const newUser = await User.create({ name: body.username , email: body.email , password: body.password  });
    let geometry = body.point.geometry;
    geometry.crs = { type: 'name', properties: { name: 'EPSG:4326'} }
    const title = body.point.properties.title;
    const point = await Point.create({id_user: newUser.id, shape: geometry, title})
    const points = await Point.findAll();
    const token = jwt.sign({ sub: newUser.id }, config.secret);
    return {
        id: newUser["id"],
        name: newUser["name"],
        email: newUser["email"],
        points,
        token
    };
}
