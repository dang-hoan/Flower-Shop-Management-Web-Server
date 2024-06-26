import { Schema, model, models } from "mongoose";

const FlowerSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Flower name is required!"],
            maxLength: 100,
            trim: true,
            validate: {
                validator: function (value: any) {
                    return /^[\p{L} _-]+$/u.test(value);
                },
                message:
                    "Name field only contains unicode characters, space, underscore or dash!",
            },
        },
        habitat: {
            type: String,
        },
        care: {
            type: String,
        },
        growthTime: {
            type: String,
        },
        starsTotal: {
            type: Number,
            min: [0, "The number of stars cannot be negative!"],
            default: 0,
        },
        feedbacksTotal: {
            type: Number,
            min: [0, "The number of feedbacks cannot be negative!"],
            default: 0,
        },
        unitPrice: {
            type: Number,
            min: [0, "Unit price cannot be negative!"],
        },
        discount: {
            type: Number,
            min: [0, "Discount cannot be negative!"],
            max: [100, "Discount cannot greater than 100!"],
            default: 0,
        },
        quantity: {
            type: Number,
            min: [0, "Quantity cannot be negative!"],
            default: 0,
        },
        soldQuantity: {
            type: Number,
            min: [0, "Sold quantity cannot be negative!"],
            validate: {
                validator: function (this: any, value: any) {
                    return value <= this.quantity;
                },
                message: "Sold quantity cannot greater than quantity!",
            },
            default: 0,
        },
        imageVideoFiles: [
            {
                url: { type: String, required: true },
                public_id: { type: String, required: true },
            },
        ],
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: ["Out of stock", "Available"],
            default: "Available",
        },
        createdAt: {
            type: Date,
            required: true,
        },
        createdBy: {
            type: String,
            required: true,
        },
        updatedAt: {
            type: Date,
        },
        updatedBy: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
            required: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        id: false,
    }
);

// Pre-save hook to update status based on quantity
FlowerSchema.pre("save", function (next) {
    this.quantity = this.quantity ?? 0;
    this.soldQuantity = this.soldQuantity ?? 0;
    if (this.quantity - this.soldQuantity > 0) {
        this.status = "Available";
    } else {
        this.status = "Out of stock";
    }
    next();
});

const FlowerModel = models.Flower || model("Flower", FlowerSchema);

export default FlowerModel;
