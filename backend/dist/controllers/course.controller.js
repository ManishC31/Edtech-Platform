"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_config_1 = __importDefault(require("../config/prisma.config"));
exports.getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCategories = yield prisma_config_1.default.category.findMany({
            include: {
                courses: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                        shortDes: true
                    }
                },
            }
        });
        res.json(allCategories);
        console.log("Categories", allCategories);
    }
    catch (error) {
        console.log("get all the categories error", error);
        res.status(500).json({ error: "failed to fetch categories and their courses" });
    }
});
//# sourceMappingURL=course.controller.js.map