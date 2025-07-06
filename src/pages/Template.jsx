import { useEffect, useState } from "react"
import { GetMarkdown } from "../utils/pages"

function Template() {
  const [content, setContent] = useState("")

  const url = window.location.href
  useEffect(() => {
    GetMarkdown(url).then(text => setContent(text))
  }, [url])

  return (
    <div className="w-full h-fit bg-white bg-opacity-15 rounded-sm shadow-xl px-4 pt-2 pb-4">
      {content}
    </div>
  )
  
}

export default Template