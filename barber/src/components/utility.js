export const DATABASE = "https://mybarber-schedule.herokuapp.com/mybarber/api";

export const avaiabilty = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
];

export const closingHoursFriday = [
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
];

export const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const theTypes = [
  { name: "Haircut Only", price: 60 },
  { name: `Haircut & Beard`, price: 80 },
  { name: "Dye Only", price: 120 },
  { name: "Full Treatment", price: 185 },
];

export const adminActios = [
  { name: "Upcoming 10 Days", page: "/admin/week" },
  { name: "Custom Date View", page: "/admin/customdate" },
  { name: "Manage Days Off", page: "/admin/mangedaysoff" },
];

export const aboutUsText = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore ullam, libero officiis similique exercitationem hic ut necessitatibus totam voluptates vitae dignissimos pariatur nulla molestiae quia.'

export const legalTerms = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore ullam, libero officiis similique exercitationem hic ut necessitatibus totam voluptates vitae dignissimos pariatur nulla molestiae quia.'

export const location = { adress: "29 Matalon Rd, Tel Aviv" }; // should include coordinates for the map in the future

export const contactUs = [
  { name: "phone", route: "0545729402", color: "green" },
  { name: "mail", route: "gilad18587@gmail.com", color: "red" },
  { name: "facebook", route: "GILAD YEFET", color: "blue" },
  { name: "instagram", route: "gilad1987", color: "white" },
];

export const holidays = [
  { name: "Passover (Day 1)", date: "28-03-2021" },
  { name: "Passover (Day 7)", date: "03-04-2021" },
  { name: "Yom HaAtzmaut", date: "15-04-2021" },
  { name: "Shavuot", date: "17-05-2021" },
  { name: "Rosh Hashana", date: "07-09-2021" },
  { name: "Rosh Hashana (Day 2)", date: "08-09-2021" },
  { name: "Yom Kippur", date: "16-09-2021" },
  { name: "Sukkot (Day 1)", date: "21-09-2021" },
  { name: "Simchat Torah", date: "28-09-2021" },
  { name: "Passover (Day 1)", date: "16-04-2022" },
  { name: "Passover (Day 7)", date: "22-04-2022" },
  { name: "Yom HaAtzmaut", date: "05-05-2022" },
  { name: "Shavuot", date: "05-06-2022" },
  { name: "Rosh Hashana", date: "26-09-2022" },
  { name: "Rosh Hashana (Day 2)", date: "27-09-2022" },
  { name: "Yom Kippur", date: "05-10-2022" },
  { name: "Sukkot (Day 1)", date: "10-10-2022" },
  { name: "Simchat Torah", date: "17-10-2022" },
];
