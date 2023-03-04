// function for getting data from APi
const fetchAiTools = () => {
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      displayAiTools(data.data);
    })
    .catch((error) => console.error(error));
};

// function for display API data on DOM
const displayAiTools = (data) => {
  console.log(data.tools);
  const container = document.getElementById("card-container");
  const showAll = document.getElementById("btn-show-all");
  // ===============================================

  showAll.addEventListener("click", function () {
    // Clear the container element
    container.innerHTML = "";
    showAll.classList.add("d-none");
    data.tools.forEach((singleDta) => {
      // console.log(singleDta);
      container.innerHTML += `
          <di v class="card col-3" style="height: 500px;">
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
      "><i class="fa-solid fa-arrow-right"></i></p>
      </div>
      </div>
    </div>
  </div>`;
    });
    toggleSpinner(false);
  });
  // ===============================================
  data.tools.slice(0, 6).forEach((singleDta) => {
    // console.log(singleDta);
    container.innerHTML += `
        <di v class="card col-3" style="height: 500px;">
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
    "><i class="fa-solid fa-arrow-right"></i></p>
    </div>
    </div>
  </div>
</div>`;
  });
  toggleSpinner(false);
};

// function for fetch single card
const fetchSingleCard = (id) => {
  // console.log(id);
  const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  //   console.log(URL);
  fetch(URL)
    .then((res) => res.json())
    .then((data) => displaySingleCard(data.data));
};

// function for display single card on modal
const displaySingleCard = (data) => {
  console.log(data);
  document.getElementById("modal-1-title").innerText = data.description;
  document.getElementById("plan").innerHTML = `
   <div class="text-success fw-bold bg-light p-3 rounded">${
     data.pricing[0].price ? data.pricing[0].price : "no data found"
   } 
   <br> ${data.pricing[0].plan}</div>
    <div class="text-danger-emphasis fw-bold bg-light p-3 rounded">${
      data.pricing[1].price ? data.pricing[1].price : "no data found"
    } <br> ${data.pricing[1].plan}</div>
    <div class="text-warning-emphasis fw-bold bg-light p-3 rounded">${
      data.pricing[2].price ? data.pricing[2].price : "no data found"
    } <br> ${data.pricing[2].plan}</div>
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
   ${data.integrations ? `<li>${data.integrations[0]}</li>` : ""}
   ${data.integrations ? `<li>${data.integrations[1]}</li>` : ""}
   ${data.integrations ? `<li>${data.integrations[2]}</li>` : ""}
   </ul> 
   </div>
    `;
  // modal card 2
  document.getElementById("modal2").innerHTML = `
    <div class="test">
    <img src="${data.image_link[0]}" class="card-img-top" alt="...">
    <button id="special-btn type="button" class="${data.accuracy.score == null ? 'd-none' : 'd-block'} fw-bold test2 btn btn-primary"
        style="--bs-btn-padding-y: .35rem; --bs-btn-padding-x: .30rem; --bs-btn-font-size: .80rem;">
  ${data.accuracy.score}% Accuracy
</button>
    </div>
    <h5 class="card-title d-flex justify-content-center">${data.input_output_examples[0].input}</h5>
    <p class="d-flex justify-content-center mx-auto">${data.input_output_examples[0].output}</p>
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

// =================================
const fetchApiDate = () => {
  const apiUrl = "https://openapi.programming-hero.com/api/ai/tools";

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => displayCardsByDate(data.data));
};
// ====================================
const displayCardsByDate = (data) => {
  const container = document.getElementById("card-container");

  // Sort the data by date in descending order
  const sortedData = data.sort(
    (a, b) => new Date(b.published_in) - new Date(a.published_in)
  );

  // Display the cards in the container
  sortedData.forEach((singleData) => {
    container.innerHTML += `
      <div class="card col-3" style="height: 500px;">
        <img src="${singleData.image}" class="card-img-top my-3" alt="...">
        <div class="card-body">
          <h5 class="card-title">Features</h5>
          <ol>
            ${
              singleData ? `<li>${singleData.features[0]}</li>` : ""
            }
            ${
              singleData ? `<li>${singleData.features[1]}</li>` : ""
            }
            ${
              singleData ? `<li>${singleData.features[2]}</li>` : ""
            }
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
              }')" class="btn btn-outline-secondary bg-light-subtle"><i class="fa-solid fa-arrow-right"></i></p>
            </div>
          </div>
        </div>
      </div>`;
  });
};

