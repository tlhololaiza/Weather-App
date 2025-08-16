import './App.css'
import SearchBar from './components/SearchBar/SearchBar'

function App() {
  
  return (
    <>
      
          <h1>City Search</h1>
          <p>Enter a city name to search for weather information.</p>
        <main className="app-main">
          <SearchBar onSearch={(city) => console.log(`Searching for: ${city}`)} loading={false} />
        </main>
      

    </>
  )
}

export default App
