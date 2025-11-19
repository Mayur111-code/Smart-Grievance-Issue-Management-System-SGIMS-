// import Product from '../models/productModel.js';
// import HandleError from "../utils/handleError.js";

// // Create Product
// export const createProducts = async (req, res, next) => {
//   try {
//     const newProduct = await Product.create(req.body);
//     res.status(201).json({
//       success: true,
//       product: newProduct,
//     });
//   } catch (error) {
//     next(error); // Pass error to global handler
//   }
// };

// // Get All Products
// export const getAllProducts = async (req, res, next) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json({
//       success: true,
//       products,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Update Product
// export const updateProduct = async (req, res, next) => {
//   try {
//     let product = await Product.findById(req.params.id);

//     if (!product) {
//       return next(new HandleError("Product not found", 404));
//     }

//     product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     res.status(200).json({
//       success: true,
//       product,
//     });

//   } catch (error) {
//     next(error);
//   }
// };

// // Delete Product
// export const deleteProduct = async (req, res, next) => {
//   try {
//     let product = await Product.findById(req.params.id);

//     if (!product) {
//       return next(new HandleError("Product not found", 404));
//     }

//     await Product.findByIdAndDelete(req.params.id);

//     res.status(200).json({
//       success: true,
//       message: "Product deleted successfully",
//     });

//   } catch (error) {
//     next(error);
//   }
// };

// // Get Single Product
// export const getSingleProduct = async (req, res, next) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return next(new HandleError("Product not found", 404));
//     }

//     res.status(200).json({
//       success: true,
//       product,
//     });

//   } catch (error) {
//     next(error);
//   }
// };




import Product from "../models/productModel.js";
import APIFunctionality from "../utils/apiFunctionality.js";




// http://127.0.0.1:8000/api/v1/product/691220e06a4653a649af2ead?keyword=shirt

// Create Product
export const createProducts = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    return res.status(201).json({
      success: true,
      product: newProduct,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  const resultPerPage=3;
  try {
    const apiFunctionality = new APIFunctionality(Product.find(), req.query).search().filter().pagination(resultPerPage)

    

  const products = await apiFunctionality.query
    return res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Product
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }
};



















// the code is also same but without trycatch


// import Product from '../models/productModel.js';

// // Create Product
// export const createProducts = async (req, res) => {
//   const newProduct = await Product.create(req.body);
//   res.status(201).json({
//     success: true,
//     product: newProduct,
//   });
// };

// // Get All Products
// export const getAllProducts = async (req, res) => {
//   const products = await Product.find();
//   res.status(200).json({
//     success: true,
//     products,
//   });
// };

// // Get Single Product
// export const getSingleProduct = async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   if (!product) {
//     return res.status(404).json({
//       success: false,
//       message: "Product not found",
//     });
//   }

//   res.status(200).json({
//     success: true,
//     product,
//   });
// };

// // Update Product
// export const updateProduct = async (req, res) => {
//   let product = await Product.findById(req.params.id);

//   if (!product) {
//     return res.status(404).json({
//       success: false,
//       message: "Product not found",
//     });
//   }

//   product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   res.status(200).json({
//     success: true,
//     product,
//   });
// };

// // Delete Product
// export const deleteProduct = async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   if (!product) {
//     return res.status(404).json({
//       success: false,
//       message: "Product not found",
//     });
//   }

//   await Product.findByIdAndDelete(req.params.id);

//   res.status(200).json({
//     success: true,
//     message: "Product Deleted Successfully",
//   });
// };
