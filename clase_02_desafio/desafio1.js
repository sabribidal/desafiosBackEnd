class ProductManager {
    constructor() {
        this.products = [];
        this.nextProductId = 1;
    }

    addProduct(product) {
        // verificar si el código del producto ya existe
        if (this.products.some(p => p.code === product.code)) {
            throw new Error('The product code already exist');
        }

        // agregar un nuevo producto con un ID
        const newProduct = {
            id: this.nextProductId,
            ...product,
        };
        this.products.push(newProduct);
        this.nextProductId++; // incrementa los ID para que no se repitan
        return newProduct;
    }

    getProducts() {
        // devolver el arreglo de productos
        return this.products;
    }

    getProductById(productId) {
        // encontrar un producto por ID
        const product = this.products.find(p => p.id === productId);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }
}

// instancia de ProductManager
const productManager = new ProductManager();

// "getProducts" recién creada la instancia (debería devolver un arreglo vacío []
console.log('Productos iniciales:', productManager.getProducts());

// llamar a "addProduct" con un nuevo producto
const producto1 = {
    title: 'Product test',
    description: 'This is a test product',
    price: 200,
    thumbnail: 'without image',
    code: 'abc123',
    stock: 25,
};

try {
    const productoAgregado = productManager.addProduct(producto1);
    console.log('Product successfully added:', productoAgregado);
} catch (error) {
    console.error(error.message);
}

const producto2 = {
    title: 'Suggar',
    description: 'Suggar description',
    price: 1300,
    thumbnail: 'https://alberdisa.vteximg.com.br/arquivos/ids/174707-1000-1000/Azucar-Ledesma-x-1-Kg.png?v=638187109975370000',
    code: 'abc1234',
    stock: 10,
};

try {
    const productoAgregado = productManager.addProduct(producto2);
    console.log('Product successfully added:', productoAgregado);
} catch (error) {
    console.error(error.message);
}

// llamar a "getProducts" nuevamente para verificar el producto agregado
console.log('Products currently:', productManager.getProducts());

// intentar agregar el mismo producto nuevamente (debe arrojar un error)
try {
    productManager.addProduct(producto1);
    console.log('Product successfully added');
} catch (error) {
    console.error(error.message);
}

// buscar el producto por ID
try {
    const productId = productManager.getProducts()[0].id; // tomar el ID del primer producto
    const foundProduct = productManager.getProductById(productId);
    console.log('Product found:', foundProduct);
} catch (error) {
    console.error(error.message);
}