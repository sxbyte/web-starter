import { useData } from './lib/api'

function App() {
  const [data] = useData('')

  return (
    <>
      {data}
    </>
  )
}

export default App
