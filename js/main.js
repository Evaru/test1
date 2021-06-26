const plans = document.getElementsByClassName('plans')[0]
const total = document.getElementsByClassName('total') 
const totalPrice = document.getElementsByClassName('total__price')[0]
const selectedPlan = document.getElementsByClassName('total__plan')[0]
const numberLisenses = document.getElementById('numberLisenses')

const json = new Request('plans.json')

async function getPlans() {
  await fetch(json)
    .then(function(response){return response.json()})
    .then(function(data) {
      let planData=[]
      data.map((plan)=>{
        planData.push( `
                  <label class="plan" id="${plan.number}">
                      <input type="radio" name="plan" checked value="${plan.number}" data-price="${plan.price}">
                      <span class="radio__control"></span>
                      <div class="plan__name"><p>${plan.name}</p></div>
                      <div class="plan__price"><strong>$${plan.price}</strong><p> per license</p></div>
                  </label>`)     
      })
      
      plans.innerHTML=planData.join('')
    
    })
    .catch(e => {
      console.log(`Error ${e}`)
    })
    getTotal()
  }


let getTotal = () =>{
  
  let priceLicense = document.querySelector('input:checked').getAttribute('data-price');
  let selectedPlanNumber = document.querySelector('input:checked').value;

    let planTotal =  plans.children

    for (let plan of planTotal) {
      let price = plan.querySelector('.plan__price strong').textContent
      price=price.replace(/[\D]+/g, '')
      plan.addEventListener('change', (event) => {
        priceLicense=price
      })
    }

  const optionsNumber = 10

  for(let i = 1; i <= optionsNumber;i++){
    let option = document.createElement('option');
    option.value = i
    option.innerHTML = i
    numberLisenses.appendChild(option)
  }

  const paragraph = document.createElement('p')
  paragraph.innerHTML = ` # ${selectedPlanNumber}`
  selectedPlan.appendChild(paragraph)

  const strong = document.createElement('strong')
  strong.innerHTML = `$ ${priceLicense}<sup>us</sup>`
  totalPrice.appendChild(strong)
  

  plans.addEventListener('change', (event) => {
  
    paragraph.innerHTML = `# ${event.target.value}`
    selectedPlan.appendChild(paragraph)

    strong.innerHTML = `$ ${priceLicense*numberLisenses.value}<sup>us</sup>`
    totalPrice.appendChild(strong)

    let id = event.target.value
    let removeActive = document.getElementsByClassName('plan');
    [].forEach.call(removeActive, function(el) {
      el.classList.remove('active');
    })
 
    let addActive = document.getElementById(id)
    addActive.classList.add('active')
    
  })

  numberLisenses.addEventListener('change', (event) => {
    let count = event.target.value
    let total = count*priceLicense
    strong.innerHTML = `$ ${total}<sup>us</sup>`
    totalPrice.appendChild(strong)
    
  });
}

getPlans()