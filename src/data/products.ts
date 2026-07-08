import { Product } from "@/types/product";

export const products: Product[] = [
  {
    slug: "pulse-tws-earbuds",
    name: "Pulse TWS Earbuds",
    tagline: "True wireless sound, all-day battery",
    description:
      "Pulse earbuds pair active noise cancellation with a 32-hour total battery life, so your commute, gym session, or work-from-home calls never get interrupted. The touch controls are tuned to avoid accidental taps, and the case charges fully in under an hour.",
    specs: [
      { label: "Battery life", value: "8h (buds) + 24h (case)" },
      { label: "Charging", value: "USB-C, wireless case" },
      { label: "Noise cancellation", value: "Active (ANC) + Transparency mode" },
      { label: "Water resistance", value: "IPX5" },
      { label: "Bluetooth", value: "5.3" },
    ],
    price: 5499,
    compareAtPrice: 7999,
    category: "audio",
    badges: ["bestseller", "sale"],
    images: ["1", "2", "3"],
    colorVariants: [
      { id: "black", label: "Matte Black", hex: "#1A1A1A" },
      { id: "white", label: "Pearl White", hex: "#F5F5F5" },
    ],
    rating: 4.6,
    reviewCount: 214,
    inStock: true,
  },
  {
    slug: "voltbrick-20k-powerbank",
    name: "VoltBrick 20K Power Bank",
    tagline: "20,000mAh with 30W fast charge",
    description:
      "A pocket-sized power station built for long travel days and load-shedding evenings. Dual USB-C/USB-A output means you can charge your phone and earbuds at the same time, and the digital display shows exact remaining charge instead of a vague 4-dot gauge.",
    specs: [
      { label: "Capacity", value: "20,000mAh" },
      { label: "Output", value: "30W USB-C PD, 18W USB-A" },
      { label: "Ports", value: "2x USB-A, 1x USB-C (in/out)" },
      { label: "Display", value: "Digital % readout" },
      { label: "Weight", value: "340g" },
    ],
    price: 4299,
    category: "charging",
    badges: ["bestseller"],
    images: ["1", "2"],
    rating: 4.7,
    reviewCount: 341,
    inStock: true,
  },
  {
    slug: "flexcharge-3-in-1-stand",
    name: "FlexCharge 3-in-1 Stand",
    tagline: "Wireless charging for phone, watch and buds",
    description:
      "One cable, three devices. FlexCharge folds flat for travel and unfolds into a stable charging stand for your desk or nightstand, with a dedicated puck for your smartwatch and a charging slot for your earbuds case.",
    specs: [
      { label: "Phone charging", value: "15W wireless (Qi)" },
      { label: "Watch charging", value: "Magnetic puck" },
      { label: "Cable", value: "1.5m USB-C, adapter not included" },
      { label: "Foldable", value: "Yes, travel-friendly" },
    ],
    price: 3799,
    category: "charging",
    badges: ["new"],
    images: ["1", "2"],
    rating: 4.4,
    reviewCount: 58,
    inStock: true,
  },
  {
    slug: "trailband-fitness-watch",
    name: "TrailBand Fitness Watch",
    tagline: "Track workouts, sleep and heart rate",
    description:
      "TrailBand keeps a full health picture without a subscription. Continuous heart rate, SpO2, sleep stages and over 100 sport modes are tracked on-device, and the 1.85\" AMOLED display stays readable in direct sunlight.",
    specs: [
      { label: "Display", value: "1.85\" AMOLED" },
      { label: "Battery life", value: "Up to 10 days" },
      { label: "Water resistance", value: "5ATM" },
      { label: "Sensors", value: "HR, SpO2, accelerometer" },
      { label: "Compatibility", value: "Android & iOS" },
    ],
    price: 6999,
    compareAtPrice: 8499,
    category: "wearables",
    badges: ["sale"],
    images: ["1", "2", "3"],
    colorVariants: [
      { id: "black", label: "Onyx Black", hex: "#1A1A1A" },
      { id: "green", label: "Lime Sport", hex: "#C6F135" },
    ],
    rating: 4.5,
    reviewCount: 127,
    inStock: true,
  },
  {
    slug: "gripcase-armor-shell",
    name: "GripCase Armor Shell",
    tagline: "Military-grade drop protection",
    description:
      "GripCase adds a reinforced bumper and raised bezel without turning your phone into a brick. Tested to survive 2-metre drops onto concrete, with precise cutouts for cameras, ports, and MagSafe alignment where applicable.",
    specs: [
      { label: "Drop rating", value: "2m (MIL-STD-810G tested)" },
      { label: "Material", value: "TPU + polycarbonate" },
      { label: "MagSafe", value: "Compatible" },
      { label: "Wireless charging", value: "Yes, no case removal needed" },
    ],
    price: 1899,
    category: "phone-accessories",
    images: ["1", "2"],
    rating: 4.3,
    reviewCount: 89,
    inStock: true,
  },
  {
    slug: "clearshield-tempered-glass",
    name: "ClearShield Tempered Glass",
    tagline: "9H hardness, edge-to-edge coverage",
    description:
      "A precision-cut tempered glass screen protector with an oleophobic coating that resists fingerprints and smudges. Comes with an alignment tray for a bubble-free, dead-center install every time.",
    specs: [
      { label: "Hardness", value: "9H" },
      { label: "Thickness", value: "0.3mm" },
      { label: "Coating", value: "Anti-fingerprint, anti-glare" },
      { label: "Install kit", value: "Alignment tray included" },
    ],
    price: 899,
    category: "phone-accessories",
    badges: ["bestseller"],
    images: ["1"],
    rating: 4.5,
    reviewCount: 402,
    inStock: true,
  },
  {
    slug: "beambulb-smart-led",
    name: "BeamBulb Smart LED",
    tagline: "16 million colors, app + voice control",
    description:
      "Set the mood without an electrician. BeamBulb screws into any standard fitting and connects straight to your Wi-Fi, no hub required, with scheduling, scenes, and support for Google Assistant and Alexa.",
    specs: [
      { label: "Brightness", value: "800 lumens" },
      { label: "Colors", value: "16 million (RGB + tunable white)" },
      { label: "Connectivity", value: "Wi-Fi 2.4GHz, no hub needed" },
      { label: "Voice control", value: "Google Assistant, Alexa" },
      { label: "Fitting", value: "Standard E27" },
    ],
    price: 1599,
    category: "smart-home",
    badges: ["new"],
    images: ["1", "2"],
    rating: 4.2,
    reviewCount: 46,
    inStock: true,
  },
  {
    slug: "aircore-mini-fan",
    name: "AirCore Mini Fan",
    tagline: "USB-C rechargeable desk fan",
    description:
      "A quiet, three-speed personal fan for a hot desk or a load-shedding blackout. The 4000mAh internal battery runs for hours on a single charge, and the flexible base tilts to aim airflow exactly where you need it.",
    specs: [
      { label: "Battery", value: "4000mAh, USB-C rechargeable" },
      { label: "Runtime", value: "Up to 12h on low speed" },
      { label: "Speeds", value: "3-speed + natural wind mode" },
      { label: "Noise level", value: "< 35dB" },
    ],
    price: 2299,
    category: "smart-home",
    images: ["1", "2"],
    rating: 4.4,
    reviewCount: 73,
    inStock: true,
  },
  {
    slug: "keysnap-mechanical-keyboard",
    name: "KeySnap 65% Mechanical Keyboard",
    tagline: "Hot-swappable switches, wireless or wired",
    description:
      "A compact 65% layout that keeps the arrow keys without the bulk of a full-size board. Hot-swap sockets mean you can change switches without a soldering iron, and it switches between Bluetooth, 2.4GHz dongle, and USB-C wired instantly.",
    specs: [
      { label: "Layout", value: "65% (68 keys)" },
      { label: "Switches", value: "Hot-swappable, linear (included)" },
      { label: "Connectivity", value: "Bluetooth 5.1 / 2.4GHz / USB-C" },
      { label: "Battery", value: "4000mAh, ~40h backlit" },
    ],
    price: 8999,
    compareAtPrice: 10999,
    category: "phone-accessories",
    badges: ["sale", "bestseller"],
    images: ["1", "2", "3"],
    colorVariants: [
      { id: "black", label: "Space Black", hex: "#1A1A1A" },
      { id: "cream", label: "Cream White", hex: "#F5F1E8" },
    ],
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
  },
  {
    slug: "streamcap-webcam",
    name: "StreamCap 1080p Webcam",
    tagline: "Crisp video for calls and streaming",
    description:
      "StreamCap ships with a built-in privacy shutter and auto light correction, so meetings look sharp whether you're by a window or under a dim desk lamp. Clips onto any monitor without extra mounts or software.",
    specs: [
      { label: "Resolution", value: "1080p @ 30fps" },
      { label: "Field of view", value: "78°" },
      { label: "Microphone", value: "Dual noise-reducing mic" },
      { label: "Mount", value: "Universal monitor clip" },
    ],
    price: 3299,
    category: "phone-accessories",
    images: ["1", "2"],
    rating: 4.1,
    reviewCount: 34,
    inStock: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .concat(products.filter((p) => p.slug !== product.slug && p.category !== product.category))
    .slice(0, limit);
}

export const categoryLabels: Record<Product["category"], string> = {
  audio: "Audio",
  charging: "Charging",
  wearables: "Wearables",
  "phone-accessories": "Phone Accessories",
  "smart-home": "Smart Home",
};
