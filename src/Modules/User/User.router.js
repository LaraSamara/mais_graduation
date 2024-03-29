import { Router } from 'express';
import * as userController from './Controller/User.controller.js';
import { asyncHandler } from '../../Services/errorHandling.js';
import fileUpload, { fileValidation } from "../../Services/multerCloudinary.js";
import validation from '../../Middleware/validation.js';
import * as validators from './User.validation.js';
import { auth, roles } from "../../Middleware/auth.middleware.js";
import ProductRouter from '../product/product.router.js'
const router = Router({mergeParams:true});
router.use('/:stakeHolderId/product',ProductRouter);
router.get('/getstakeHolder/:categoryId', auth([roles.Admin, roles.Customer, roles.stakeHolder]),validation(validators.getstakeHolderSchema), asyncHandler(userController.getstakeHolder));
router.put('/profilePic', auth([roles.stakeHolder]), fileUpload(fileValidation.image).single('image'), validation(validators.profilePicSchema),asyncHandler(userController.profilePic));
router.put('/Bio', auth([roles.stakeHolder]),validation(validators.BioSchema), asyncHandler(userController.Bio));
router.patch('/softDeleteUser/:userId', auth([roles.Admin]), validation(validators.softDeleteUserSchema), asyncHandler(userController.softDeleteUser));
router.get('/getSoftDeleteUser', auth([roles.Admin]),asyncHandler(userController.getSofDeletetuser));
router.put('/', auth([roles.Admin, roles.Customer, roles.stakeHolder]), validation(validators.updateInfoSchema),asyncHandler(userController.updateInfo));
router.get('/getAllUsers', auth([roles.Admin]), asyncHandler(userController.getAllUsers));
router.get('/getUserProfile', auth([roles.stakeHolder,roles.Admin,roles.Customer]), asyncHandler(userController.getUserProfile));
router.get('/getAllstakeHolder', auth([roles.stakeHolder,roles.Admin,roles.Customer]), asyncHandler(userController.getAllstakeHolder));
export default router;