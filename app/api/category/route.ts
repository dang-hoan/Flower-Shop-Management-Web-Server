import CategoryController from "@/controllers/CategoryController";
import { auth } from "@/middlewares/Authorization";
import { ErrorHandler } from "@/middlewares/ErrorHandler";
import validate from "@/middlewares/YupValidation";
import TrimRequest from "@/utils/TrimRequest";
import schemas from "@/validations/CategoryValidation";
import { NextApiRequest } from "next";

/**
 * @swagger
 *  components:
 *    schemas:
 *      Category:
 *        type: object
 *        required:
 *          - categoryName
 *          - image
 *        properties:
 *          categoryName:
 *            type: string
 *            description: The category name.
 *          image:
 *            type: string
 *            description: The category avatar.
 *          description:
 *            type: string
 *            description: The description of category.
 *
 *      UpdatedCategory:
 *        type: object
 *        required:
 *          - _id
 *          - categoryName
 *          - name
 *        properties:
 *          _id:
 *            type: string
 *            description: The category id.
 *          categoryName:
 *            type: string
 *            description: The category name.
 *          image:
 *            type: string
 *            description: The category avatar.
 *          description:
 *            type: string
 *            description: The description of category.
 */

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: The category managing API
 */

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     parameters:
 *       - name: keyword
 *         type: string
 *         in: query
 *         description: Search keyword (search by category name and description)
 *       - name: pageNumber
 *         type: integer
 *         in: query
 *         description: Page number
 *         minimum: 1
 *         default: 1
 *       - name: pageSize
 *         type: integer
 *         in: query
 *         description: Number of items per page
 *         minimum: 1
 *         default: 10
 *       - name: isExport
 *         in: query
 *         description: Export data flag
 *         schema:
 *            type: boolean
 *            enum: [true, false]
 *            default: false
 *       - name: orderBy
 *         type: string
 *         in: query
 *         description: Field to order by (Fields must be separated by spaces)
 *         default: categoryName
 *     responses:
 *       200:
 *         description: Return all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 total:
 *                   type: integer
 *                   description: The data length.
 *                 data:
 *                   type: object
 *
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Create category successfully and return category information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 total:
 *                   type: integer
 *                   description: The data length.
 *                 data:
 *                   type: object
 *
 *   put:
 *     summary: Update a category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Update category successfully and return category information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 total:
 *                   type: integer
 *                   description: The data length.
 *                 data:
 *                   type: object
 */

export const GET = async (req: NextApiRequest) => {
    try {
        return await auth(async () => {
            let query;
            ({ req, query: query } = TrimRequest.all(req));
            await validate(schemas.GetAllCategorySchema)(null, query);
            return await CategoryController.GetAllCategory(query);
        });
    } catch (error: any) {
        return ErrorHandler(error);
    }
};

export const POST = async (req: NextApiRequest) => {
    try {
        return await auth(async (userToken: any) => {
            let body = await new Response(req.body).json();
            ({ req, body: body } = TrimRequest.all(req, null, body));
            await validate(schemas.CreateCategorySchema)(null, null, body);
            body.createdBy = userToken.user.username;
            return await CategoryController.CreateCategory(body);
        });
    } catch (error: any) {
        return ErrorHandler(error);
    }
};

export const PUT = async (req: NextApiRequest) => {
    try {
        return await auth(async (userToken: any) => {
            let body = await new Response(req.body).json();
            ({ req, body: body } = TrimRequest.all(req, null, body));
            await validate(schemas.UpdateCategorySchema)(null, null, body);
            body.updatedBy = userToken.user.username;
            return await CategoryController.UpdateCategory(body);
        });
    } catch (error: any) {
        return ErrorHandler(error);
    }
};
