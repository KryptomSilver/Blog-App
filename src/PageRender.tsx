import React from "react";
import { useParams } from "react-router";
import { NotFound } from "./components/NotFound";
import { IParams } from "./interfaces/interfaces";

const generatePage = (name: string) => {
  const component = () => require(`./pages/${name}`).default

  try {
    return React.createElement(component())
  } catch (err) {
    return <NotFound />;
  }
}

const PageRender = () => {
  const params = useParams()
  console.log(params)
  const { page, slug }: IParams = useParams()

  let name = '';

  if(page){
    name = slug ? `${page}/[slug]` : `${page}`
  }

  return generatePage(name)
}

export default PageRender