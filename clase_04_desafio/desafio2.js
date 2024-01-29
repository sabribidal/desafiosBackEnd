class ProductManager {
    constructor() {
        this.products = [];
        this.nextProductId = 1;
    }

    addProduct(product) {
        // verificar si el código del producto ya existe
        if (this.products.some(p => p.code === product.code)) {
            throw new Error('El código de producto ya existe');
        }

        // agregar un nuevo producto con el próximo ID
        const newProduct = {
            id: this.nextProductId,
            ...product,
        };
        this.products.push(newProduct);
        this.nextProductId++; // incrementar los ID para que no se repitan
        return newProduct;
    }

    getProducts() {
        return this.products;
    }

    getProductById(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return product;
    }

    updateProduct(productId, updatedFields) {
        const index = this.products.findIndex(p => p.id === productId);
        if (index === -1) {
            throw new Error('Producto no encontrado');
        }

        // asegurarse de que el ID no sea eliminado y realizar la actualización
        this.products[index] = { ...this.products[index], ...updatedFields, id: productId };
        return this.products[index];
    }

    deleteProduct(productId) {
        const index = this.products.findIndex(p => p.id === productId);
        if (index === -1) {
            throw new Error('Producto no encontrado');
        }

        // eliminar el producto y devolverlo
        const deletedProduct = this.products.splice(index, 1)[0];
        return deletedProduct;
    }
}

const productManager = new ProductManager();

// llamar a getProducts (debería devolver un arreglo vacío)
console.log('Productos iniciales:', productManager.getProducts());

// llamar a addProduct con un nuevo producto 1
const producto1 = {
    title: 'Producto de prueba 1',
    description: 'Este es un producto de prueba 1',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
};

try {
    const productoAgregado1 = productManager.addProduct(producto1);
    console.log('Producto 1 agregado exitosamente:', productoAgregado1);

    // obtener el ID del producto 1 agregado
    const productId1 = productoAgregado1.id;

    // llamar a addProduct con un nuevo producto 2
    const producto2 = {
        title: 'Producto de prueba 2',
        description: 'Este es un producto de prueba 2',
        price: 300,
        thumbnail: 'Sin imagen',
        code: 'xyz789',
        stock: 30,
    };

    const productoAgregado2 = productManager.addProduct(producto2);
    console.log('Producto 2 agregado exitosamente:', productoAgregado2);

    // obtener el ID del producto 2 agregado
    const productId2 = productoAgregado2.id;

    // llamar a getProducts para verificar los productos agregados
    console.log('Productos actuales:', productManager.getProducts());

    // llamar a getProductById y corroborar que devuelva el producto buscado con el ID especificado
    const foundProduct1 = productManager.getProductById(productId1);
    console.log('Producto 1 encontrado:', foundProduct1);

    // llamar a updateProduct para cambiar un campo de algún producto
    const updatedFields = { price: 250, stock: 20 };
    const updatedProduct = productManager.updateProduct(productId1, updatedFields);
    console.log('Producto 1 actualizado:', updatedProduct);

    // llamar a deleteProduct y evaluar que se elimine el producto
    const deletedProduct = productManager.deleteProduct(productId2);
    console.log('Producto 2 eliminado:', deletedProduct);

    // Llamar a getProducts nuevamente para verificar que el producto se eliminó correctamente
    console.log('Productos actuales después de eliminar:', productManager.getProducts());
} catch (error) {
    console.error(error.message);
}