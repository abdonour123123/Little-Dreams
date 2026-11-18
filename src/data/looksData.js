/**
- Little Dreams - Complete Lookbook Catalog
- Featuring high-resolution 2K models and full Front & Back 3D piece inspection data.
 */
import frontJacketImg from '../assets/Front jacket.png';
import backJacketImg from '../assets/back jacket.png';
import frontPantsImg from '../assets/pants front.png';
import backPantsImg from '../assets/pants back.png';
import frontTringeImg from '../assets/tringe front.png';
import backTringeImg from '../assets/tringe back.png';
import frontJacketBoy2Img from '../assets/front-jacket-boy2.png';
import backJacketBoy2Img from '../assets/back-jacket-boy2.png';
import frontRedDressImg from '../assets/front-red-dress.png';
import backRedDressImg from '../assets/back-red-dress.png';

export const LOOKS_DATA = [
  {
    id: "01",
    code: "the-ballet-studio-edit",
    title: "The Ballet Studio Edit",
    gender: "girl",
    theme: {
      mode: "rose",
      primaryColor: "#75153c",
      secondaryColor: "#d9206e",
      accentColor: "#f3689d",
      bgGradient: "linear-gradient(135deg, #fdf2f7 0%, #fad8e7 50%, #f7c7db 100%)",
      headerBg: "#6d1338",
      textColor: "#570c29",
      doodleColor: "#d9206e",
      taglineColor: "#8c2850",
      pedestalColor: "#e8b8cb",
      pedestalTop: "#f5d0df",
      buttonBg: "#6d1338",
      buttonHover: "#550c2a",
      glowColor: "rgba(217, 32, 110, 0.28)",
      pillBg: "bg-pink-300 text-rose-950"
    },
    model: {
      name: "Grace",
      pose: "ballet-dance",
      headline: "Graceful Movement. 2K Studio Edit.",
      subhead: "Chic sherpa-trimmed shacket paired with tailored faux-leather shorts.",
      avatarType: "ballet-girl-photo",
      image: "/ballet-girl-cutout.jpg",
      hotspots: [
        { id: 1, type: "coat", top: "34%", left: "44%", label: "Sherpa Fleece Shacket", tag: "Coat" },
        { id: 2, type: "pants", top: "54%", left: "42%", label: "Vegan Leather Shorts", tag: "Pants" }
      ]
    },
    items: [
      {
        id: "item-grace-01",
        num: 1,
        brand: "LITTLE DREAMS",
        name: "Vanilla Sherpa Trim Shacket",
        price: 149.0,
        badge: "Plush Sherpa",
        material: "100% Recycled Poly Fleece & Heavyweight Brushed Twill",
        description: "A cozy cropped chore jacket featuring dual sherpa fleece flap pockets, spread sherpa collar, faux-horn buttons, and fleece sleeve cuff trims for graceful warmth.",
        frontBadge1: "Sherpa Flap Pockets",
        frontBadge2: "Horn Buttons",
        frontDescription: "Dual plush sherpa chest pockets, notched fleece lapel collar, and 4-button closure with sherpa hem border.",
        backBadge1: "Fleece Back Yoke",
        backBadge2: "Contoured Drapes",
        backDescription: "Clean horizontal shoulder yoke with sherpa collar reverse drape and reinforced side seams.",
        image: "/shacket-front.jpg",
        frontImage: "/shacket-front.jpg",
        backImage: "/shacket-back.jpg"
      },
      {
        id: "item-grace-02",
        num: 2,
        brand: "LITTLE DREAMS",
        name: "Onyx Vegan Leather Shorts",
        price: 119.0,
        badge: "Vegan Leather",
        material: "100% Water-based Polyurethane with Ultra-Soft Cotton Knit Lining",
        description: "Sophisticated tailored silhouette with a comfortable elasticated waistband, relaxed Bermuda leg profile, and buttery soft water-resistant vegan leather.",
        frontBadge1: "Pleated Front",
        frontBadge2: "Slanted Pockets",
        frontDescription: "Smooth flat-front finish with subtle front darts, deep side slash pockets, and wide leg hems.",
        backBadge1: "Elastic Gather",
        backBadge2: "Welt Pocket Accents",
        backDescription: "Smocked comfort elastic across the back waistband with decorative welt pocket stitching.",
        image: "/pants-front.jpg",
        frontImage: "/pants-front.jpg",
        backImage: "/pants-back.jpg"
      }
    ],
    bundle: {
      label: "Complete the 2-piece look",
      discountNote: "Bundle coat & pants to save 10%",
      originalPrice: 268.0,
      bundlePrice: 241.2
    }
  },
  {
    id: "02",
    code: "the-urban-playmaker",
    title: "The Urban Playmaker",
    gender: "boy",
    theme: {
      mode: "blue",
      primaryColor: "#0f3a68",
      secondaryColor: "#1d72b8",
      accentColor: "#38bdf8",
      bgGradient: "linear-gradient(135deg, #e0f2fe 0%, #c7e6fc 50%, #b2dcf8 100%)",
      headerBg: "#0c2b4d",
      textColor: "#082544",
      doodleColor: "#1d72b8",
      taglineColor: "#1e4d7b",
      pedestalColor: "#a3cde9",
      pedestalTop: "#cbe4f6",
      buttonBg: "#0f3a68",
      buttonHover: "#0a2747",
      glowColor: "rgba(29, 114, 184, 0.28)",
      pillBg: "bg-sky-400 text-slate-900"
    },
    model: {
      name: "Leo",
      pose: "standing",
      headline: "The Retro Corduroy & Fleece Set",
      subhead: "Cozy contrast details and plush warmth built for all-day playground adventures.",
      avatarType: "boy-blue",
      hotspots: [
        { id: 1, top: "35%", left: "50%", label: "Cobalt Explorer Jacket" },
        { id: 2, top: "66%", left: "50%", label: "Indigo Tapered Chinos" },
        { id: 3, top: "90%", left: "50%", label: "Navy Cloud Runners" }
      ]
    },
    items: [
      {
        id: "item-201",
        num: 1,
        brand: "LITTLE DREAMS",
        name: "Cobalt Explorer Jacket",
        price: 139.0,
        badge: "Wind-Resistant",
        material: "Active Windproof Softshell with Breathable Honeycomb Mesh Lining",
        description: "Modern cobalt jacket with contrast white zipper, teddy bear chest badge, dual fleece pockets, and athletic collar.",
        frontBadge1: "Contrast Zipper",
        frontBadge2: "Bear Chest Patch",
        frontDescription: "Full zip front with storm guard, teddy bear embroidery, and zippered hand pockets.",
        backBadge1: "Reflective Bar",
        backBadge2: "Ergonomic Sleeves",
        backDescription: "Reflective safety tab on collar, articulated raglan shoulder seams, and drop tail hem.",
        image: frontJacketBoy2Img,
        frontImage: frontJacketBoy2Img,
        backImage: backJacketBoy2Img
      }
    ],
    bundle: {
      label: "Complete the look",
      discountNote: "Bundle all 3 and save 10%",
      originalPrice: 367.0,
      bundlePrice: 330.3
    }
  },
  {
    id: "03",
    code: "the-magenta-bear-edit",
    title: "The Magenta Bear Edit",
    gender: "girl",
    theme: {
      mode: "magenta",
      primaryColor: "#75153c",
      secondaryColor: "#d9206e",
      accentColor: "#f3689d",
      bgGradient: "linear-gradient(135deg, #fce8f0 0%, #fad4e4 50%, #f7c5d9 100%)",
      headerBg: "#6d1338",
      textColor: "#570c29",
      doodleColor: "#d9206e",
      taglineColor: "#8c2850",
      pedestalColor: "#e8b8cb",
      pedestalTop: "#f5d0df",
      buttonBg: "#6d1338",
      buttonHover: "#550c2a",
      glowColor: "rgba(217, 32, 110, 0.25)",
      pillBg: "bg-pink-300 text-rose-950"
    },
    model: {
      name: "Emma",
      pose: "sitting",
      headline: "Little Looks. Try the Look.",
      subhead: "Vintage charm meets cozy comfort for everyday elegance or festive occasions.",
      avatarType: "girl-magenta",
      hotspots: [
        { id: 1, top: "42%", left: "48%", label: "Magenta Bear Hoodie" },
        { id: 2, top: "72%", left: "45%", label: "Khaki Dream Chinos" },
        { id: 3, top: "88%", left: "42%", label: "White Cloud Sneakers" }
      ]
    },
    items: [
      {
        id: "item-101",
        num: 1,
        brand: "LITTLE DREAMS",
        name: "Scarlet Ruffle Corduroy Dress",
        price: 129.0,
        badge: "Organic Cotton",
        material: "100% French Terry Organic Cotton",
        description: "Crafted from soft, textured red corduroy, this button-down dress features delightful ruffled shoulder accents, a neat collar, and matching ruffled patch pockets. It seamlessly blends classic vintage style with playful modern wear.",
        frontBadge1: "Kangaroo Pocket",
        frontBadge2: "Teddy Patch",
        frontDescription: "Front pouch pocket with teddy bear embroidery and double-lined hood with safety drawstrings.",
        backBadge1: "Clean Yoke",
        backBadge2: "Ribbed Hem",
        backDescription: "Solid rich magenta back panel with rib-knit cuffs and waist.",
        image: frontRedDressImg,
        frontImage: frontRedDressImg,
        backImage: backRedDressImg
      }
    ],
    bundle: {
      label: "Complete the look",
      discountNote: "Bundle all 3 and save 10%",
      originalPrice: 347.0,
      bundlePrice: 312.3
    }
  },
  {
    id: "04",
    code: "coastal-mariner",
    title: "Coastal Mariner",
    gender: "boy",
    theme: {
      mode: "blue",
      primaryColor: "#0f3a68",
      secondaryColor: "#1d72b8",
      accentColor: "#38bdf8",
      bgGradient: "linear-gradient(135deg, #e6f4fe 0%, #cee6f9 50%, #b8dbf6 100%)",
      headerBg: "#0c2b4d",
      textColor: "#082544",
      doodleColor: "#1d72b8",
      taglineColor: "#1e4d7b",
      pedestalColor: "#a3cde9",
      pedestalTop: "#cbe4f6",
      buttonBg: "#0f3a68",
      buttonHover: "#0a2747",
      glowColor: "rgba(29, 114, 184, 0.28)",
      pillBg: "bg-sky-400 text-slate-900"
    },
    model: {
      name: "Noah",
      pose: "standing-hands-pocket",
      headline: "Seaside Comfort. Ocean Cool.",
      subhead: "Breton striped boatneck pullovers matched with relaxed nautical twill shorts.",
      avatarType: "boy-mariner",
      hotspots: [
        { id: 1, top: "38%", left: "51%", label: "Nautical Striped Knit" },
        { id: 2, top: "67%", left: "51%", label: "Coastal Twill Bermudas" }
      ]
    },
    items: [
      {
        id: "item-401",
        num: 1,
        brand: "LITTLE DREAMS",
        name: "Urban Explorer Fleece Jacket",
        price: 125.0,
        badge: "100% Breathable",
        description: "This dynamic outfit combines a rich brown fleece zip-up jacket—featuring a cozy sherpa-lined hood, bold black contrast utility panels, and a statement chest badge—with cool dark acid-wash denim jeans for a stylish, weather-ready look.",
        frontBadge1: "Breton Stripe",
        frontBadge2: "Boatneck Collar",
        frontDescription: "Classic marine blue horizontal stripes with ribbed wrist cuffs.",
        backBadge1: "Continuous Stripe",
        backBadge2: "Clean Hem",
        backDescription: "Seamless horizontal stripe matching across back torso and shoulders.",
        image: frontJacketImg,
        frontImage: frontJacketImg,
        backImage: backJacketImg
      },
      {
        id: "item-402",
        num: 2,
        brand: "LITTLE DREAMS",
        name: "Rebel Street Black Stretch Jeans",
        price: 99.0,
        badge: "Water Repel",
        description: "These versatile black jeans feature a comfortable modern fit, heavy-duty reinforced stitching, and an adjustable waistband designed to keep up with high-energy adventures while maintaining a sharp, streetwear-inspired look.",
        frontBadge1: "Slash Pockets",
        frontBadge2: "Drawstring Tie",
        frontDescription: "Front drawstring waistband with deep reinforced pockets.",
        backBadge1: "Button Welt",
        backBadge2: "Flap Pocket",
        backDescription: "Rear buttoned patch pocket with water drainage grommet.",
        image: frontPantsImg,
        frontImage: frontPantsImg,
        backImage: backPantsImg
      }
    ],
    bundle: {
      label: "Complete the look",
      discountNote: "Bundle all 3 and save 10%",
      originalPrice: 319.0,
      bundlePrice: 287.1
    }
  },
  {
    id: "05",
    code: "sweet-rose-garden",
    title: "Sweet Rose Garden",
    gender: "girl",
    theme: {
      mode: "magenta",
      primaryColor: "#75153c",
      secondaryColor: "#d9206e",
      accentColor: "#f3689d",
      bgGradient: "linear-gradient(135deg, #fdf0f5 0%, #fadbe6 50%, #f6cbdb 100%)",
      headerBg: "#6d1338",
      textColor: "#570c29",
      doodleColor: "#d9206e",
      taglineColor: "#8c2850",
      pedestalColor: "#e8b8cb",
      pedestalTop: "#f5d0df",
      buttonBg: "#6d1338",
      buttonHover: "#550c2a",
      glowColor: "rgba(217, 32, 110, 0.25)",
      pillBg: "bg-pink-300 text-rose-950"
    },
    model: {
      name: "Sophia",
      pose: "twirl",
      headline: "Rosy Days. Made for Smiles.",
      subhead: "Soft knit cardigans with playful pleated skirts for graceful sunny adventures.",
      avatarType: "girl-rose",
      hotspots: [
        { id: 1, top: "36%", left: "49%", label: "Blush Ribbed Cardigan" },
        { id: 2, top: "62%", left: "49%", label: "Rose Petal Twirl Skirt" },
        { id: 3, top: "88%", left: "49%", label: "Ballerina Cloud Flats" }
      ]
    },
    items: [
      {
        id: "item-301",
        num: 1,
        brand: "LITTLE DREAMS",
        name: "Blush Ribbed Cardigan",
        price: 115.0,
        badge: "Merino Blend",
        description: "Cozy ribbed cardigan with mother-of-pearl buttons.",
        frontBadge1: "Pearl Buttons",
        frontBadge2: "Scalloped Neck",
        frontDescription: "Fine cable knit ribbing with dainty pearl button front.",
        backBadge1: "Ribbed Back",
        backBadge2: "Soft Drape",
        backDescription: "Continuous vertical rib stitch across spine.",
        image: frontTringeImg,
        frontImage: frontTringeImg,
        backImage: backTringeImg
      }
    ],
    bundle: {
      label: "Complete the look",
      discountNote: "Bundle all 3 and save 10%",
      originalPrice: 299.0,
      bundlePrice: 269.1
    }
  }
];

export const COLLECTION_PRODUCTS = [
  {
    id: 'stellina-corduroy-jacket',
    code: '201',
    title: 'Explorer Corduroy Shacket Set',
    category: 'Outerwear',
    badge: 'Cozy Drop',
    price: 139.0,
    sizes: ['4', '6', '8', '10'],
    variants: [
      {
        name: 'Warm Caramel',
        hex: '#C67B34',
        primaryImg: '/kids wear/boy2.jpeg',
      },
      {
        name: 'Olive Drab',
        hex: '#4A5D4E',
        primaryImg: '/kids wear/boyv.jpeg',
      },
    ],
  },
  {
    id: 'stellina-sherpa-fleece',
    code: '202',
    title: 'Sherpa Fleece Pocket Jacket',
    category: 'Outerwear',
    badge: 'New',
    price: 75.0,
    sizes: ['6', '8', '10', '12'],
    variants: [
      {
        name: 'Pastel Carnation',
        hex: '#FFB5C5',
        primaryImg: '/kids wear/girl2.jpeg',
      },
      {
        name: 'Warm Cream',
        hex: '#FDFBF7',
        primaryImg: '/kids wear/girl3.jpeg',
      },
    ],
  },
  {
    id: 'stellina-ruffle-dress',
    code: '203',
    title: 'Corduroy Ruffle Party Dress',
    category: 'Dresses',
    badge: 'Bestseller',
    price: 129.0,
    sizes: ['2', '3', '4', '5'],
    variants: [
      {
        name: 'Rose Dust',
        hex: '#C07C75',
        primaryImg: '/kids wear/girl4.jpeg',
      },
      {
        name: 'Warm Terracotta',
        hex: '#A35246',
        primaryImg: '/kids wear/girl5.jpeg',
      },
      {
        name: 'Ruby Red',
        hex: '#991B1B',
        primaryImg: '/kids wear/girl6.jpeg',
      },
    ],
  },
  {
    id: 'stellina-celestial-dress',
    code: '204',
    title: 'Celestial Silk Evening Dress',
    category: 'Dresses',
    badge: 'Exclusive',
    price: 145.0,
    sizes: ['4', '6', '8', '10'],
    variants: [
      {
        name: 'medium-dark green',
        hex: '#496C4E',
        primaryImg: '/kids wear/girl7.jpeg',
      },
    ],
  },
  {
    id: 'stellina-bunny-fleece-jumpsuit',
    code: '205',
    title: 'Fluffy Bunny Ears Fleece Jumpsuit',
    category: 'Outerwear',
    badge: 'Cozy Pick',
    price: 95.0,
    sizes: ['2', '4', '6', '8'],
    variants: [
      {
        name: 'Sunny Yellow',
        hex: '#FDE047',
        primaryImg: '/kids wear//girl8.png',
      },
      {
        name: 'Sky Blue',
        hex: '#38BDF8',
        primaryImg: '/kids wear//girl8(2).png',
      },
      {
        name: 'Sweet Pink',
        hex: '#F472B6',
        primaryImg: '/kids wear//girl8(3).png',
      },
    ],
  },
];