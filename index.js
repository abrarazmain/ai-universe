// function for getting data from APi
const fetchAiTools = async () => {
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  try {
    fetch(URL);
    const res = await fetch(URL);
    const data = await res.json();
    displayAiTools(data.data);
  } catch (error) {
    console.log(error);
  }
};

// function for display API data on DOM
const displayAiTools = (data) => {
  const container = document.getElementById("card-container");
  const showAll = document.getElementById("btn-show-all");
  
  console.log(data);
  showAll.addEventListener("click", function () {
    // Clear the container element
    container.innerHTML = "";
    showAll.classList.add("d-none");
    data.tools.forEach((singleData) => {
      container.innerHTML += `
          <div class="card col-xs-12 col-sm-12 col-md-3" style="height: 500px;">
    <img src="${singleData.image}" class="card-img-top my-3" alt="...">
    <div class="card-body">
      <h5 class="card-title">Features</h5>
      <ol>
      ${singleData.features[0] ? `<li>${singleData.features[0]}</li>` : ""}
      ${singleData.features[1] ? `<li>${singleData.features[1]}</li>` : ""}
      ${singleData.features[2] ? `<li>${singleData.features[2]}</li>` : ""}
      </ol>
      <hr>
      <div class="d-flex justify-content-between">
      <div>
      <h5 class="card-title">${singleData.name}</h5>
      <p class="card-text"><small class="text-muted"><i class="fa-solid fa-calendar-days"></i> ${
        singleData.published_in
      }</small></p>
      </div>
      <div>
      <p data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fetchSingleCard('${
        singleData.id
      }')" class="btn btn-outline-secondary  bg-light-subtle
      "><i class="fa-solid fa-arrow-right"></i></p>
      </div>
      </div>
    </div>
  </div>`;
    });
    toggleSpinner(false);
  });
  
// show only 6
  data.tools.slice(0, 6).forEach((singleData) => {
    container.innerHTML += `
        <di v class="card col-xs-12 col-sm-12 col-md-3" style="height: 500px;">
  <img src="${singleData.image}" class="card-img-top my-3" alt="...">
  <div class="card-body">
    <h5 class="card-title">Features</h5>
    <ol>
    ${singleData.features[0] ? `<li>${singleData.features[0]}</li>` : ""}
    ${singleData.features[1] ? `<li>${singleData.features[1]}</li>` : ""}
    ${singleData.features[2] ? `<li>${singleData.features[2]}</li>` : ""}
    </ol>
    <hr>
    <div class="d-flex justify-content-between">
    <div>
    <h5 class="card-title">${singleData.name}</h5>
    <p class="card-text"><small class="text-muted"><i class="fa-solid fa-calendar-days"></i> ${
      singleData.published_in
    }</small></p>
    </div>
    <div>
    <p data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fetchSingleCard('${
      singleData.id
    }')" class="btn btn-outline-secondary  bg-light-subtle
    "><i class="fa-solid fa-arrow-right"></i></p>
    </div>
    </div>
  </div>
</div>`;
  });
  toggleSpinner(false);
};



// function for fetch single card
const fetchSingleCard = async (id) => {
  const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  try {
    fetch(URL);
    const res = await fetch(URL);
    const data = await res.json();
    displaySingleCard(data.data);
  } catch (error) {
    console.log(error);
  }
};



// function for display single card on modal
const displaySingleCard = (data) => {
  console.log(data);
  document.getElementById("modal-1-title").innerText = data.description;
  document.getElementById("plan").innerHTML = `
   <div class="text-success fw-bold bg-light p-3 rounded">${
     data.pricing[0].price ? data.pricing[0].price : "no data found"
   } 
   <br> ${data.pricing[0].plan ?data.pricing[0].plan : 'no data found'}</div>
    <div class="text-danger-emphasis fw-bold bg-light p-3 rounded">${
      data.pricing[1].price ? data.pricing[1].price : "no data found"
    } <br> ${data.pricing[1].plan ? data.pricing[1].plan : 'no data found'}</div>
    <div class="text-warning-emphasis fw-bold bg-light p-3 rounded">${
      data.pricing[2].price ? data.pricing[2].price : "no data found"
    } <br> ${data.pricing[2].plan ? data.pricing[2].plan : 'no data found'}</div>
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
   ${data.integrations[0] ? `<li>${data.integrations[0]}</li>` : ""}
   ${data.integrations[1] ? `<li>${data.integrations[1]}</li>` : ""}
   ${data.integrations[2] ? `<li>${data.integrations[2]}</li>` : ""}
   </ul> 
   </div>
    `;
  // modal card 2
  document.getElementById("modal2").innerHTML = `
  <div class="modal-img-div">
  <img src="${data.image_link[0]}" class="card-img-top" alt="...">
  <button id="special-btn type="button" class="${
    data.accuracy.score == null ? "d-none" : "d-block"
  } fw-bold modal-btn-div btn btn-primary"
      style="--bs-btn-padding-y: .35rem; --bs-btn-padding-x: .30rem; --bs-btn-font-size: .80rem;">
${Math.round(data.accuracy.score * 100)}% Accuracy
</button>
  </div>
    <h5 class="card-title d-flex justify-content-center">${
      data.input_output_examples[0].input
    }</h5>
    <p class="d-flex justify-content-center mx-auto">${
      data.input_output_examples[0].output
    }</p>
    `;
};

// function for loader
const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

