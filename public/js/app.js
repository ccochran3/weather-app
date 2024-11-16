console.log('Client side javascript file is loaded')


const weatherForm = document.querySelector('form')
const weatherInput = document.querySelector('input')
const successParagraph = document.querySelector('.success')
const errorParagraph = document.querySelector('.error')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = weatherInput.value;
    successParagraph.innerText = "Loading...."
    errorParagraph.innerText = ''
    
    fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
        response.json().then(data => {
            if (!data.error) {
                console.log(data)
                successParagraph.innerText = `Location: ${data.location}, ${data.data}`
            } else {
                console.log('custom error', data.error)
                errorParagraph.innerText = data.error
            }
        })
    })
})