# :chopsticks: ts-from-swagger
- :date:**03-15-2023** :pushpin:**Beta Version 1.0.2**
- :computer:<a href="https://github.com/n4j1Br4ch1D" target="_blank" title="NajibRachid: Agile full-stack developer">NajibRachid</a> :purple_circle:<a href="https://anmoonweb.com/?ref=ts-from-swagger" target="_blank" title="ANMOON: Right talents at the right place ">ANMOON</a> :office: <a href="https://x-hub.io/?ref=ts-from-swagger" target="_blank" title="XHUB: For Developers By Developers">XHUB</a>

Generate TypeScript interfaces and enums quickly and easily from Swagger definition JSON with our lightweight tool. Improve your development workflow by automatically generating type-safe code that's easy to maintain and understand. Say goodbye to manual coding and hello to streamlined development with our Swagger definition Typescript generator.

**keywords:** _ts-from-swagger, swagger2ts, typescript generator, type-safe, type-safe rest Apis, type safety, TypeScript interfaces generator, Swagger to TypeScript converter, NPM package for generating TypeScript interfaces from Swagger, TypeScript definitions from Swagger, Swagger JSON to TypeScript, TypeScript code from Swagger schema, TypeScript typings from Swagger definition, Swagger interface to TypeScript conversion, TypeScript enum generator from Swagger JSON, TypeScript code generation from Swagger definition., Convert Swagger JSON to TypeScript code, tsgen._

<img src="https://raw.githubusercontent.com/n4j1Br4ch1D/ts-from-swagger/main/assets/ts-from-swagger.gif" alt="ts-from-swagger" height="600" />

## Features

- [x] Lightweight, & No dependencies.
- [x] Simple & Easy to use.
- [x] Fetch directly from Swagger json url. 
- [x] Support interfaces and enums. 
- [x] Support required fields. 
- [x] Respects naming conventions.
- [ ] Authorization for Swagger.

## Install

```sh
#npm
npm i ts-from-swagger --save-dev

#yarn
yarn add ts-from-swagger --dev
```

## Usage

Specify your swagger JSON url and followed by output directory(default is: `./src/definitions`)

```sh
npx ts-from-swagger https://petstore.swagger.io/v2/swagger.json ./path/to/output/dir

```
Or add a script to your package.json file:

```json
  "scripts": {
    "ts-from-swagger": "npx ts-from-swagger https://petstore.swagger.io/v2/swagger.json ./path/to/output/dir"
  }

```

Then run the script with npm run:

```sh
npm run ts-from-swagger
```
## Demo

Write types safe code from your frontend to your backend API,  backend agnostic as long as you use Swagger.

```ts
import axios from "axios";
import { PetStatus } from "./definitions/enums/PetStatus.enum";
import { Category } from "./definitions/interfaces/Category.interface";
import { Pet } from "./definitions/interfaces/Pet.interface";
import { Tag } from "./definitions/interfaces/Tag.interface";

const cats: Category = {
  id: 1,
  name: "Cats",
};

const friendly: Tag = {
  id: 1,
  name: "friendly",
};

const mellow: Tag = {
  id: 2,
  name: "mellow",
};

const newPet: Pet = {
  id: 123,
  name: "Mischievous",
  category: cats,
  // photoUrls: ["https://picsum.photos/200"], // not required
  tags: [friendly, mellow],
  status: PetStatus.AVAILABLE,
};

axios
  .post("https://petstore.swagger.io/v2/pet", newPet)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```
## Releases

```txt
  - Initial Version 1.0.0 : 11/03/2023
    - Project Setup.
    - Theory & prove of concept.
  - Alpha Version 1.0.1 : 13/03/2023
    - CLI configuration.
    - Generate Enums.
    - Fix Wrong type for arrays.
    - Fix OutputPath make recursive.
  - Beta Version 1.0.2 : 15/03/2023
    - Fix Imports.
    - Make Subfolders.
    - Respect naming conventions.
    - Refactor Code.
  - [Agenda] Beta Version 1.0.3 : 16/03/2023
    - Add Authorization.
```

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on the GitHub repository.

Tests included:

```sh
   npm test
```

### License

This project is licensed under the MIT License. See the LICENSE file for more information. Feel free to use it in your own projects, or contribute to its development on GitHub.
