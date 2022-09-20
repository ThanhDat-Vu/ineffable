import Layout from "../components/Layout";
import { useLoaderData } from "react-router-dom";

export default function Recipe() {
  const data = useLoaderData();
  console.log(data);
  return <Layout>Recipe</Layout>;
}
