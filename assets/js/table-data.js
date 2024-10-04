document.addEventListener('DOMContentLoaded' , function(e) {

  const apiUrl = 'http://94.136.187.170:4017/api/v1/trackData/'; 

  function showLoading() {
      document.getElementById('loading').style.display = 'block';
    }

    // Function to hide the loading indicator
    function hideLoading() {
      document.getElementById('loading').style.display = 'none';
    }

    function generateTableHeaders(headers) {
      const thead = document.querySelector('table.tblContainer thead');
      const headerRow = thead.querySelector('tr');
      headerRow.innerHTML = ''; // Clear existing headers

      headers.forEach(header => {
          const th = document.createElement('th');
          th.textContent = header;
          headerRow.appendChild(th);
      });
  }



    // Function to fetch data and populate the table
    function populateTable() {
      // Show loading indicator
      showLoading();

      const savedValue = localStorage.getItem('savedValue');
      const searchValue = localStorage.getItem('searchValue') || '';
      

      const data = {
        savedValue,
        searchValue,
      }

      axios.post(apiUrl , data).then((response) => {
        
      const data = response.data;


    
    const tableBody = document.getElementById('tableBody');
    const title = document.getElementById('title');
    if(savedValue === 'C') { 
      title.textContent= `Container ${searchValue} `;
    } 
    
    if(savedValue === 'B') {
      title.textContent = `BL No ${searchValue} `;
    }
    const dataUsers = data?.BLDetails?.Activity;
    tableBody.innerHTML = '';

    // Loop through the data and create table rows
    if (!dataUsers || dataUsers.length === 0) {
      const noDataRow = document.createElement('tr');
      const noDataCell = document.createElement('td');
      noDataCell.colSpan = 5; 
      noDataCell.textContent = 'No Data';
      noDataCell.style.textAlign = 'center';
      noDataRow.appendChild(noDataCell);
      tableBody.appendChild(noDataRow);
  } else {

      const firstItem = dataUsers[0];
              const headers = Object.keys(firstItem).map(key => {
                  switch(key) {
                      case 'ContainerNo': return  savedValue === "C" ?  'Container No.' :  'Booking No.';
                      case 'ActivityName': return 'Activity Name';
                      case 'ActivityDate': return 'Activity Date';
                      case 'FromLocation': return 'Location From';
                      case 'ToLocation': return 'Location To';
                      default: return key;
                  }
              });

       generateTableHeaders(headers);       
     
      dataUsers?.forEach((item) => {
        const row = document.createElement('tr');

        const firstNameCell = document.createElement('td');
        firstNameCell.textContent = item?.ContainerNo;
        row.appendChild(firstNameCell);

        const lastNameCell = document.createElement('td');
        lastNameCell.textContent = item?.ActivityName;
        row.appendChild(lastNameCell);

        const savingsCell = document.createElement('td');
        savingsCell.textContent = item?.ActivityDate;
        row.appendChild(savingsCell);

        const locationNo = document.createElement('td');
        locationNo.textContent = item?.FromLocation;
        row.appendChild(locationNo);

        const middleName = document.createElement('td');
        middleName.textContent = item?.ToLocation;
        row.appendChild(middleName);

        // Append the row to the table body
        tableBody.appendChild(row);
      });
    }
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    // Optionally, show an error message to the user
  })
  .finally(() => {
    // Hide loading indicator
    hideLoading();
  });
}

    populateTable(); 
})