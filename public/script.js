document.getElementById('getDataButton').addEventListener('click', async () => {
    const link = document.getElementById('linkInput').value;
    if (!link) {
      alert('Wprowadź link!');
      return;
    }

    let firstPrice = 0;

    const response = await fetch(`/getData?url=${link}`);
    const data = await response.json();

    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';

    data.forEach((item, index) => {
      const row = document.createElement('tr');

      if (item.myShop === 'yes') {
        row.classList.add('highlight');
      }

      if(index === 3) {
        firstPrice = item.price;
      }

      row.innerHTML = `
        <td>${item.companyName}</td>
        <td class='description'>${item.description}</td>
        <td>${item.price}</td>
        <td>${item.noItemPromo}</td>
        <td>${item.position}</td>
        <td>${item.myShop}</td>
        <td>${item.price}</td>
      `;
      tableBody.appendChild(row);
    });
  });