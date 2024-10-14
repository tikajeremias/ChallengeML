import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SearchBox from './pages/SearchBox.tsx'
import SearchResults from './pages/SearchResults.tsx'
import ProductDetail from './pages/ProductDetail.tsx'
import QueryState from './components/QueryState.tsx'
import { queryStates } from './constants/constants.ts'

export default function App() {
  const data = queryStates
  return (
    <>
      <Router>
        <SearchBox />
        <Routes>
          <Route path='/' element={<QueryState title={data.QueryState.NotSearch.title} text={data.QueryState.NotSearch.text}/>} />
          <Route path='/items' element={<SearchResults />} />
          <Route path='/items/:id' element={<ProductDetail />} />
          <Route path="*" element={<QueryState title={data.QueryState.NotFound.title} text={data.QueryState.NotFound.title} />} />
        </Routes>
      </Router>
    </>
  )
}