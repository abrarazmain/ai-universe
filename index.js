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
  const container = document.getElementById("card-container");
  data.tools.forEach((singleDta) => {
    // console.log(singleDta);
    container.innerHTML += `
        <di v class="card col-3" style="">
  <img src="${singleDta.image}" class="card-img-top my-3" alt="...">
  <div class="card-body">
    <h5 class="card-title">Features</h5>
    <ol>
    ${singleDta.features[0] ? `<li>${singleDta.features[0]}</li>` : ""}
    ${singleDta.features[1] ? `<li>${singleDta.features[1]}</li>` : ""}
    ${singleDta.features[2] ? `<li>${singleDta.features[2]}</li>` : ""}
    </ol>
    <hr>
    <div class="d-flex justify-content-between">
    <div>
    <h5 class="card-title">${singleDta.name}</h5>
    <p class="card-text"><small class="text-muted"><i class="fa-solid fa-calendar-days"></i> ${
      singleDta.published_in
    }</small></p>
    </div>
    <div>
    <p data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fetchSingleCard('${
      singleDta.id
    }')" class="btn btn-outline-secondary  bg-light-subtle
    "><i class="fa-solid fa-circle-arrow-right"></i></p>
    </div>
    </div>
  </div>
</div>`;
  });
};

const fetchSingleCard = (id) => {
  console.log(id);
  const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  //   console.log(URL);
  fetch(URL)
    .then((res) => res.json())
    .then((data) => displaySingleCard(data.data));
};

const displaySingleCard = (data) => {
  console.log(data);
  const container = document.getElementById("modal-container");
  document.getElementById("modal-1-title").innerText = data.description;
  document.getElementById("plan").innerHTML = `
    <div class="text-success fw-bold bg-light p-3 rounded">${data.pricing[0].price} /<br> ${data.pricing[0].plan}</div>
    <div class="text-danger-emphasis fw-bold bg-light p-3 rounded">${data.pricing[1].price} /<br> ${data.pricing[1].plan}</div>
    <div class="text-warning-emphasis fw-bold bg-light p-3 rounded">${data.pricing[2].price} /<br> ${data.pricing[2].plan}</div>
    `;
  document.getElementById("card-feature").innerHTML = `
    <div>
    <h5 class="card-title">Feature</h5>
    <ul>
    <li>${data.features[1].feature_name}</li>
    <li>${data.features[2].feature_name}</li>
    <li>${data.features[3].feature_name}</li>
    </ul>
    </div>
   <div>
   <h5 class="card-title">Integrations</h5>
   <ul>
    <li>${data.integrations[0]}</li>
    ${data.integrations[1] ? `<li>${data.integrations[1]}</li>` : ""}
    ${data.integrations[2] ? `<li>${data.integrations[2]}</li>` : ""}
    </ul>
   </div>
    `;
    document.getElementById('modal2').innerHTML = `
    <img src="${data.image_link[0]}" class="card-img-top" alt="...">
    <h5 class="card-title">Integrations</h5>
    `
    
};
