const containerSelected = document.getElementById('land-cont');
const blNoSelected = document.getElementById('bill-cont');
const bookingNumber = document.getElementById('booking-numbr');
const searchInput = document.getElementById('gsearch-01');
const searchButton = document.getElementById('seachBtn-01');
const link = document.querySelector('.noLink');

let savedValue = localStorage.getItem('savedValue') || '';
let inputValue = localStorage.getItem('searchValue') || '';

// Update the radio buttons based on saved value
if (savedValue === 'C') {
    containerSelected.checked = true;
    blNoSelected.checked = false;
    bookingNumber.checked  = false;
} else if (savedValue === 'B') {
    containerSelected.checked = false;
    blNoSelected.checked = true;
    bookingNumber.checked  = false;

} else if (savedValue === 'J') { 
    containerSelected.checked = false;
    blNoSelected.checked = false;
    bookingNumber.checked  = true;

} else {
    containerSelected.checked = false;
    blNoSelected.checked = false;
    bookingNumber.checked  = false;
}

// Update the search input based on saved value
searchInput.value = inputValue;

// Update the anchor tag href based on search input
function updateAnchor() {
    const input = searchInput.value.trim();
    if (input) {
        link.href = `./track.html`;
    } else {
        link.href = '#'; 
    }
}

// Event listener for radio buttons
containerSelected.addEventListener('click', () => {
    if (containerSelected.checked) {
        localStorage.setItem('savedValue', 'C');
    } else if (!blNoSelected.checked) {
        localStorage.removeItem('savedValue');
    }
});

blNoSelected.addEventListener('click', () => {
    if (blNoSelected.checked) {
        localStorage.setItem('savedValue', 'B');
    } else if (!containerSelected.checked) {
        localStorage.removeItem('savedValue');
    }
});


bookingNumber.addEventListener('click', () => {
    if (bookingNumber.checked) {
        localStorage.setItem('savedValue', 'J');
    } else if (!containerSelected.checked) {
        localStorage.removeItem('savedValue');
    }
});

// Event listener for search input
searchInput.addEventListener('input', () => {
    inputValue = searchInput.value;
    localStorage.setItem('searchValue', inputValue);
    updateAnchor(); 
});

updateAnchor();

