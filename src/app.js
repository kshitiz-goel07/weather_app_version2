const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

const publicdirectorypath = path.join(__dirname , '../public') 
const viewpath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')


app.set('view engine', 'hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

app.use(express.static(publicdirectorypath))

app.get('', (req, res) => {
    res.render('index',{
        title : 'Weather App',
        name : 'Kshitiz Goel'
    })
})


app.get('/about',(req , res) => {
    res.render('about',{
        title : 'About Me',
        name : 'Kshitiz Goel'
    })
})

app.get('/help',(req, res)=> {
    res.render('help',{
        title:'Ready to help',
        name : 'Kshitiz Goel'

    })
})

app.get('', (req , res ) => {
    res.send('Hello Express')
})

app.get('/help' , (req , res) => {
    res.send('help is here')
})

app.get('/about',(req , res)=>{
    res.send('About !!')
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error : 'Give an address'
        })
    }
    geocode(req.query.address , (error , {latitude , longitude , location}= {})=>{
        if(error){
            return res.send({
                error
            })
        }
    forecast(latitude , longitude , (error , forecastdata)=>{
        if ( error ){
           return res.send({ error })
        }
           res.send({
               forecast : forecastdata,
               location,
               address : req.query.address
           })    
    })
    })

})
app.get('/products' , (req , res)=>{
    if(!req.query.search){
  res.send({
    error : 'You must provide a search !!'
})
}
      res.send({
          products : []
      })
})

app.get('/help/*', (req , res)=>{
    res.render('404',{
        title : 'error', 
        errormessage :'Help page not found'
    })
})

app.get('*', (req , res)=>{
    res.render('404',{
        title : 'error', 
        errormessage :'Page not found',
        name : 'Kshitiz Goel'
    })})


app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})