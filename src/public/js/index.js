let socket = io() 
const table = document.getElementById('realProductsTable') 

document.getElementById('createBtn').addEventListener('click', () => {
    const body = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        code: document.getElementById('code').value,
        stock: document.getElementById('stock').value,
        category: document.getElementById('category').value,
    } 
    fetch('/api/products', {
        method: 'POST', 
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }, 
    }) 
    .then(result => result.json()) 
    .then(result => {
        if (result.status === 'error') throw new Error(result.error)
    }) 
    .then(() => fetch('/api/products?limit=10000')) 
    .then(result => result.json()) 
    .then(result => {
        if (result.status === 'error') throw new Error(result.error)
        else socket.emit('productList', result.payload) 
        alert('Producto creado con éxito!')
        document.getElementById('title').value = '' 
        document.getElementById('description').value = ''
        document.getElementById('price').value = ''
        document.getElementById('code').value = ''
        document.getElementById('stock').value = ''
        document.getElementById('category').value = ''
    }) 
    .catch(error => alert(`Ocurrio un error : ${error}`)) 
})

deleteProduct = (id) => {
    console.log(id);
    fetch(`/api/products/${id}`, {
      method: 'DELETE',
    })
      .then((result) => {
        if (result.ok) {
          alert('Producto eliminado con éxito!');
        } else {
          throw new Error('Error al eliminar el producto');
        }
      })
      .then(() => fetch('/api/products?limit=10000'))
      .then((result) => result.json())
      .then((result) => {
        if (result.status === 'error') throw new Error(result.error);
        else socket.emit('productList', result.payload);
      })
      .catch((error) => alert(`Ocurrió un error: ${error}`));
  };

socket.on('updatedProducts', data => {
    console.log(data)
    const tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; 

    for (const product of data) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><button onclick="deleteProduct('${product._id}')">Eliminar</button></td>
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.code}</td>
            <td>${product.stock}</td>
            <td>${product.category}</td>`;
        tbody.appendChild(tr);
    }
});
