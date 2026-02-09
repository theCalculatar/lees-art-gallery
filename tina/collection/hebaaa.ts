import type { Collection } from "tinacms";

const Hebaaa: Collection = {
  label: "Hebaaa",
  name: "hebaaa",
  path: "content/hebaaa",
  format: "md",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      isTitle: true,
      required: true,
    },

  ],
};
export default Hebaaa;
