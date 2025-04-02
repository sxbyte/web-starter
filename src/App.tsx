import { useData } from './lib/api'

export default () => {
  const [data] = useData('')

  return (
    <>
      {data}
    </>
  )
}
