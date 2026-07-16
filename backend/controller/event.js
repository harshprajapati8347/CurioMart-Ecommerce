const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { upload } = require("../multer");
const Shop = require("../model/shop");
const Event = require("../model/event");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller, isAdmin, isAuthenticated } = require("../middleware/auth");
const router = express.Router();
const {
  uploadOnCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinary");

// create event
router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    const files = req.files;
    let uploadedImages = []; // track what's on Cloudinary so we can roll back on failure
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      }

      if (!files || files.length === 0) {
        return next(
          new ErrorHandler("Please upload at least one event image!", 400)
        );
      }

      // Upload all images to Cloudinary in parallel
      const uploadResults = await Promise.all(
        files.map((file) =>
          uploadOnCloudinary(file.path, { folder: "curiomart-server/events" })
        )
      );

      // If any upload permanently failed (null after retries), abort and roll back
      const failedCount = uploadResults.filter((r) => r === null).length;
      if (failedCount > 0) {
        // roll back any that DID succeed
        await Promise.all(
          uploadResults
            .filter((r) => r !== null)
            .map((r) => deleteFromCloudinary(r.public_id))
        );
        return next(
          new ErrorHandler(
            `${failedCount} image(s) failed to upload. Please try again.`,
            500
          )
        );
      }

      uploadedImages = uploadResults.map((result) => ({
        public_id: result.public_id,
        url: result.secure_url,
      }));

      const eventData = req.body;
      eventData.images = uploadedImages;
      eventData.shop = shop;

      const product = await Event.create(eventData);

      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      if (uploadedImages.length > 0) {
        await Promise.all(
          uploadedImages.map((image) => deleteFromCloudinary(image.public_id))
        );
      }
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all events
router.get("/get-all-events", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// get all events of a shop
router.get(
  "/get-all-events/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete event of a shop
router.delete(
  "/delete-shop-event/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const eventData = await Event.findById(productId);

      if (eventData && eventData.images.length > 0) {
        await Promise.all(
          eventData.images.map((image) => deleteFromCloudinary(image.public_id))
        );
      }

      const event = await Event.findByIdAndDelete(productId);

      if (!event) {
        return next(new ErrorHandler("Event not found with this id!", 500));
      }

      res.status(201).json({
        success: true,
        message: "Event Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all events --- for admin
router.get(
  "/admin-all-events",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
