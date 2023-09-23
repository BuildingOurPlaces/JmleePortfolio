const postsData = [
    {
        title: 'The Moon Over Seoul',
        author: 'Han Kang',
        content: 'A novel that portrays the changes in Seoul and the lives of people from various perspectives.',
        price: 10.99
      },
      {
        title: 'Wuthering Heights',
        author: 'Emily Brontë',
        content: 'An intense and haunting story of passion and revenge on the desolate moors of Yorkshire.',
        price: 15.99
      },
      {
        title: '1984',
        author: 'George Orwell',
        content: 'A dystopian novel exploring the dangers of totalitarianism and loss of individuality.',
        price: 8.99
      },
      {
        title: 'Momo',
        author: 'Michael Ende',
        content: 'A fantasy novel that makes you contemplate the value of time and the meaning of human relationships.',
        price: 10.99
      },
      {
        title: 'The Picture of Dorian Gray',
        author: 'Oscar Wilde',
        content: 'A provocative tale about the corrupting influence of pleasure and aestheticism.',
        price: 9.99
      },
      {
        title: 'Frankenstein',
        author: 'Mary Shelley',
        content: 'A seminal work exploring themes of creation, responsibility, and the consequences of ambition.',
        price: 11.99
      },
      {
        title: 'Jane Eyre',
        author: 'Charlotte Brontë',
        content: 'A coming-of-age story featuring a strong-willed heroine and a mysterious mansion.',
        price: 7.99
      },
      {
        title: 'The Stranger',
        author: 'Albert Camus',
        content: 'A philosophical novel that explores the absurdity of life and the detached nature of its protagonist.',
        price: 10.99
      },
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        content: 'An exploration of the American Dream and its elusive promises during the Roaring Twenties.',
        price: 16.99
      },
      {
        title: 'Oliver Twist',
        author: 'Charles Dickens',
        content: 'A gripping story of a young orphan\'s struggles and encounters with Victorian London\'s underworld.',
        price: 13.99
      },
      {
        title: 'The Moon Over Seoul',
        author: 'Han Kang',
        content: 'A novel that portrays the changes in Seoul and the lives of people from various perspectives.',
        price: 10.99
      },
      {
        title: 'Wuthering Heights',
        author: 'Emily Brontë',
        content: 'An intense and haunting story of passion and revenge on the desolate moors of Yorkshire.',
        price: 15.99
      }
  ];

  const topBar = document.querySelector('.top-bar');
  let prevScrollPos = window.pageYOffset;
  
  window.onscroll = function() {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
      topBar.style.top = '0';
    } else {
      topBar.style.top = '-40px'; 
    }
    prevScrollPos = currentScrollPos;
  };
  
  const postList = document.getElementById('postList');
  const selectAllCheckbox = document.getElementById('selectAll');
  
  function createPostRow(post) {
    const row = document.createElement('tr');
    const checkboxCell = document.createElement('td');
    const checkbox = document.createElement('input');
  
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkboxCell.appendChild(checkbox);
  
    row.appendChild(checkboxCell);
    const titleCell = document.createElement('td');
    titleCell.textContent = post.title;
    row.appendChild(titleCell);
    const authorCell = document.createElement('td'); 
    authorCell.textContent = post.author;
    row.appendChild(authorCell);
    const contentCell = document.createElement('td');
    contentCell.textContent = post.content;
    row.appendChild(contentCell);
    const priceCell = document.createElement('td'); 
    priceCell.textContent = `$${post.price.toFixed(2)}`;
    row.appendChild(priceCell);
    const actionsCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button'; 
    actionsCell.appendChild(deleteButton);
    row.appendChild(actionsCell);
    return row;
  }
  
  function populatePostList() {
    postsData.forEach(post => {
      const postRow = createPostRow(post);
      postList.appendChild(postRow);
    });
  }
  
  populatePostList();
  
  function toggleSelectAll() {
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.checked = selectAllCheckbox.checked;
    });
  }
  
  selectAllCheckbox.addEventListener('change', toggleSelectAll);
  
  const addButton = document.querySelector(".top-button-add");
  const deleteButton = document.querySelector(".top-button-del");
  const tableBody = document.getElementById("postList");
  const MAX_TABLE_ROWS = 17; 
  
  addButton.addEventListener("click", addTableRow);
  deleteButton.addEventListener("click", deleteTableRow);
  
  function addTableRow() {
    const currentRowCount = tableBody.children.length;
  
    if (currentRowCount >= MAX_TABLE_ROWS) {
      alert("You can't add more rows.");
      return;
    }
  
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td><input type="checkbox" class="checkbox" checked></td>
      <td contenteditable="false"></td> <!-- title -->
      <td contenteditable="false"></td> <!-- author -->
      <td contenteditable="false"></td> <!-- content -->
      <td contenteditable="false"></td> <!-- price -->
      <td>
        <button class="delete-button">Delete</button>
      </td>
    `;
  
    const newEditableCells = newRow.querySelectorAll("td:not(:first-child):not(:last-child)");
  
    newEditableCells.forEach(cell => {
      cell.addEventListener("dblclick", () => {
        const currentText = cell.textContent.trim();
        const input = createInputField(currentText);
        cell.textContent = "";
        cell.appendChild(input);
        input.focus();
  
        input.addEventListener("keyup", event => {
          if (event.key === "Enter") {
            const newText = input.value;
            cell.removeChild(input);
            cell.textContent = newText;
          }
        });
      });
  
      cell.addEventListener("click", event => {
        event.preventDefault();
      });
    });
  
    const newDeleteButton = newRow.querySelector(".delete-button");
    newDeleteButton.addEventListener("click", () => {
      tableBody.removeChild(newRow);
    });
  
    tableBody.appendChild(newRow);
  }
  
  const tableCells = document.querySelectorAll("td:not(:first-child):not(:last-child)");
  tableCells.forEach(cell => {
    cell.addEventListener("click", event => {
      event.preventDefault();
    });
  });
  
  function deleteTableRow() {
    const selectedRows = document.querySelectorAll("input.checkbox:checked");
    selectedRows.forEach(row => {
      tableBody.removeChild(row.parentElement.parentElement);
    });
  }
  
  const priceTh = document.querySelector("th[data-sort='price']");
  const sortIcon = priceTh.querySelector(".sort-icon");
  let priceSortOrder = "none";
  
  priceTh.addEventListener("click", () => {
    const rows = Array.from(document.querySelectorAll("tbody tr"));
  
    if (priceSortOrder === "none" || priceSortOrder === "desc") {
      rows.sort((rowA, rowB) => {
        const priceA = parseFloat(rowA.querySelector("td:nth-child(5)").textContent.replace("$", ""));
        const priceB = parseFloat(rowB.querySelector("td:nth-child(5)").textContent.replace("$", ""));
        return priceA - priceB;
      });
      priceSortOrder = "asc";
      sortIcon.innerHTML = "&#9650;";
      sortIcon.style.color = "lightpink";
    } else if (priceSortOrder === "asc") {
      rows.sort((rowA, rowB) => {
        const priceA = parseFloat(rowA.querySelector("td:nth-child(5)").textContent.replace("$", ""));
        const priceB = parseFloat(rowB.querySelector("td:nth-child(5)").textContent.replace("$", ""));
        return priceB - priceA;
      });
      priceSortOrder = "desc";
      sortIcon.innerHTML = "&#9660;";
      sortIcon.style.color = "royalblue";
    }
  
    const tbody = document.querySelector("tbody");
    rows.forEach(row => {
      tbody.appendChild(row);
    });
  });
  
  function createInputField(value) {
    const input = document.createElement("input");
    input.type = "text";
    input.value = value;
    input.className = "editable-input"; 
    return input;
  }
  
  const editableCells = document.querySelectorAll("td:not(:first-child):not(:last-child)");
  let editingCell = null;
  
  editableCells.forEach(cell => {
    cell.addEventListener("dblclick", () => {
      if (editingCell) {
        finishEditingCell();
      }
  
      const currentText = cell.textContent.trim();
      const input = createInputField(currentText);
      cell.textContent = "";
      cell.appendChild(input);
      input.focus();
      editingCell = cell;
  
      input.addEventListener("keyup", event => {
        if (event.key === "Enter") {
          finishEditingCell();
        }
      });
    });
  });
  
  function finishEditingCell() {
    if (editingCell) {
      const input = editingCell.querySelector(".editable-input");
      const newText = input.value;
      editingCell.removeChild(input);
      editingCell.textContent = newText;
      editingCell = null;
    }
  }
  
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach(button => {
    button.addEventListener("click", () => {
      const row = button.parentElement.parentElement;
      const index = Array.from(row.parentElement.children).indexOf(row);
      postsData.splice(index, 1);
      row.remove(); 
    });
  });
  
  function exportTableToExcel () {
    alert('Excel');
  }
  
  function showSaveAlert() {
    var confirmation = confirm("Do you want to save?");
    if (confirmation) {
      alert("Saved!");
    }
  }
  