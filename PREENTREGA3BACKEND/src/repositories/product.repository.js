import ProductDTO from "../dtos/product.dto.js";

export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getProducts = async () => {
    try {
      const data = await this.dao.get();
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  getProductByCode = async (code) => {
    try {
      const data = await this.dao.getByCode(code);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  getProductById = async (pid) => {
    try {
      const data = await this.dao.getById(pid);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  createProduct = async (product) => {
    try {
      const newProduct = new ProductDTO(product);
      const data = await this.dao.create(newProduct);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  updateProductById = async (pid, productBody) => {
    try {
      const data = await this.dao.update(pid, productBody);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  deleteProductById = async (pid) => {
    try {
      const data = await this.dao.delete(pid);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
}