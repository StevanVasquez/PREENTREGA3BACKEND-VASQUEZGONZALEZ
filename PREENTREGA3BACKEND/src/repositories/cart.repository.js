export default class CartsDao {
    constructor(dao) {
      this.dao = dao;
    }
    getCarts = async () => {
      try {
        const data = await this.dao.get();
        return data;
      } catch (err) {
        console.log(err);
      }
    };
    getCartById = async (cid) => {
      try {
        const data = await this.dao.getById(cid);
        return data;
      } catch (err) {
        console.log(err);
      }
    };
    createCart = async (cart) => {
      try {
        const data = await this.dao.create(cart);
        return data;
      } catch (err) {
        console.log(err);
      }
    };
    addProductToCart = async (cid, pid) => {
      try {
        const cart = await this.dao.getById(cid);
        cart.products.push({ product: pid });
        await cart.save();
        return cart;
      } catch (err) {
        console.log(err);
      }
    };
    updateCartById = async (cid, cartBody) => {
      try {
        const data = await this.dao.updateById(cid, cartBody);
        return data;
      } catch (err) {
        console.log(err);
      }
    };
    updateProductFromCart = async (cid, pid, updatedProductBody) => {
      try {
        const data = await this.dao.getByIdAndUpdate(cid, pid, {category: updatedProductBody.category});
        return data;
      } catch (err) {
        console.log(err);
      }
    };
    deleteCartById = async (cid) => {
      try {
        const data = await this.dao.deleteById(cid);
        return data;
      } catch (err) {
        console.log(err);
      }
    };
    purchaseProducts = async (cid) => {
      try {
        const data = await this.dao.getById(cid);
        console.log(data);
        return data;
      } catch (err) {
        console.log(err);
      }
    };
  }