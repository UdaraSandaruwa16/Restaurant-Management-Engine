import { Order } from "../models/order.mjs";
import { User } from "../models/user.mjs";
import { RestaurantInfo } from "../models/restaurantInfo.mjs";
import { transporter } from "../utils/config/nodeMailer.mjs";
import { validationResult } from "express-validator";
import { Design } from "../models/design.mjs";
import crypto from "crypto";

function generateCode() {
  const randomBytes = crypto.randomBytes(2);
  const code = randomBytes.toString("hex").slice(0, 4);
  return code;
}

export const findOrderById = async (request, response, next) => {
  const { id } = request.params;
  const order = await Order.findById(id);
  if (!order)
    return response
      .status(400)
      .json({ message: `can not find any order with ID ${id}` });
  request.existOrder = order;
  next();
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving orders" });
  }
};

export const getOneOrder = (req, res) => {
  const { existOrder } = req;
  try {
    return res.status(200).send(existOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving order" });
  }
};

export const createOrder = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  try {
    const { userEmail, phone, cartProduct, totalPrice, paymentStatus } =
      req.body;
    const code = generateCode();
    const newOrder = await Order.create({
      orderCode: code,
      userEmail,
      phone,
      cartProduct,
      totalPrice,
      paymentStatus,
    });
    const designInfo = await Design.findById("65d4ee4bb3e582b1c98ef387");
    const info = await RestaurantInfo.findById("65dd8f261068774295ad0098");
    const user = await User.findOne({ email: userEmail });
    const aiMail = {
      from: {
        name: designInfo.restaurantName,
        address: info.companyEmail,
      },
      to: userEmail,
      subject: `Your Order from ${designInfo.restaurantName} is Confirmed! (Order # ${code})`,
      text: `Your Order from ${designInfo.restaurantName} is Confirmed! (Order # ${code})`,
      html: `<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          /* Basic styles for the email */
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
          }
          h1, h2, p {
              margin: 10px 0;
          }
          .table {
              border-collapse: collapse;
              width: 100%;
          }
          .table th, .table td {
              padding: 8px;
              border: 1px solid #ddd;
          }
      </style>
  </head>
  <body>
      <h1>Hi ${user.userName},</h1>
      <p>This email confirms your order from ${designInfo.restaurantName} placed on <strong>[Date]</strong> at <strong>[Time]</strong>. We're busy preparing your delicious food and can't wait for you to enjoy it!</p>
  
      <h2>Your Order Details</h2>
      <table class="table">
          <tr>
              <th>Order Number</th>
              <td>${code}</td>
          </tr>
          <tr>
              <th>Pick Up</th>
              <td>[Pick Up or Delivery]</td>
          </tr>
          <tr>
              <th>Pick Up/Delivery Time</th>
              <td>[Pick Up Time or Estimated Delivery Time]</td>
          </tr>
          <tr>
              <th>Total</th>
              <td>Rs.${totalPrice}</td>
          </tr>
      </table>
  
      <h2>What happens next:</h2>
      <p>
          <strong>Pick Up:</strong> If you selected pick up, your order will be ready at the specified time. Please come to the counter and let us know your name and order number.
      </p>
  
      <h2>Need to make changes?</h2>
      <p>We understand, things happen. If you need to make any changes to your order, please contact us as soon as possible at ${info.phoneNumber} or reply to this email.</p>
  
      <p>Thank you for choosing ${designInfo.restaurantName}! We hope you enjoy your meal. Don't hesitate to leave us a review on [Review Platform] (optional) and let us know your thoughts.</p>
  
      <p>Sincerely,</p>
      <p>The Team at ${designInfo.restaurantName}</p>
  </body>`,
    };

    transporter.sendMail(aiMail);
    return res.status(201).send(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating order" });
  }
};

export const updateOrder = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const { id } = req.params;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).send(updatedOrder);
  } catch (error) {
    console.error(error);
    responresse.status(500).send({ message: "Error updatind order" });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await Order.findOneAndDelete(id);
    return res.status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting order" });
  }
};
