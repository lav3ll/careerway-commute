// Array holding list of different industries
const industryList = [
  "Accounting",
  "Advertising and Agencies",
  "Architecture",
  "Arts & Music",
  "Biotechnology",
  "Blockchain",
  "Client Services",
  "Consulting",
  "Consumer Goods & Services",
  "Data Science",
  "Education",
  "Energy",
  "Engineering",
  "Entertainment & Gaming",
  "Fashion & Beauty",
  "Financial Services",
  "Fintech",
  "Fitness & Wellness",
  "Food & Beverage",
  "Government",
  "Healthcare",
  "Healthtech",
  "Information Technology",
  "Insurance",
  "Law",
  "Manufacturing",
  "Marketing",
  "Media",
  "Mortgage",
  "Non-Profit",
  "Pharmaceutical",
  "Public Relations & Communications",
  "Real Estate & Construction",
  "Retail",
  "Social Good",
  "Social Media",
  "Software",
  "Technology",
  "Telecom",
  "Trading",
  "Travel and Hospitality",
  "Veterinary",
];

// Array holding list of differente experience levels
const experienceLevels = ["Entry", "Mid", "Senior", "Management", "Internship"];

const dropdown1 = $("#industryDropdown");

// Populate html form list with data from array
industryList.forEach((industry) => {
  const optionEl = $("<option>");
  optionEl.val(industry);
  optionEl.text(industry);
  dropdown1.append(optionEl);
});

const dropdown2 = $("#experienceDropdown");

// Populate html form list with data from array
experienceLevels.forEach((level) => {
  const optionEl = $("<option>");
  optionEl.val(level);
  optionEl.text(level);
  dropdown2.append(optionEl);
});

// Event listner for submit button
$(document).ready(() => {
  $("#search-submit").click((e) => {
    e.preventDefault();
    const selectedCity = $("#city").val();
    const selectedIndustry = $("#industryDropdown").val();
    const selectedLevel = $("#experienceDropdown").val();
    getJobs(selectedCity, selectedIndustry, selectedLevel);
  });
});

function getJobs(city, industry, level) {
  // Updated parameter name here as well
  const queryURL = `https://www.themuse.com/api/public/jobs?location=${city}%2C%20United%20Kingdom&level=${
    level + "%20Level"
  }&industry=${industry}&page=1&descending=false`;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //   console.log(queryURL);
      console.log(data.results);
      showJobs(data.results);
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
    const companyName = $("<h5>").text(company.company.name);
    const position = $("<p>").text(company.name);
    const publishDate = $("<p>").text(`Published ${company.publication_date}`);

    // Creating a link element to the company's landing page
    const link = $("<a>")
      .text(`${company.company.name} website`)
      .attr("href", company.refs.landing_page); // Assuming company.refs has the landing page URL

    // Appending company information elements to the company element
    companyEl.append(companyName, position, publishDate, link);

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
