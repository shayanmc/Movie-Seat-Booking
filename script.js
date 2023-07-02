const container = document.querySelector(".container");

const seats = document.querySelectorAll(".row .seat:not(.occupied)");

const count = document.querySelector("#count");

const total = document.querySelector("#total");

const movieSelect = document.querySelector("#movie");



populateUi();



let ticketPrice = +movieSelect.value;


function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}



function updateSelectedCount() {
  const selectedSeat = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeat].map((seat) => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedSeat", JSON.stringify(seatsIndex));

  const selectedSeatCount = selectedSeat.length;

  count.innerText = selectedSeatCount;
  total.innerText = selectedSeatCount * ticketPrice;
}



function populateUi() {
  const selectedSeat = JSON.parse(localStorage.getItem("selectedSeat"));

  if (selectedSeat !== null && selectedSeat.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeat.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}



movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;

  setMovieData(e.target.selectedIndex, e.target.value);

  updateSelectedCount();
});



container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

updateSelectedCount();
