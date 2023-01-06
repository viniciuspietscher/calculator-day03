import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Comment() {
  const router = useRouter()
  const slug = (router.query.slug as string[]) || []
  const operations = ["add", "subtract", "multiply", "divide"]

  useEffect(() => {
    if (slug[0] && !operations.includes(slug[0])) {
      router.push("/404")
    }
    if (slug[1] && isNaN(Number(slug[1]))) {
      router.push("/404")
    }
    if (slug[2] && isNaN(Number(slug[2]))) {
      router.push("/404")
    }
  }, [router.query.slug])

  return (
    <>
      <h1>Slug: {slug.join("/")}</h1>
    </>
  )
}
