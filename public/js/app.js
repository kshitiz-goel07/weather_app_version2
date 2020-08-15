
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const textOne = document.querySelector('#message-1')
const textTwo = document.querySelector('#message-2')

 weatherform.addEventListener('submit' , (e)=>{
     e.preventDefault()
     const location = search.value
    textOne.textContent = 'Loading Weather info...'
    textTwo.textContent = ''

     fetch('/weather?address='+ location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            textOne.textContent = data.error        }
        else{
            textOne.textContent = data.forecast
            textTwo.textContent = data.location
        }
    })
})
 })