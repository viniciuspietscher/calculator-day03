import Home from "./index"

interface Operation {
  operation: string
  one: number
  two: number
}

export default function Comment({ slug, result }) {
  return <>{<Home op={slug} res={result} />}</>
}

export async function getServerSideProps(context) {
  const { slug, res } = context.query

  const operations = ["add", "subtract", "multiply", "divide"]

  let redirect = false

  if (!operations.includes(slug[0])) {
    redirect = true
  }
  if (isNaN(Number(slug[1]))) {
    redirect = true
  }
  if (isNaN(Number(slug[2]))) {
    redirect = true
  }
  if (slug[3]) {
    redirect = true
  }
  if (redirect) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {},
    }
  }
  let result = res || ""
  return {
    props: { slug, result },
  }
}
