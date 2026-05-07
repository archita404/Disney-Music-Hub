import ocean from "@/assets/scene-ocean.jpg";
import ice from "@/assets/scene-ice.jpg";
import savanna from "@/assets/scene-savanna.jpg";
import arabian from "@/assets/scene-arabian.jpg";
import forest from "@/assets/scene-forest.jpg";
import toys from "@/assets/scene-toys.jpg";

export type Song = {
  id: string;
  title: string;
  movie: string;
  character: string;
  year: number;
  duration: string;
  cover: string;
  accent: string; // hue color theme
  category: "Princess" | "Adventure" | "Friendship" | "Villain" | "Love";
};

export const songs: Song[] = [
  { id: "1", title: "Part of Your World", movie: "The Little Mermaid", character: "Ariel", year: 1989, duration: "3:14", cover: ocean, accent: "200", category: "Princess" },
  { id: "2", title: "Let It Go", movie: "Frozen", character: "Elsa", year: 2013, duration: "3:44", cover: ice, accent: "240", category: "Princess" },
  { id: "3", title: "Circle of Life", movie: "The Lion King", character: "Rafiki", year: 1994, duration: "3:59", cover: savanna, accent: "60", category: "Adventure" },
  { id: "4", title: "A Whole New World", movie: "Aladdin", character: "Aladdin & Jasmine", year: 1992, duration: "2:40", cover: arabian, accent: "300", category: "Love" },
  { id: "5", title: "I See the Light", movie: "Tangled", character: "Rapunzel & Flynn", year: 2010, duration: "3:43", cover: forest, accent: "30", category: "Love" },
  { id: "6", title: "You've Got a Friend in Me", movie: "Toy Story", character: "Woody", year: 1995, duration: "2:04", cover: toys, accent: "50", category: "Friendship" },
  { id: "7", title: "Under the Sea", movie: "The Little Mermaid", character: "Sebastian", year: 1989, duration: "3:14", cover: ocean, accent: "180", category: "Friendship" },
  { id: "8", title: "Do You Want to Build a Snowman?", movie: "Frozen", character: "Anna", year: 2013, duration: "3:24", cover: ice, accent: "220", category: "Friendship" },
  { id: "9", title: "Hakuna Matata", movie: "The Lion King", character: "Timon & Pumbaa", year: 1994, duration: "3:33", cover: savanna, accent: "80", category: "Friendship" },
  { id: "10", title: "Friend Like Me", movie: "Aladdin", character: "Genie", year: 1992, duration: "2:25", cover: arabian, accent: "270", category: "Friendship" },
  { id: "11", title: "Be Our Guest", movie: "Beauty and the Beast", character: "Lumière", year: 1991, duration: "3:44", cover: forest, accent: "40", category: "Friendship" },
  { id: "12", title: "Beauty and the Beast", movie: "Beauty and the Beast", character: "Mrs. Potts", year: 1991, duration: "2:46", cover: forest, accent: "320", category: "Love" },
  { id: "13", title: "Reflection", movie: "Mulan", character: "Mulan", year: 1998, duration: "2:30", cover: forest, accent: "150", category: "Princess" },
  { id: "14", title: "I'll Make a Man Out of You", movie: "Mulan", character: "Shang", year: 1998, duration: "3:22", cover: savanna, accent: "20", category: "Adventure" },
  { id: "15", title: "How Far I'll Go", movie: "Moana", character: "Moana", year: 2016, duration: "2:43", cover: ocean, accent: "190", category: "Adventure" },
  { id: "16", title: "You're Welcome", movie: "Moana", character: "Maui", year: 2016, duration: "2:39", cover: ocean, accent: "100", category: "Friendship" },
  { id: "17", title: "Poor Unfortunate Souls", movie: "The Little Mermaid", character: "Ursula", year: 1989, duration: "4:42", cover: ocean, accent: "300", category: "Villain" },
  { id: "18", title: "Be Prepared", movie: "The Lion King", character: "Scar", year: 1994, duration: "3:40", cover: savanna, accent: "140", category: "Villain" },
  { id: "19", title: "Cruella De Vil", movie: "101 Dalmatians", character: "Cruella", year: 1961, duration: "1:30", cover: toys, accent: "0", category: "Villain" },
  { id: "20", title: "When You Wish Upon a Star", movie: "Pinocchio", character: "Jiminy Cricket", year: 1940, duration: "3:18", cover: toys, accent: "250", category: "Love" },
  { id: "21", title: "A Dream Is a Wish Your Heart Makes", movie: "Cinderella", character: "Cinderella", year: 1950, duration: "3:01", cover: forest, accent: "330", category: "Princess" },
  { id: "22", title: "Bibbidi-Bobbidi-Boo", movie: "Cinderella", character: "Fairy Godmother", year: 1950, duration: "1:51", cover: forest, accent: "340", category: "Princess" },
  { id: "23", title: "Colors of the Wind", movie: "Pocahontas", character: "Pocahontas", year: 1995, duration: "3:31", cover: forest, accent: "130", category: "Adventure" },
  { id: "24", title: "Remember Me", movie: "Coco", character: "Miguel", year: 2017, duration: "2:35", cover: arabian, accent: "10", category: "Love" },
];

export const categories = ["All", "Princess", "Adventure", "Friendship", "Villain", "Love"] as const;