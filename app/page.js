"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Provider from "./provider";

export default function Home() {
  return (
    <div >
      <h1>Hello</h1>
      <Button>Submit</Button>
      <Provider></Provider>
    </div>
  );
}
