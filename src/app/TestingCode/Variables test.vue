Const name = ref is een variabele

Meerdere inputs is dit bijv: export async function createLightnovel(name: string, price: number, description: string, genre: string)
Dit geeft vraagt om meerdere data.

Async function geeft iets terug


<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const cars = ref<{ bmw: string; mercedes: string; opel: string }[]>([])

cars()

const brand = "BMW";
const buildyear = 2020;
const electric = false;

console.log(brand, buildyear, electric);

function makeCar(brand, buildyear) {
  return brand + " from " + buildyear;//`${brand} from ${buildyear}`;
}

console.log(makeCar("BWM", 2018));
console.log(makeCar("Mercedes", 2023));

function standardCar() {
  return "Volkswagen Golf 1999";
}

console.log(standardCar());

function getCar() {
  return {
    brand: "Mercedes",
    buildyear: 2019,
    colour: "black"
  };
}

let car = getCar();
console.log(car.brand);
console.log(car.colour);

function calculateCarAge(brand, buildyear) {
  let age = 2025 - buildyear;
  let description = brand + " is " + age + " years old";

  return [age, description];
}

let [age, description] = calculateCarAge("BMW", 2020);
console.log("age:", age);
console.log("description:", description);
