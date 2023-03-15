import {generateInterfaces} from "./utils.js"

const args = process.argv.slice(2);
const swaggerUrl = args[0] || "https://petstore.swagger.io/v2/swagger.json";
const outputDir = args[1] || "./src/definitions";
generateInterfaces(swaggerUrl, outputDir);