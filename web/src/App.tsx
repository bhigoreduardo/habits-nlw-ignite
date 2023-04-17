import './styles/global.css'
import './lib/dayjs'

import { Header } from './components/Header'
import { SummaryTable } from './components/SummaryTable'

function App() {
  return (
    <main className="flex justify-center items-center w-screen h-screen bg-background">
      <section className="flex flex-col gap-16 w-full max-w-5xl px-6">
        <Header />
        <SummaryTable />
      </section>
    </main>
  )
}

export default App
