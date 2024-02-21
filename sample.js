const array = [
  {
    description: "tyuitgu",
    quantity: "6",
    packed: false,
    id: 1707597137991,
  },
  {
    description: "pens",
    quantity: "2",
    packed: false,
    id: 1707739271180,
  },
  {
    description: "txt",
    quantity: "4",
    packed: false,
    id: 1707739278025,
  },
];

const idToFind = 1707739278025;

const index = array.findIndex((item) => item.id === idToFind);

console.log("Index:", index);
