const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.loadProducts();
    this.productIdCounter = this.products.length > 0 ? Math.max(...this.products.map(product => product.id)) + 1 : 1;
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data, 'utf8');
  }

  addProduct(productData) {
    const newProduct = {
      id: this.productIdCounter++,
      ...productData,
    };

    this.products.push(newProduct);
    this.saveProducts();

    console.log("Producto agregado:", newProduct);
  }

  getProducts() {
    this.loadProducts();
    return this.products;
  }

  getProductById(id) {
    this.loadProducts();
    const product = this.products.find(product => product.id === id);

    if (product) {
      return product;
    } else {
      throw new Error("Producto no encontrado");
    }
  }

  updateProduct(id, updatedFields) {
    this.loadProducts();
    const index = this.products.findIndex(product => product.id === id);

    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedFields };
      this.saveProducts();
      console.log("Producto actualizado:", this.products[index]);
    } else {
      throw new Error("Producto no encontrado");
    }
  }

  deleteProduct(id) {
    this.loadProducts();
    const index = this.products.findIndex(product => product.id === id);

    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1)[0];
      this.saveProducts();
      console.log("Producto eliminado:", deletedProduct);
    } else {
      throw new Error("Producto no encontrado");
    }
  }
}

// Testing
const productManager = new ProductManager('productos.json');

// Arreglo vacío []
console.log("Todos los productos:", productManager.getProducts());

// addProduct
productManager.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 100,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 10
});

productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc124",
    stock: 20
  });

  productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 300,
    thumbnail: "Sin imagen",
    code: "abc125",
    stock: 30
  });

  productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 400,
    thumbnail: "Sin imagen",
    code: "abc126",
    stock: 40
  });

// getProducts
console.log("Todos los productos:", productManager.getProducts());

// getProductById
try {
  const productIdToSearch = 1; // Reemplazar id
  const foundProduct = productManager.getProductById(productIdToSearch);
  console.log(`Producto con ID ${productIdToSearch}:`, foundProduct);
} catch (error) {
  console.error(error.message);
}

// updateProduct
try {
  const productIdToUpdate = 2; // Reemplazar id
  productManager.updateProduct(productIdToUpdate, { price: 250 });
} catch (error) {
  console.error(error.message);
}

// deleteProduct
try {
  const productIdToDelete = 3; // Reemplazar id
  productManager.deleteProduct(productIdToDelete);
} catch (error) {
  console.error(error.message);
}

console.log("Todos los productos después de eliminar:", productManager.getProducts());