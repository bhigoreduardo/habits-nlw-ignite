import './styles/global.css'

import { Header } from './components/Header'

function App() {
  return (
    <main className="flex justify-center items-center w-screen h-screen bg-background">
      <section className="flex flex-col gap-16 w-full max-w-5xl px-6">
        <Header />
      </section>
    </main>
  )
}

export default App
