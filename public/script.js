document.getElementById('getDataButton').addEventListener('click', async () => {
    const link = document.getElementById('linkInput').value;
    if (!link) {
      alert('Wprowadź link!');
      return;
    }

    const response = await fetch(`/getData?url=${link}`);
    const data = await response.json();

    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';

    data.forEach(item => {
      const row = document.createElement('tr');

      if (item.myShop === 'yes') {
        row.classList.add('highlight');
      }

      row.innerHTML = `
        <td>${item.companyName}</td>
        <td class='description'>${item.description}</td>
        <td>${item.price}</td>
        <td>${item.noItemPromo}</td>
        <td>${item.position}</td>
        <td>${item.myShop}</td>
      `;
      tableBody.appendChild(row);
    });
  });