export const MOCK_ORDERS = [

  {
    id: "ORD-10231",

    date: "20 May 2026",

    total: 4599,

    payment: "UPI",

    status: "Delivered",

    shipping: {

      fullName: "Satyajeet",

      phone: "+91 9876543210",

      addressLine:
        "KIIT University Campus 6",

      city: "Bhubaneswar",

      state: "Odisha",

      pincode: "751024",

    },

    items: [

      {
        id: 1,

        title:
          "Industrial Vacuum Pump",

        image:
          "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop",

        price: 2499,

        qty: 1,
      },

      {
        id: 2,

        title:
          "Digital Leak Detector",

        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",

        price: 1050,

        qty: 2,
      },

    ],

  },

  {
    id: "ORD-10458",

    date: "15 May 2026",

    total: 7999,

    payment: "Card",

    status: "Shipped",

    shipping: {

      fullName: "Satyajeet",

      phone: "+91 9876543210",

      addressLine:
        "Patia Main Road",

      city: "Bhubaneswar",

      state: "Odisha",

      pincode: "751024",

    },

    items: [

      {
        id: 3,

        title:
          "Smart Industrial Monitor",

        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",

        price: 7999,

        qty: 1,
      },

    ],

  },

  {
    id: "ORD-10672",

    date: "09 May 2026",

    total: 3299,

    payment: "Cash on Delivery",

    status: "Processing",

    shipping: {

      fullName: "Satyajeet",

      phone: "+91 9876543210",

      addressLine:
        "Infocity Square",

      city: "Bhubaneswar",

      state: "Odisha",

      pincode: "751024",

    },

    items: [

      {
        id: 4,

        title:
          "Precision Pressure Gauge",

        image:
          "https://images.unsplash.com/photo-1580894908361-967195033215?q=80&w=800&auto=format&fit=crop",

        price: 1599,

        qty: 1,
      },

      {
        id: 5,

        title:
          "Industrial Safety Gloves",

        image:
          "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=800&auto=format&fit=crop",

        price: 850,

        qty: 2,
      },

    ],

  },

];