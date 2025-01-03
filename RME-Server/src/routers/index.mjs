import { Router } from "express";
import menuItemRouter from "../routers/menuItem.mjs";
import categoryRouter from "../routers/category.mjs";
import designRouter from "../routers/design.mjs";
import comboPlanRouter from "../routers/comboPlan.mjs";
import userRouter from "../routers/user.mjs"
import tableRouter from "../routers/table.mjs"
import reservationRouter from "../routers/reservation.mjs";
import orderRouter from '../routers/order.mjs';
import kitchenRouter from "../routers/kitchen.mjs"
import landingPageRouter  from "../routers/landingPage.mjs";
import aboutPageRouter from "../routers/aboutPage.mjs"
import aiRouter from "../routers/ai.mjs";
import cartRouter from "../routers/cart.mjs";
import restaurantRouter from "../routers/restaurantInfo.mjs"

const router = Router();

router.use("/api/menuitem", menuItemRouter);
router.use("/api/categories",categoryRouter);
router.use("/api/design", designRouter);
router.use("/api/comboPlan", comboPlanRouter);
router.use("/api/users", userRouter);
router.use("/api/table", tableRouter);
router.use("/api/reservation", reservationRouter);
router.use("/api/order", orderRouter);
router.use("/api/kitchen", kitchenRouter);
router.use("/api/landingpage", landingPageRouter);
router.use("/api/aboutpage", aboutPageRouter);
router.use("/api/aiReport", aiRouter);
router.use("/api/cart", cartRouter);
router.use("/api/restaurantinfo", restaurantRouter);

export default router;