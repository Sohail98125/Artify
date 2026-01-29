import axios from 'axios'
import './MainPage.css'
import { useEffect, useState } from 'react'
import Loader from '../loader/Loader'
const MainPage = () => {
    const [loadingSearch, setLoadingSearch] = useState(false)
    const [loadingHistory, setLoadingHistory] = useState(false)
    const [query, setQuery] = useState('')
    const [artworks, setArtworks] = useState([])
    const [history, setHistory] = useState([])

    const searchArtwork = async (e) => {
        e.preventDefault();
        if (!query) return;
        try {
            setLoadingSearch(true)
            const response = await axios(`${import.meta.env.VITE_API_URL}/api/search`, {
                params: { query }
            })
            setArtworks(response.data.artworks) || []
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingSearch(false)
        }
    }
    const historyArtworks = async () => {
        try {
            setLoadingHistory(true)
            const response = await axios(`${import.meta.env.VITE_API_URL}/api/saved`)
            setHistory(response.data.history)
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingHistory(false)
        }
    }
    useEffect(() => {
        historyArtworks()
    }, [])

    useEffect(() => {
  if (query.trim() === "") {
    setArtworks([]);
  }
}, [query]);


    return (
        <div className='main-page'>
            <section className='left-section'>
                <div className='new-chat'>
                    <button onClick={() => {
                        setArtworks([]);
                        setQuery('')
                    }}> New Chat +</button>
                </div>
                <hr />
                <div className='chat-history'>
                    <ol>
                         {loadingHistory && <Loader text="Loading HIstory..." />}
                        {history.map((item, index) => {
                            return (
                                <li key={index}>
                                    {item.query}
                                </li>
                            )
                        })}
                    </ol>

                </div>
                <hr />
                <div className='footer'>
                    <p> Made By Sohail</p>
                </div>
            </section>

            <section className='right-section'>
                <button>ArtIFY</button>
                <main className='main-content'>

                    {(!query && !loadingSearch && <h6>Search the art you’re thinking of.</h6>)}

                    {loadingSearch && <Loader text="Loading..." />}
                    <div className="art-grid">
                        {artworks.map((art) => (
                            <div key={art.id} className="art-card">
                                <img src={art.image} alt={art.title} />
                                <h4>{art.title}</h4>
                            </div>
                        ))}
                    </div>
                </main>
                <form className='form' onSubmit={searchArtwork}>
                    <input type="text" placeholder='Ask Anything' value={query} onChange={(e) => setQuery(e.target.value)} />
                    <button type='submit'>➤</button>
                </form>
                <p>This system uses a public API to generate AI-based art search results.</p>
            </section>
        </div>
    )
}

export default MainPage