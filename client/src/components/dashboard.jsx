import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    window.location.replace("https://www.amazon.com/");
    console.log("we are ready to go to amazon");
  }, []);
}
