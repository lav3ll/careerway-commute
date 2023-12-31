const apID = "35a50561";
const apiKey = "5464348b76ae95a0b90aa68d7acc6aae";

// Event listner for submit button
$(document).ready(() => {
  $("#search-submit").click((e) => {
    e.preventDefault();
    const selectedCity = $("#city").val();
    const searchQueryEl = $("#search-query").val();
    const selectedLevel = $("#experienceDropdown").val();
    getJobs(selectedCity, searchQueryEl, selectedLevel);
  });
});

function getJobs(city, searchQuery, level) {
  // Updated parameter name here as well

  const queryURL = `http://api.adzuna.com:80/v1/api/jobs/gb/search/1?app_id=${apID}&app_key=${apiKey}&results_per_page=10&what=${searchQuery}&where=${city}&content-type=application/json`;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //   console.log(queryURL);
      showJobs(data.results);
      console.log(data.results, "test");
    })
    .catch(console.error);
}

// Function that displays job information for given companies
function showJobs(companies) {
  // Selecting the container element where company information will be displayed
  const companyContainerEl = $("#company-container");

  // Clearing the content of the main element where the job information will be shown
  $("#main").empty();

  // Looping through each company in the provided array
  companies.forEach((company) => {
    // Logging the current company object to the console
    console.log(company);

    // Creating a new div element to hold company information
    const companyEl = $("<div>");

    // Adding the 'card' and 'col-6' classes to style the company element
    companyEl.addClass("card col-6");

    // Creating elements to display company name, job position, and publication date
    const companyName = $("<h5>").text(company.company.display_name);
    const position = $("<p>").text(company.title);
    const publishDate = $("<p>").text(`Published ${company.created}`);

    const cardFooter = $("<div>");
    // Creating a link element to the company's landing page
    const link = $("<a>")
      .text(`${company.company.display_name} website`)
      .attr("href", company.redirect_url);
    link.addClass("col-3");
    const mapBtn = $("<button>").text("Commute");
    mapBtn.addClass("commute-btn btn btn-primary ms-5");
    const saveBtn = $("<button>").text("Save");
    saveBtn.addClass("save-btn btn btn-primary");
    cardFooter.append(link, mapBtn, saveBtn);

    // Appending company information elements to the company element
    companyEl.append(companyName, position, publishDate, cardFooter);

    // Appending the company element to the container element
    companyContainerEl.append(companyEl);
  });
}

/////////////////////////////////// SIGN IN //////////////////////////
// Function to handle the sign-in process
function signIn() {
  // Retrieving the entered email and password values from the input fields
  const emailEl = $("#signin-email").val();
  const password = $("#signin-password").val();

  // Checking if provided email and password match any set of credentials
  const found = credentials.some(
    (cred) => cred.email === emailEl && cred.password === password
  );

  // Checking if the credentials are found and logging the result
  if (found) {
    console.log("Login successful");
  } else {
    console.log("Account does not exist");
  }
}

// Binding the signIn function to the click event of the sign-in button
const signInEl = $("#signin");
signInEl.click(signIn);

// Array containing sets of email and password credentials
const credentials = [
  {
    email: "test1@gmail.com",
    password: "password123",
  },
  {
    email: "tes2@google.com",
    password: "securePass",
  },
];

/////////////////////////////////// REGISTER //////////////////////////

function signUp() {
  // Function to handle the register process
  function signup() {
    // Retrieving the entered email and password values from the input fields
    const emailEl = $("#register-email").val();
    const password1 = $("#password1").val();
    const password2 = $("#password2").val();

    // Checking if the passwords match
    const passwordsMatch = password1 === password2;

    // Checking if the provided email is unique (not already in credentials)
    const emailExists = credentials.some((cred) => cred.email === emailEl);

    // Checking if the email is unique and passwords match
    if (!emailExists && passwordsMatch) {
      console.log("You have now signed up to CareerWay Commut");
      console.log(credentials);
      // Add the new user to the credentials array
      credentials.push({ email: emailEl, password: password1 });
    } else if (!passwordsMatch) {
      console.log("passwords do not match!");
    } else {
      console.log("Please enter a valid email address and matching passwords");
    }
  }

  // Binding the signup function to the click event of the sign-up button
  const signUpEl = $("#signup");
  signUpEl.click(signup);
}

// Call signUp function
signUp();

/////////////////////////////////// Commute Button //////////////////////////
// Delegate the commute btn click function through parent element
$("#company-container").on("click", ".commute-btn", () => {
  console.log("Commute button clicked");
});

/////////////////////////////////// Save Button //////////////////////////
// Delegate the save btn click function through parent element
$("#company-container").on("click", ".save-btn", () => {
  console.log("Save button clicked");
});
