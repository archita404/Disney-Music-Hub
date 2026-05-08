import ocean from "@/assets/scene-ocean.jpg";
import ice from "@/assets/scene-ice.jpg";
import savanna from "@/assets/scene-savanna.jpg";
import arabian from "@/assets/scene-arabian.jpg";
import forest from "@/assets/scene-forest.jpg";
import toys from "@/assets/scene-toys.jpg";

export type Category = "Princess" | "Adventure" | "Friendship" | "Villain" | "Love" | "Anthem";

export type Song = {
  id: string;
  title: string;
  movie: string;
  movieSlug: string;
  character: string;
  year: number;
  duration: string;
  cover: string;
  accent: string;
  category: Category;
  previewUrl: string;
  youtubeId?: string;
};

// Royalty-free preview audio (SoundHelix). Swap for real Disney audio if licensed.
const PREVIEWS = Array.from({ length: 16 }, (_, i) =>
  `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${i + 1}.mp3`,
);
const preview = (i: number) => PREVIEWS[i % PREVIEWS.length];

type Raw = Omit<Song, "id" | "previewUrl" | "movieSlug"> & { movie: string };
const raw: Raw[] = [
  // Little Mermaid
  { title: "Part of Your World", movie: "The Little Mermaid", character: "Ariel", year: 1989, duration: "3:14", cover: ocean, accent: "200", category: "Princess", youtubeId: "Aw_2Dw6e-2Y" },
  { title: "Under the Sea", movie: "The Little Mermaid", character: "Sebastian", year: 1989, duration: "3:14", cover: ocean, accent: "180", category: "Friendship", youtubeId: "GC_mV1IpjWA" },
  { title: "Poor Unfortunate Souls", movie: "The Little Mermaid", character: "Ursula", year: 1989, duration: "4:42", cover: ocean, accent: "300", category: "Villain", youtubeId: "Hn1eFwsv4Vk" },
  { title: "Kiss the Girl", movie: "The Little Mermaid", character: "Sebastian", year: 1989, duration: "2:45", cover: ocean, accent: "160", category: "Love", youtubeId: "9DRRMqr5Mtg" },
  // Frozen
  { title: "Let It Go", movie: "Frozen", character: "Elsa", year: 2013, duration: "3:44", cover: ice, accent: "240", category: "Princess", youtubeId: "moSFlvxnbgk" },
  { title: "Do You Want to Build a Snowman?", movie: "Frozen", character: "Anna", year: 2013, duration: "3:24", cover: ice, accent: "220", category: "Friendship", youtubeId: "ZA8ZB6pmoiw" },
  { title: "For the First Time in Forever", movie: "Frozen", character: "Anna & Elsa", year: 2013, duration: "3:46", cover: ice, accent: "210", category: "Princess", youtubeId: "OQOjwOACfvo" },
  { title: "Love Is an Open Door", movie: "Frozen", character: "Anna & Hans", year: 2013, duration: "2:07", cover: ice, accent: "260", category: "Love", youtubeId: "v4UhRpRlmcw" },
  { title: "Into the Unknown", movie: "Frozen II", character: "Elsa", year: 2019, duration: "3:14", cover: ice, accent: "230", category: "Anthem", youtubeId: "Zi4LFprT_jY" },
  { title: "Show Yourself", movie: "Frozen II", character: "Elsa", year: 2019, duration: "4:21", cover: ice, accent: "245", category: "Anthem", youtubeId: "AC9b5Ku5gpc" },
  // Lion King
  { title: "Circle of Life", movie: "The Lion King", character: "Rafiki", year: 1994, duration: "3:59", cover: savanna, accent: "60", category: "Adventure", youtubeId: "GibiNy4d4gc" },
  { title: "Hakuna Matata", movie: "The Lion King", character: "Timon & Pumbaa", year: 1994, duration: "3:33", cover: savanna, accent: "80", category: "Friendship", youtubeId: "xB5ceul3JqU" },
  { title: "I Just Can't Wait to Be King", movie: "The Lion King", character: "Simba", year: 1994, duration: "2:50", cover: savanna, accent: "70", category: "Adventure", youtubeId: "nbY_aP-alkw" },
  { title: "Be Prepared", movie: "The Lion King", character: "Scar", year: 1994, duration: "3:40", cover: savanna, accent: "140", category: "Villain", youtubeId: "y5Sdd5Ouj1I" },
  { title: "Can You Feel the Love Tonight", movie: "The Lion King", character: "Simba & Nala", year: 1994, duration: "4:02", cover: savanna, accent: "30", category: "Love", youtubeId: "25QyCxVkXwQ" },
  // Aladdin
  { title: "A Whole New World", movie: "Aladdin", character: "Aladdin & Jasmine", year: 1992, duration: "2:40", cover: arabian, accent: "300", category: "Love", youtubeId: "0qJUKZ4FIBs" },
  { title: "Friend Like Me", movie: "Aladdin", character: "Genie", year: 1992, duration: "2:25", cover: arabian, accent: "270", category: "Friendship", youtubeId: "diYAc7gB-0A" },
  { title: "Prince Ali", movie: "Aladdin", character: "Genie", year: 1992, duration: "2:50", cover: arabian, accent: "280", category: "Adventure", youtubeId: "n3qOiBaM_qA" },
  { title: "Speechless", movie: "Aladdin (2019)", character: "Jasmine", year: 2019, duration: "4:00", cover: arabian, accent: "310", category: "Anthem", youtubeId: "1bqHN2YSAN8" },
  // Tangled
  { title: "I See the Light", movie: "Tangled", character: "Rapunzel & Flynn", year: 2010, duration: "3:43", cover: forest, accent: "30", category: "Love", youtubeId: "ZOK_xfIxLBM" },
  { title: "When Will My Life Begin", movie: "Tangled", character: "Rapunzel", year: 2010, duration: "2:34", cover: forest, accent: "40", category: "Princess", youtubeId: "ESJSx9oGqZc" },
  { title: "I've Got a Dream", movie: "Tangled", character: "Pub Thugs", year: 2010, duration: "3:13", cover: forest, accent: "50", category: "Friendship", youtubeId: "0EFmukXZ2c4" },
  // Toy Story
  { title: "You've Got a Friend in Me", movie: "Toy Story", character: "Woody", year: 1995, duration: "2:04", cover: toys, accent: "50", category: "Friendship", youtubeId: "nMN4JXIhJVk" },
  // Beauty and the Beast
  { title: "Be Our Guest", movie: "Beauty and the Beast", character: "Lumière", year: 1991, duration: "3:44", cover: forest, accent: "40", category: "Friendship", youtubeId: "ianBdt4Kcyk" },
  { title: "Beauty and the Beast", movie: "Beauty and the Beast", character: "Mrs. Potts", year: 1991, duration: "2:46", cover: forest, accent: "320", category: "Love", youtubeId: "VcZe8_RZO8c" },
  { title: "Belle", movie: "Beauty and the Beast", character: "Belle", year: 1991, duration: "5:08", cover: forest, accent: "330", category: "Princess", youtubeId: "ihJYZIY1qTI" },
  { title: "Gaston", movie: "Beauty and the Beast", character: "LeFou & Gaston", year: 1991, duration: "3:39", cover: forest, accent: "20", category: "Villain", youtubeId: "rgYmkguJSrA" },
  // Mulan
  { title: "Reflection", movie: "Mulan", character: "Mulan", year: 1998, duration: "2:30", cover: forest, accent: "150", category: "Princess", youtubeId: "lcvQKa_dN3M" },
  { title: "I'll Make a Man Out of You", movie: "Mulan", character: "Shang", year: 1998, duration: "3:22", cover: savanna, accent: "20", category: "Adventure", youtubeId: "v-_BVwRHwTs" },
  { title: "A Girl Worth Fighting For", movie: "Mulan", character: "Soldiers", year: 1998, duration: "2:31", cover: savanna, accent: "100", category: "Friendship", youtubeId: "C2r8Rd7s0CY" },
  // Moana
  { title: "How Far I'll Go", movie: "Moana", character: "Moana", year: 2016, duration: "2:43", cover: ocean, accent: "190", category: "Adventure", youtubeId: "cPAbx5kgCJo" },
  { title: "You're Welcome", movie: "Moana", character: "Maui", year: 2016, duration: "2:39", cover: ocean, accent: "100", category: "Friendship", youtubeId: "79DijItQXMM" },
  { title: "We Know the Way", movie: "Moana", character: "Lin-Manuel Miranda", year: 2016, duration: "1:32", cover: ocean, accent: "170", category: "Adventure", youtubeId: "PvL34cUbZiY" },
  { title: "Shiny", movie: "Moana", character: "Tamatoa", year: 2016, duration: "3:13", cover: ocean, accent: "120", category: "Villain", youtubeId: "_ujnuvKK29s" },
  // Encanto
  { title: "We Don't Talk About Bruno", movie: "Encanto", character: "Madrigals", year: 2021, duration: "3:36", cover: forest, accent: "290", category: "Friendship", youtubeId: "bvWRMAU6V-c" },
  { title: "Surface Pressure", movie: "Encanto", character: "Luisa", year: 2021, duration: "3:21", cover: forest, accent: "10", category: "Anthem", youtubeId: "tQwVKr8rCYw" },
  { title: "What Else Can I Do?", movie: "Encanto", character: "Isabela", year: 2021, duration: "2:53", cover: forest, accent: "120", category: "Anthem", youtubeId: "79DijItQXMM" },
  // 101 Dalmatians
  { title: "Cruella De Vil", movie: "101 Dalmatians", character: "Cruella", year: 1961, duration: "1:30", cover: toys, accent: "0", category: "Villain", youtubeId: "qf2onUbqAnY" },
  // Pinocchio
  { title: "When You Wish Upon a Star", movie: "Pinocchio", character: "Jiminy Cricket", year: 1940, duration: "3:18", cover: toys, accent: "250", category: "Love", youtubeId: "C0Ftzdkh1Sg" },
  { title: "I've Got No Strings", movie: "Pinocchio", character: "Pinocchio", year: 1940, duration: "2:35", cover: toys, accent: "60", category: "Friendship", youtubeId: "BWn12i4qmRE" },
  // Cinderella
  { title: "A Dream Is a Wish Your Heart Makes", movie: "Cinderella", character: "Cinderella", year: 1950, duration: "3:01", cover: forest, accent: "330", category: "Princess", youtubeId: "TLatcM0F0Yk" },
  { title: "Bibbidi-Bobbidi-Boo", movie: "Cinderella", character: "Fairy Godmother", year: 1950, duration: "1:51", cover: forest, accent: "340", category: "Princess", youtubeId: "GLPmTbpu3lw" },
  // Pocahontas
  { title: "Colors of the Wind", movie: "Pocahontas", character: "Pocahontas", year: 1995, duration: "3:31", cover: forest, accent: "130", category: "Adventure", youtubeId: "EOcZyTqcq8s" },
  { title: "Just Around the Riverbend", movie: "Pocahontas", character: "Pocahontas", year: 1995, duration: "2:25", cover: forest, accent: "140", category: "Adventure", youtubeId: "v8aTzRg7P6A" },
  // Coco
  { title: "Remember Me", movie: "Coco", character: "Miguel", year: 2017, duration: "2:35", cover: arabian, accent: "10", category: "Love", youtubeId: "sH5Smcfi6Z4" },
  { title: "Un Poco Loco", movie: "Coco", character: "Miguel & Héctor", year: 2017, duration: "1:53", cover: arabian, accent: "30", category: "Friendship", youtubeId: "eVHjucL_OpM" },
  // Hercules
  { title: "Go the Distance", movie: "Hercules", character: "Hercules", year: 1997, duration: "3:10", cover: savanna, accent: "50", category: "Anthem", youtubeId: "Y7KtNgSS6Iw" },
  { title: "Zero to Hero", movie: "Hercules", character: "Muses", year: 1997, duration: "2:18", cover: savanna, accent: "40", category: "Adventure", youtubeId: "wZGJ5FwfIhc" },
  // Hunchback
  { title: "Out There", movie: "The Hunchback of Notre Dame", character: "Quasimodo", year: 1996, duration: "4:00", cover: forest, accent: "200", category: "Anthem", youtubeId: "f6yWA8lEyOI" },
  // Princess and the Frog
  { title: "Almost There", movie: "The Princess and the Frog", character: "Tiana", year: 2009, duration: "2:58", cover: forest, accent: "80", category: "Princess", youtubeId: "yIIKpu-FvDg" },
  { title: "Friends on the Other Side", movie: "The Princess and the Frog", character: "Dr. Facilier", year: 2009, duration: "3:20", cover: forest, accent: "290", category: "Villain", youtubeId: "a-fA-8XbCK0" },
  // Sleeping Beauty
  { title: "Once Upon a Dream", movie: "Sleeping Beauty", character: "Aurora", year: 1959, duration: "2:48", cover: forest, accent: "320", category: "Love", youtubeId: "ZUE6dHy0LF0" },
  // Snow White
  { title: "Heigh-Ho", movie: "Snow White and the Seven Dwarfs", character: "Seven Dwarfs", year: 1937, duration: "2:43", cover: forest, accent: "60", category: "Friendship", youtubeId: "X2LTL8KgKv8" },
  { title: "Whistle While You Work", movie: "Snow White and the Seven Dwarfs", character: "Snow White", year: 1937, duration: "2:34", cover: forest, accent: "100", category: "Princess", youtubeId: "5kcCw3Xtk8I" },
  // Mary Poppins
  { title: "Supercalifragilisticexpialidocious", movie: "Mary Poppins", character: "Mary Poppins", year: 1964, duration: "2:00", cover: toys, accent: "180", category: "Friendship", youtubeId: "tRFHXMQP-QU" },
  { title: "A Spoonful of Sugar", movie: "Mary Poppins", character: "Mary Poppins", year: 1964, duration: "4:10", cover: toys, accent: "150", category: "Friendship", youtubeId: "84r0RmsYz3Q" },
  // Lilo & Stitch
  { title: "Hawaiian Roller Coaster Ride", movie: "Lilo & Stitch", character: "Mark Keali'i Ho'omalu", year: 2002, duration: "3:21", cover: ocean, accent: "150", category: "Adventure", youtubeId: "mMqZIwOcyto" },
  // Brave
  { title: "Touch the Sky", movie: "Brave", character: "Merida", year: 2012, duration: "3:18", cover: forest, accent: "30", category: "Adventure", youtubeId: "B2rBHzzWHzw" },
  // Up
  { title: "Married Life", movie: "Up", character: "Michael Giacchino", year: 2009, duration: "4:09", cover: toys, accent: "200", category: "Love", youtubeId: "F1tfIrnGT6Y" },
  // Nightmare Before Christmas
  { title: "This Is Halloween", movie: "The Nightmare Before Christmas", character: "Citizens of Halloween Town", year: 1993, duration: "3:16", cover: arabian, accent: "30", category: "Villain", youtubeId: "oQ4AHjYxQBM" },
];

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const songs: Song[] = raw.map((s, i) => ({
  ...s,
  id: String(i + 1),
  movieSlug: slugify(s.movie),
  previewUrl: preview(i),
}));

export const categories = ["All", "Princess", "Adventure", "Friendship", "Villain", "Love", "Anthem"] as const;

export const movies = Array.from(
  songs.reduce((map, s) => {
    if (!map.has(s.movieSlug)) {
      map.set(s.movieSlug, { slug: s.movieSlug, name: s.movie, cover: s.cover, accent: s.accent, year: s.year });
    }
    return map;
  }, new Map<string, { slug: string; name: string; cover: string; accent: string; year: number }>()).values(),
);

export const characters = Array.from(
  songs.reduce((map, s) => {
    if (!map.has(s.character)) {
      map.set(s.character, { name: s.character, movie: s.movie, movieSlug: s.movieSlug, cover: s.cover, accent: s.accent });
    }
    return map;
  }, new Map<string, { name: string; movie: string; movieSlug: string; cover: string; accent: string }>()).values(),
);
