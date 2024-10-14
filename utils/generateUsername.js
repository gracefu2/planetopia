const colors = [
  "red", "blue", "green", "yellow", "orange", "purple", "pink", "teal",
  "violet", "golden", "silver", "turquoise", "indigo", "scarlet", "lime", 
  "crimson", "amber", "jade", "cobalt", "maroon", "peach", "lavender", "navy",
  "emerald", "rose", "aqua", "bronze", "charcoal", "coral", "plum", "magenta",
  "sapphire", "ruby", "cherry", "mint", "pearl", "copper", "apricot", "olive",
  "ivory", "cream", "coffee", "mustard", "moss", "beige", "burgundy", "celeste",
  "azure", "taupe", "ochre", "blush", "mulberry", "fuchsia", "tangerine", "honey"
];

const adjectives = [
  "wacky", "zesty", "funky", "bubbly", "spicy", "crunchy", "jolly", "grumpy", 
  "cheery", "dancing", "sassy", "tiny", "sleepy", "mighty", "fiery", "prickly",
  "giggly", "brave", "snazzy", "quirky", "swift", "fluffy", "sunny", "jumpy",
  "noisy", "crafty", "silly", "perky", "bright", "happy", "playful", "sparkly",
  "mysterious", "frisky", "feisty", "gentle", "kind", "chirpy", "zippy", "nimble",
  "glowing", "bashful", "spotty", "sneaky", "gleeful", "whimsical", "peppy", "giddy",
  "quirky", "mellow", "roaring", "brisk", "daring", "lively", "spunky", "fancy",
  "bouncy", "mirthful", "scrappy", "quirky", "fuzzy", "jazzy", "quirky", "dreamy",
  "bold", "blissful", "merry", "quirky", "spry", "jovial", "plucky", "cheeky", "vivid"
];

const nouns = [
  "potato", "flamingo", "llama", "giraffe", "panda", "avocado", "squash", "peacock",
  "koala", "cucumber", "mango", "cactus", "lobster", "otter", "kiwi", "whale", "badger",
  "moose", "pineapple", "octopus", "beet", "pomegranate", "mushroom", "donkey", "walrus",
  "dandelion", "tulip", "owl", "hedgehog", "cabbage", "banana", "kale", "parrot", "tofu",
  "apple", "carrot", "broccoli", "quokka", "penguin", "tomato", "sunflower", "peapod",
  "honeydew", "zebra", "fox", "grape", "cherry", "beetle", "bison", "radish", "lemon",
  "tortoise", "duckling", "raspberry", "iguana", "puffin", "chinchilla", "jellybean",
  "swan", "alpaca", "seal", "sloth", "snail", "artichoke", "heron", "kiwifruit", "puffball",
  "hummingbird", "snapdragon", "snowdrop", "turnip", "snappea", "wombat", "armadillo",
  "daisy", "poppy", "newt", "basil", "thyme", "parsnip", "melon", "bellflower", "starling",
  "coriander", "anemone", "hermit", "narwhal", "gecko", "jackfruit", "cranberry", "booby",
  "okra", "fig", "lobelia", "bluebell", "caterpillar", "snapper", "wolverine", "yarrow",
  "buttercup", "petunia", "mulberry", "coconut", "eggplant", "seaweed", "fenugreek"
];

export default function generateUsername() {
  const color = colors[Math.floor(Math.random() * colors.length)];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${adjective}-${color}-${noun}`;
}