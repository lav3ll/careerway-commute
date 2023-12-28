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

const experienceLevels = ["Entry", "Mid", "Senior", "Management", "Internship"];

const dropdown1 = $("#industryDropdown");

industryList.forEach((industry) => {
  const optionEl = $("<option>");
  optionEl.val(industry);
  optionEl.text(industry);
  dropdown1.append(optionEl);
});

const dropdown2 = $("#experienceDropdown");

experienceLevels.forEach((level) => {
  const optionEl = $("<option>");
  optionEl.val(level);
  optionEl.text(level);
  dropdown2.append(optionEl);
});

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
  }&industry=${industry}&page=1&descending=true`;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(queryURL);
      console.log(data);
    })
    .catch(console.error);
}
