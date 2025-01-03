import { Order } from "../models/order.mjs";
import { MenuItems } from "../models/menuItem.mjs";
import { Design } from "../models/design.mjs";
import { RestaurantInfo } from "../models/restaurantInfo.mjs"
import { User } from "../models/user.mjs"
import { transporter } from "../utils/config/nodeMailer.mjs";
import * as dotenv from 'dotenv';

dotenv.config();

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndUpdate(id, {
      orderStatus: "ready",
    });
    const design = await Design.findById("65d4ee4bb3e582b1c98ef387")
    const order = await Order.findById(id)
    const info = await RestaurantInfo.findById("65dd8f261068774295ad0098");
    const user = await User.findOne({ email: order.userEmail });

    const orderReadyMail = {
      from: {
        name: design.restaurantName,
        address: info.companyEmail,
      },
      to: "amilanwijesinghe01@gmail.com",
      subject: `Your Order from ${design.restaurantName} is Ready for Pick Up! (Order # ${order.orderCode})`,
      text: `Your Order from ${design.restaurantName} is Ready for Pick Up! (Order # ${order.orderCode})`,
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
      </style>
  </head>
  <body>
      <h1>Hi ${user.userName},</h1>
      <p>This email lets you know that your delicious order from ${design.restaurantName} (Order # ${order.orderCode}) is **ready for pick up!**</p>
  
      <p>We prepared your food with care and can't wait for you to enjoy it. Your order is ready for pick up at <strong>[Pick Up Time]</strong>.</p>
  
      <h2>When you arrive:</h2>
      <ul>
          <li>Head to the counter and let us know your name and order number.</li>
          <li>We recommend arriving within [Estimated Wait Time] of receiving this email to ensure optimal freshness.</li>
      </ul>
  
      <h2>Need help?</h2>
      <p>If you have any questions or encounter any issues, feel free to contact us at [Phone Number] or reply to this email.</p>
  
      <p>Thank you for choosing ${design.restaurantName}! We hope you have a delightful dining experience. Don't hesitate to leave us a review on [Review Platform] (optional) and let us know your thoughts.</p>
  
      <p>Sincerely,</p>
      <p>The Team at ${design.restaurantName}</p>
  </body>`,
    };

    transporter.sendMail(orderReadyMail);

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const getPendingOrders = async (req, res) => {
  try {
    const orders = await Order.find({ orderStatus: "Placed" });
    return res.status(200).send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const updateItemStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await MenuItems.findById(id);
    if (item.itemAvailable === true) {
      await MenuItems.findByIdAndUpdate(id, {
        itemAvailable: false,
      });
      return res.sendStatus(200);
    }
    await MenuItems.findByIdAndUpdate(id, {
      itemAvailable: true,
    });
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const getOderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    return res.status(200).send(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
