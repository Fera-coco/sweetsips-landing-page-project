import tropicalParfait from "@/assets/tropical-parfait.jpg";
import greekParfait from "@/assets/greek-parfait.jpg";
import granolaParfait from "@/assets/granola-parfait.jpg";
import mixedParfait from "@/assets/mixed-parfait.jpg";
import mangoSmoothie from "@/assets/mango-smoothie.jpg";
import strawberrySmoothie from "@/assets/strawberry-smoothie.jpg";
import pineappleSmoothie from "@/assets/pineapple-smoothie.jpg";
import greenSmoothie from "@/assets/green-smoothie.jpg";

export interface MenuItem {
  name: string;
  description: string;
  image: string;
  price: number; // CFA
  tag?: string;
  customizable?: boolean;
}

export const TOPPING_PRICE = 500;
export const toppings = ["Fresh Mango", "Pineapple", "Banana", "Strawberries", "Blueberries", "Granola", "Honey Drizzle", "Mixed Berries"];

export const parfaits: MenuItem[] = [
  { name: "Plain Yogurt Parfait", description: "Creamy Greek yogurt base. Build it your way with toppings.", image: greekParfait, price: 1000, customizable: true, tag: "Build your own" },
  { name: "Tropical Fruit Parfait", description: "Greek yogurt layered with fresh mango, pineapple, banana and crunchy granola.", image: tropicalParfait, price: 2000, tag: "Best seller" },
  { name: "Greek Yogurt Fruit Parfait", description: "Creamy Greek yogurt with mixed berries, honey drizzle and granola.", image: greekParfait, price: 1800 },
  { name: "Granola & Berry Parfait", description: "Crunchy granola with fresh strawberries, blueberries and yogurt.", image: granolaParfait, price: 1500 },
  { name: "Mixed Fruits Deluxe Parfait", description: "An abundant mix of fresh fruits with yogurt and granola layers.", image: mixedParfait, price: 2000 },
];

export const smoothies: MenuItem[] = [
  { name: "Mango Burst", description: "Golden, tropical and packed with fresh mango.", image: mangoSmoothie, price: 1800, tag: "Fan favourite" },
  { name: "Strawberry Banana", description: "Sweet strawberries blended with creamy banana.", image: strawberrySmoothie, price: 1500 },
  { name: "Pineapple Paradise", description: "Bright, fresh pineapple with a hint of mint.", image: pineappleSmoothie, price: 1600 },
  { name: "Watermelon Cucumber Blend", description: "Light, hydrating and cool on a hot Cotonou day.", image: greenSmoothie, price: 1400 },
];

export const cfa = (n: number) => `${n.toLocaleString("en-US")} CFA`;
