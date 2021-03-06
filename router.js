const router = require('express').Router()
const Experience = require('./models/formations')

// Affiche toutes les formations
router.get('/', (req, res, next) => {
    Experience.getAllFormation(req.query)
    .then((Experience) => { 
        res.format({
            html: () => {
              let content = '<table class="table"><tr><th>ID</th><th>Année</th><th>Formation</th><th>Ville</th></tr>'
  
              Experience.forEach((Experience) => {
                content += '<tr>'
                content += '<td>' + Experience['id'] + '</td>'
                content += '<td>' + Experience['annee'] + '</td>'
                content += '<td>' + Experience['formation'] + '</td>'
                content += '<td>' + Experience['ville'] + '</td>'
                content += '<td> <form action="/formation/delete/'+Experience['id']+'/?_method=DELETE", method="POST"> <button type="submit" class="btn btn-danger"><i class="fa fa-trash-o fa-lg mr-2"></i>Remove</button> </form> </td>'
                content += '</tr>'
              })
              
              content += '</table>'
      
              res.render("home", {
                  title: `FomationList`,
                  content: content
              })
            },
            json: () => {
                res.json(Experience)
            }
          })
        }).catch((err) => {
        console.log(err)
        return next(err)
    })
})

// Ajoute une formation
router.post('/', (req, res, next) => {
    Experience.insertFormation(req.body)
    .then((Experience) => { 
        res.format({
            html : () => {
                res.redirect('/')    
            },
            json : () => {
                res.status(201).json(Experience)
            }
        })
    }).catch((err) => {
        return next(err)
    })
})

// Supprimer une formation
router.post('/formation/delete/:id', (req, res, next) => {
    Experience.deleteFormation(req.params.id)
    .then((Experience) => {
      res.format({
        html: () => {
            res.redirect('/')
        },
        json: () => {
            res.status(204).json(Experience)
        }
      })
    }).catch((err) => {
        res.status(410).json('FORMATION_NOT_DELETABLE')
        console.log(err)
        return next(err)
    })
})

// Gestion des errreurs
router.use((err, req, res, next) => {
    res.format({
        html: () => {
            res.render('error404', {
                error: err
            })
        },
        json : () => {
            res.status(404).json(err)
        }
    })
})
   
module.exports = router