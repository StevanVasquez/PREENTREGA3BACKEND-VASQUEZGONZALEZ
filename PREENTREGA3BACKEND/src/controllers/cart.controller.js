import CartDTO from "../dtos/cart.dto.js";
import TicketDTO from "../dtos/ticket.dto.js";
import { CartService, ProductService, TicketService } from "../repositories/index.js";
import validationUtils from "../utils/validate.js";
import { sendMail } from "../helpers/email.helper.js";

export const getCarts = async (req, res) => {
  try {
    const carts = await CartService.getCarts();
    return res.status(200).json({ message: "Carts: ", carts });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "There was an error getting carts." });
  }
};
export const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartService.getCartById(cid);
    if (!cart) {
      return res.status(404).json({ message: "Error: Cart not found." });
    } else {
      return res.status(200).json({ message: "Carts: ", cart });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "There was an getting a cart by id." });
  }
};
export const createCart = async (req, res) => {
  try {
    const newCart = new CartDTO();
    const cart = await CartService.createCart(newCart);
    return res.status(200).json({ message: "Created cart: ", cart });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "There was an error creating a cart." });
  }
};
export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const product = await ProductService.getProductById(pid);

    if (!product) {
      return res.status(404).json({ message: "Error: Product not found." });
    } else {
      const cart = await CartService.getCartById(cid);

      if (!cart) {
        return res.status(404).json({ message: "Error: Cart not found." });
      } else {
        const productInCart = cart.products.find(
          (product) => String(product.product._id) === String(pid)
        );
        if (productInCart) {
          productInCart.quantity++;
          await cart.save();
          return res.status(200).json({ message: "Product already in cart." });
        } else {
          const updatedCart = await CartService.addProductToCart(cid, pid);
          return res
            .status(200)
            .json({ message: "Product added to cart: ", updatedCart });
        }
      }
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "There was an error adding a product to your cart." });
  }
};
export const updateCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const updatedCartBody = req.body;

    const cart = await CartService.getCartById(cid);
    if (!cart) {
      return res.status(404).json({ message: "Error: Cart not found." });
    } else {
      if (!validationUtils.validateUpdatedCartBody(updatedCartBody)) {
        return res
          .status(400)
          .json({ message: "The updated cart body must contain products." });
      }
      const updatedCart = await CartService.updateCartById(
        cid,
        updatedCartBody
      );

      return res.status(200).json({ message: "Updated cart: ", updatedCart });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "There was an error updating the cart." });
  }
};
export const updateProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedProductBody = req.body;

    if (!validationUtils.validateProductBody(updatedProductBody)) {
      return res.status(400).json({
        message:
          "Only the following product fields can be modified: title, description, code, price, status, stock and category.",
      });
    }

    const cart = await CartService.getCartById(cid);
    if (!cart) {
      return res.status(404).json({ message: "Error: Cart not found." });
    } else {
      const productIndex = cart.products.findIndex(
        (product) => String(product._id) === pid
      );
      if (productIndex === -1) {
        return res
          .status(404)
          .json({ message: "Error: Product does not exist in cart." });
      } else {
        
        const updatedProduct = Object.assign(
          cart.products[productIndex].product,
          updatedProductBody
        );

        const updatedCart = await cart.save();

        console.log(cart.products);

        return res.status(200).json({
          message: "Product from cart successfully updated. ",
          updatedCart,
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "There was an error updating a product in cart." });
  }
};
export const deleteCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartService.getCartById(cid);
    if (!cart) {
      return res.status(404).json({ message: "Error: Cart not found." });
    } else {
      const deletedCart = await CartService.deleteCartById(cid);
      return res
        .status(200)
        .json({ message: "Cart successfully deleted.", deletedCart });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "There was an error deleting the cart." });
  }
};
export const deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await CartService.getCartById(cid);
    if (!cart) {
      return res.status(404).json({ message: "Error: Cart not found." });
    } else {
      const productIndex = cart.products.findIndex(
        (product) => String(product.product._id) === String(pid)
      );
      if (productIndex === -1) {
        return res
          .status(404)
          .json({ message: "Error: Product does not exist in cart." });
      } else {
        const productInCart = cart.products.find(
          (product) => String(product.product._id) === String(pid)
        );
        if (productInCart && productInCart.quantity > 1) {
          productInCart.quantity--;
          await cart.save();
          return res.status(200).json({ message: "Product already in cart." });
        } else {
          cart.products.splice(productIndex, 1);
          const updatedCart = await cart.save();
          return res
            .status(200)
            .json({ message: "Product deleted from cart. ", updatedCart });
        }
      }
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "There was an error deleting a product from cart." });
  }
};
export const purchaseProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    const userEmail = req.body;
    const cart = await CartService.getCartById(cid);

    if (!cart) {
      return res.status(404).json({ message: "Error: Cart not found." });
    } else {
      if (cart.products.length === 0) {
        return res.status(404).json({ message: "Cart is empty." });
      } else {
        const productsToPurchase = cart.products;
        const productsToUpdate = [];
        let fullPrice = 0;

        for (const product of productsToPurchase) {
          const pid = String(product.product._id);
          const productQuantity = Number(product.quantity);

          const productInStock = await ProductService.getProductById(pid);

          if (!productInStock) {
            return res
              .status(404)
              .json({ message: "Product is not in stock." });
          } else {
            if (productQuantity > productInStock.stock) {
              return res.status(400).json({
                message: `Not enough stock of ${productInStock.title}`,
              });
            } else {
              fullPrice += productQuantity * productInStock.price;

              productsToUpdate.push({
                pid: pid,
                quantity: productQuantity,
              });
            }
          }
        }

        const ticketData = new TicketDTO({
          purchase_datetime: new Date(),
          amount: fullPrice,
          purchaser: userEmail.email,
        });

        const newTicket = await TicketService.createTicket(ticketData);

        for (const product of productsToUpdate) {
          const pid = product.pid;
          const productQuantity = Number(product.quantity);

          const existingProduct = await ProductService.getProductById(pid);

          const newStock = Number(existingProduct.stock) - productQuantity;

          await ProductService.updateProductById(pid, { stock: newStock });
        }

        sendMail(newTicket.purchaser);

        return res
          .status(200)
          .json({ message: "Purchase successfully completed.", newTicket });
      }
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "There was an error purchasing products." });
  }
};