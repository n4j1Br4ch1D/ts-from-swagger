import axios from "axios";
import { PetStatus } from "./src/definitions/enums/PetStatus.enum";
import { Category } from "./src/definitions/interfaces/Category.interface";
import { Pet } from "./src/definitions/interfaces/Pet.interface";
import { Tag } from "./src/definitions/interfaces/Tag.interface";

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
  photoUrls: ["https://picsum.photos/200"], // not required
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
