import cartModel from "../../models/cart.model.js";

export default class Carts {
  get = async () => {
    try {
      const carts = await cartModel.find();
      return carts;
    } catch (err) {
      console.log(err);
    }
  };
  getById = async (cid) => {
    try {
      const cart = await cartModel.findById({ _id: cid }).populate({
        path: "products.product",
        ref: "Products",
      });
      return cart;
    } catch (err) {
      console.log(err);
    }
  };
  getByIdAndUpdate = async (cid, pid, updatedProductBody) => {
    try {
      const updatedCart = await cartModel.findOneAndUpdate(
        { _id: cid, "products._id": pid },
        { $set: { "products.product.category": updatedProductBody.category } },
        {new: true}
      );
      console.log(updatedProductBody.category);
      return updatedCart;
    } catch (err) {
      console.log(err);
    }
  };
  create = async (cart) => {
    try {
      const createdCart = await cartModel.create(cart);
      return createdCart;
    } catch (err) {
      console.log(err);
    }
  };
  updateById = async (cid, cartBody) => {
    try {
      const updatedCart = await cartModel.findOneAndUpdate(
        { _id: cid },
        { $set: cartBody }
      );
      return updatedCart;
    } catch (err) {
      console.log(err);
    }
  };
  deleteById = async (cid) => {
    try {
      const cart = await cartModel.deleteOne({ _id: cid });
      return cart;
    } catch (err) {
      console.log(err);
    }
  };
}