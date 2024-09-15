async function fetchTickers() {
  try {
      const response = await fetch('http://localhost:3001/api/tickers');
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      renderTickers(data);
  } catch (error) {
      console.error('Failed to fetch tickers:', error);
      document.getElementById('tickers-table').innerHTML = `
          <tr>
              <td colspan="6">Failed to fetch data. Please try again later.</td>
          </tr>
      `;
  }
}

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#000000';
  } else {
    document.body.style.backgroundColor = '#141622';
    document.body.style.color = '#ffffff';
  }
});


function renderTickers(data) {
  const tableBody = document.getElementById('tickers-table');
  tableBody.innerHTML = ''; // Clear existing table rows

  data.forEach((ticker, index) => {
      const row = `
          <tr>
              <td>${index + 1}</td>
              <td>${ticker.name}</td>
              <td>${ticker.last}</td>
              <td>${ticker.buy}</td>
              <td>${ticker.sell}</td>
              <td>${ticker.volume}</td>
              <td>${ticker.base_unit}</td>
          </tr>
      `;
      tableBody.innerHTML += row;
  });
}

// Fetch tickers when the page loads
fetchTickers();
