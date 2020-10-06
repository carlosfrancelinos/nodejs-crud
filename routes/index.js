var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  global.db.findAll((e, docs) => {
                                  if(e){return res.redirect('/?erro='+e);}
                                  res.render('index', {docs});
                                 })
});

router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Cadastro de Cliente', doc:null, action:"/new"})
})

/*POST new page.*/
router.post('/new', function(req, res, next) {
  const nome = req.body.nome;
  const idade = !req.body.idade ? null : parseInt(req.body.idade);
  const uf = req.body.uf;
  global.db.insert({nome, idade, uf}, (err, result) => {
    if(err){return res.redirect('/?erro='+e);}
    res.redirect('/?new=true')
  })  
})

/*GET edit page.*/
router.get('/edit/:id', function(req, res, next){
  var id = parseInt(req.params.id);
  global.db.findOne(id, (e, doc) => {
    if(e){ return res.redirect('/?erro='+e);}
    console.log(doc.nome)
    res.render('new',{title: 'Edição de Cliente', doc:doc[0], action: '/edit/'+id})
  })
})

/* POST edit page.*/
router.post('/edit/:id', function(req, res){
  const id = parseInt(req.params.id);
  const nome = req.body.nome;
  const idade = !req.body.idade ? null: parseInt(req.body.idade);
  const uf = req.body.uf;
  global.db.update(id, {nome, idade, uf}, (e, result)=>{    
    if(e){return res.redirect('/?erro='+e);}
    res.redirect('/?edit=true')
  })
})

/* GET delete page.*/
router.get('/delete/:id', function(req, res){
  var id = parseInt(req.params.id);
  global.db.deleteOne(id, (e,r)=>{
    if(e){return res.redirect('/?erro='+e);}
    res.redirect('/?delete=true')
  })
})

module.exports = router;
