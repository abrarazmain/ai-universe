// function for getting data from APi
const fetchAiTools = () => {
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => displayAiTools(data.data))
    .catch((error) => console.error(error));
};

// function for display API data on DOM
const displayAiTools = (data) => {
    console.log(data);
    const container = document.getElementById('card-container')
    data.tools.forEach(singleDta => {
        console.log(singleDta);
        container.innerHTML +=`
        <di v class="card col-3" style="">
  <img src="${singleDta.image}" class="card-img-top my-3" alt="...">
  <div class="card-body">
    <h5 class="card-title">Features</h5>
    <ol>
    ${singleDta.features[0] ? `<li>${singleDta.features[0]}</li>` : ''}
    ${singleDta.features[1] ? `<li>${singleDta.features[1]}</li>` : ''}
    ${singleDta.features[2] ? `<li>${singleDta.features[2]}</li>` : ''}
    </ol>
    <hr>
    <div class="d-flex justify-content-between">
    <div>
    <h5 class="card-title">${singleDta.name}</h5>
    <p class="card-text"><small class="text-muted"><i class="fa-solid fa-calendar-days"></i> ${singleDta.published_in}</small></p>
    </div>
    <div>
    <p class="btn btn-outline-secondary rounded-pill bg-light-subtle
    "><i class="fa-solid fa-circle-arrow-right"></i></p>
    </div>
    </div>
  </div>
</div>`

    });
}


  
