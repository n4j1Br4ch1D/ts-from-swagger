import fs from "fs";
import path from "path";
import http from "http";
import https from "https";

export async function generateInterfaces(swaggerUrl, outputDir) {
  return new Promise(async (resolve) => {
    const requester = swaggerUrl.startsWith("http://") ? http : https;
    requester
      .get(swaggerUrl, {}, (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", async () => {
          const swagger = await JSON.parse(data);
          const definitions = swagger.definitions;
          if (!fs.existsSync(outputDir))
            fs.mkdirSync(outputDir, { recursive: true });
          if (!fs.existsSync(path.join(outputDir, "interfaces")))
            fs.mkdirSync(path.join(outputDir, "interfaces"));
          if (!fs.existsSync(path.join(outputDir, "enums")))
            fs.mkdirSync(path.join(outputDir, "enums"));
          for (const definitionName in definitions) {
            const definition = definitions[definitionName];
            const interfaceFilename = `${outputDir}/interfaces/${definitionName}.interface.ts`;
            let interfaceFileContent = "";
            if (definition.properties) {
              interfaceFileContent += `export interface ${definitionName} {\n`;
              for (const propertyName in definition.properties) {
                const property = definition.properties[propertyName];
                const isRequired = definition.required &&
                  definition.required.includes(propertyName);
                const indicator = isRequired ? "?:" : ":";
                if (property.type === "array") {
                  if (property.items) {
                    let typeName;
                    if (!property.items.type) {
                      typeName =
                        property.items.xml.name[0].toUpperCase() +
                        property.items.xml.name.slice(1);
                      interfaceFileContent =
                        `import { ${typeName} } from "../interfaces/${typeName}.interface";\n` +
                        interfaceFileContent;
                    } else if (property.items.type === "integer") {
                      typeName = "number";
                    } else {
                      typeName = property.items.type;
                    }
                    interfaceFileContent += `  ${propertyName}${indicator} ${typeName}[];\n`;
                  } else {
                    interfaceFileContent += `  ${propertyName}${indicator} any[];\n`;
                  }
                } else if (property.enum) {
                  const enumName = `${definitionName}${propertyName[0].toUpperCase() + propertyName.slice(1)}`;
                  interfaceFileContent =
                    `import { ${enumName} } from "../enums/${enumName}.enum";\n` +
                    interfaceFileContent;
                  const enumValues = property.enum.map(
                    (value) => `${value.toUpperCase()} = "${value}"`
                  );
                  const enumFileContent = `export enum ${enumName} {\n  ${enumValues.join(
                    ",\n  "
                  )}\n}\n`;
                  const enumFilename = `${outputDir}/enums/${enumName}.enum.ts`;
                  fs.writeFileSync(enumFilename, enumFileContent);
                  interfaceFileContent += `  ${propertyName}${indicator} ${enumName};\n`;
                } else if (property.type === "integer") {
                  interfaceFileContent += `  ${propertyName}${indicator} number;\n`;
                } else if (property.type === "string") {
                  interfaceFileContent += `  ${propertyName}${indicator} string;\n`;
                } else if (property.type === "boolean") {
                  interfaceFileContent += `  ${propertyName}${indicator} boolean;\n`;
                }

                //object
                else if (property.type === undefined &&
                  property.hasOwnProperty("$ref")) {
                  let objectName = propertyName[0].toUpperCase() + propertyName.slice(1);
                  interfaceFileContent =
                    `import { ${objectName} } from "../interfaces/${objectName}.interface";\n` +
                    interfaceFileContent;
                  interfaceFileContent += `  ${propertyName}${indicator} ${objectName};\n`;
                } else {
                  interfaceFileContent += `  ${propertyName}${indicator} any;\n`;
                }
              }
              interfaceFileContent += `}\n`;
              fs.writeFileSync(interfaceFilename, interfaceFileContent);
            }
          }
          resolve("resolved");
        });
      })
      .on("error", (error) => {
        console.error(error);
      });
  });
}
