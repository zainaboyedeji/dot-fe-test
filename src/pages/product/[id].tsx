export function ProductDetail() {
    const product = {
      name: "Men's Casual Shirt",
      price: 39.99,
      stock: 75,
      rating: 4.2,
      reviews: 200,
    };
  
    return (
      <div>
        <a href="#" className="text-blue-500">← Back to Products</a>
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <div className="flex flex-col lg:flex-row">
            <div className="bg-gray-200 w-full lg:w-1/2 h-64 rounded-lg"></div>
            <div className="flex-1 lg:ml-8 mt-4 lg:mt-0">
              <p className="text-sm text-gray-500">CLOTHING > MEN</p>
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-xl text-green-600 font-bold">${product.price.toFixed(2)}</p>
              <p className="text-gray-500">In stock: {product.stock}</p>
              <p className="text-yellow-500 mb-2">★ {product.rating} ({product.reviews} reviews)</p>
              <div className="text-gray-600 mb-4">
                <p>Material: Cotton</p>
                <p>Fit: Regular</p>
                <p>Sizes: S, M, L, XL</p>
                <p>Care: Machine Washable</p>
              </div>
              <div className="flex space-x-4">
                <button className="bg-black text-white py-2 px-4 rounded-lg">Add to Cart</button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">Edit Product</button>
                <button className="bg-red-500 text-white py-2 px-4 rounded-lg">Delete Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  