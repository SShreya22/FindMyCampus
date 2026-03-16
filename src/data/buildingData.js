export const buildingData = [
  {
    id: "block-a",
    name: "Block A",
    shortName: "A",
    type: "Academic",
    description: "CSE & IT Department — Houses labs, lecture halls, faculty cabins",
    floors: 4,
    facilities: ["Computer Labs", "Seminar Hall", "Faculty Offices", "Restrooms"],
    x: 80,
    y: 60,
    color: "#9CAF88",
  },
  {
    id: "block-b",
    name: "Block B",
    shortName: "B",
    type: "Academic",
    description: "ECE & MECH Department — Workshop, electronics lab, design studio",
    floors: 3,
    facilities: ["Electronics Lab", "Workshop", "Faculty Cabins", "Terrace"],
    x: 220,
    y: 60,
    color: "#A8C7E7",
  },
  {
    id: "library",
    name: "Library",
    shortName: "LIB",
    type: "Resource",
    description: "Central library with digital resources, reading rooms & archives",
    floors: 2,
    facilities: ["Reading Rooms", "Digital Lab", "Archive", "Cafeteria"],
    x: 150,
    y: 170,
    color: "#c4a882",
  },
  {
    id: "lab",
    name: "Research Lab",
    shortName: "LAB",
    type: "Research",
    description: "Advanced research lab for final year projects and R&D",
    floors: 2,
    facilities: ["Project Lab", "3D Printing", "IoT Lab", "Meeting Rooms"],
    x: 280,
    y: 180,
    color: "#b8a8c7",
  },
  {
    id: "admin",
    name: "Admin Office",
    shortName: "ADM",
    type: "Administration",
    description: "Administrative block — Admissions, finance, registrar office",
    floors: 3,
    facilities: ["Registrar", "Finance Office", "Admissions", "Principal Office"],
    x: 80,
    y: 220,
    color: "#c7b8a8",
  },
  {
    id: "cafeteria",
    name: "Cafeteria",
    shortName: "CAFE",
    type: "Amenity",
    description: "Main campus cafeteria with multiple food stalls and seating",
    floors: 1,
    facilities: ["Food Court", "Seating Area", "ATM", "Vending"],
    x: 155,
    y: 290,
    color: "#a8c2c7",
  },
];

export const pathData = {
  "block-a-block-b": [
    { x: 80, y: 60 }, { x: 150, y: 55 }, { x: 220, y: 60 }
  ],
  "block-a-library": [
    { x: 80, y: 60 }, { x: 80, y: 120 }, { x: 150, y: 170 }
  ],
  "block-a-admin": [
    { x: 80, y: 60 }, { x: 80, y: 140 }, { x: 80, y: 220 }
  ],
  "block-b-library": [
    { x: 220, y: 60 }, { x: 220, y: 120 }, { x: 190, y: 170 }, { x: 150, y: 170 }
  ],
  "block-b-lab": [
    { x: 220, y: 60 }, { x: 250, y: 120 }, { x: 280, y: 180 }
  ],
  "library-admin": [
    { x: 150, y: 170 }, { x: 110, y: 200 }, { x: 80, y: 220 }
  ],
  "library-cafeteria": [
    { x: 150, y: 170 }, { x: 150, y: 220 }, { x: 155, y: 290 }
  ],
  "admin-cafeteria": [
    { x: 80, y: 220 }, { x: 100, y: 260 }, { x: 155, y: 290 }
  ],
  "lab-cafeteria": [
    { x: 280, y: 180 }, { x: 280, y: 240 }, { x: 200, y: 290 }, { x: 155, y: 290 }
  ],
};
