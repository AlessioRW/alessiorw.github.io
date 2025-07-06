import IMG_usagi from "../pages/markdown/images/usagi.webp"

import HomeMd from "../pages/markdown/home.md"
import BlogMd from "../pages/markdown/blog.md"
import PortfolioMd from "../pages/markdown/portfolio.md"

import BlogGolangInterfaces from "../pages/markdown/blog/golang_interfaces.md"


import parse from 'html-react-parser';
import Showdown from "showdown"
const converter = new Showdown.Converter()

// map url routes to markdown files
export const pageMap = {
  "": HomeMd,
  "blog": BlogMd,
  "portfolio": PortfolioMd,

  "blog/golang-interfaces": BlogGolangInterfaces
}

// map markdown image palceholders to image files
export const imagePlaceholder = "§"
const ImageMap = {
  "usagi": IMG_usagi
}


export function InsertImages(html) {

  // let line = text.text
  let buildHtml = ""
  let reading = false
  let key = ""
  html.split("").forEach(letter => {
    if (letter === imagePlaceholder) {
      if (!reading) {
        reading = true
        return
      } else {
        reading = false
        buildHtml += ImageMap[key]
        key = ""
        return
      }
    }
    if (reading) {
      key += letter
    } else {
      buildHtml += letter
    }
  });

  return buildHtml
}

export function GetFile(title) {
  let page = pageMap[title]
  if (!page) {
    page = pageMap[""]
  }

  return page
}

export async function GetMarkdown(url) {
  const title = GetPage(url)
  const file = GetFile(title)
  const fileRes = await fetch(file)
  const text = await fileRes.text()
  let html = converter.makeHtml(text);

  // place image into html
  html = InsertImages(html)
  console.log(html)


  return parse(html)
}

export function GetPage(url) {
  const splitUrl = url.split("/")
  let page = ""
  if (url.includes("/blog/")) { // page is a blog post
    page = splitUrl[3] + "/" + splitUrl[4]
  } else {
    page = url.split("/")[3]
  }
  return page
}