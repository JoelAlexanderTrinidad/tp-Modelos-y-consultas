const db = require('../database/models/index');
const {Op} = require('sequelize');

 module.exports = {
    list: (req, res) => {
        db.Movie.findAll() // esto es una promesa por eso el then
            .then(movies =>{
                return res.render('moviesList',{movies}) // cuando tengas las pelis retornalas 
            })
            .catch(error => console.log(error)) // si hay un error
    },
    detail: (req, res) => {
        db.Movie.findByPk(req.params.id) // findByPk recibe como parámetro el id
            .then(movie => { // este puede ser cualquier nombre, pero depende de cómo lo esté pidiendo la vista
                return res.render('moviesDetail',{
                    movie // y acá se manda hacia la vista
                })
            })
            .catch(error => console.log(error))
    },
    new: (req, res) => {
        db.Movie.findAll({
            order:[
                ['release_date','DESC']
            ],
            limit: 5
        })
            .then(movies => res.render('newestMovies',{movies}))
            .catch(error => console.log(error))
    },
    recomended: (req, res) => {
        db.Movie.findAll({
            where: {
                [Op.and]:[
                    {
                        rating: {
                            [Op.gte] : 8
                        }
                    },
                    {
                        awards: {
                            [Op.gte]: 2
                        }
                    }
                ]
            },
            order:[
                ['rating', 'DESC'],
                ['awards', 'DESC'],
            ]
        })
        .then(movies => res.render('recommendedMovies', {movies}))
        .catch(error => console.log(error))
    }       
}