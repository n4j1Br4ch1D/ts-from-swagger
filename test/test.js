import fs from "fs";
import assert from "assert";
import { generateInterfaces } from "../utils.js";

const swaggerUrl = "https://petstore.swagger.io/v2/swagger.json";
const outputDir = "./test/src/definitions";
const definitions = [
  {
    filePath: `${outputDir}/enums/OrderStatus.enum.ts`,
    fileContent: `export enum OrderStatus {
  PLACED = "placed",
  APPROVED = "approved",
  DELIVERED = "delivered"
}`,
  },
  {
    filePath: `${outputDir}/enums/PetStatus.enum.ts`,
    fileContent: `export enum PetStatus {
  AVAILABLE = "available",
  PENDING = "pending",
  SOLD = "sold"
}`,
  },
  {
    filePath: `${outputDir}/interfaces/ApiResponse.interface.ts`,
    fileContent: `export interface ApiResponse {
  code: number;
  type: string;
  message: string;
}`,
  },
  {
    filePath: `${outputDir}/interfaces/Category.interface.ts`,
    fileContent: `export interface Category {
  id: number;
  name: string;
}`,
  },
  {
    filePath: `${outputDir}/interfaces/Order.interface.ts`,
    fileContent: `import { OrderStatus } from "../enums/OrderStatus.enum";
export interface Order {
  id: number;
  petId: number;
  quantity: number;
  shipDate: string;
  status: OrderStatus;
  complete: boolean;
}`,
  },
  {
    filePath: `${outputDir}/interfaces/Pet.interface.ts`,
    fileContent: `import { PetStatus } from "../enums/PetStatus.enum";
import { Tag } from "../interfaces/Tag.interface";
import { Category } from "../interfaces/Category.interface";
export interface Pet {
  id: number;
  category: Category;
  name?: string;
  photoUrls?: string[];
  tags: Tag[];
  status: PetStatus;
}`,
  },
  {
    filePath: `${outputDir}/interfaces/Tag.interface.ts`,
    fileContent: `export interface Tag {
  id: number;
  name: string;
}`,
  },
  {
    filePath: `${outputDir}/interfaces/User.interface.ts`,
    fileContent: `export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: number;
}`,
  },
];

generateInterfaces(swaggerUrl, outputDir)
  .then(() => {
    definitions.forEach((definition) => {
      assert.ok(
        fs.existsSync(definition.filePath),
        `File ${definition.filePath} does not exist.`
      );
      const fileContent = fs.readFileSync(definition.filePath, "utf8");
      assert.strictEqual(
        fileContent.trim(),
        definition.fileContent.trim(),
        `${definition.filePath} File content does not match expected content.`
      );
    });
    console.log("All tests passed!");
  })
  .catch((error) => {
    console.error("Test failed:", error);
  })
  .finally(() => {
    fs.rmSync(outputDir, { recursive: true });
    console.log(outputDir+' Directory deleted successfully.');
  });
