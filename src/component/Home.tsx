import {useState} from 'react'
import '../styles/home.css'
import {Books} from './Books'
import {useQuery, useMutation} from '../../convex/_generated/api'

const Home = () => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const books = useQuery(api.queries.getBooks)
	const createBooks = useMutation(api.queries.createBooks)
	
	const handleSubmit = (e: React.FormEvent<HTMLFromElement>): void => {
		e.preventDefault()
		createBooks({title, author})
		.then(()=> {
			console.log('created')
			setTitle('')
			setAuthor('')
		})
		.catch(err => console.log(err))
	}

	return (
		<div className='main-container'>
			<h1>Book Collections</h1>
			<from onSubmit={handleSubmit}>
			<input 
			type='text'
			name='title'
			value='{title}'
			onChange={(e)=>setTitle(e.target.value)}
			placeholder='book title'
			/>
			<br/>
			<input 
			type='text'
			name='author'
			value='{author}'
			onChange={(e)=>setAuthor(e.target.value)}
			placeholder='book author'
			/>
			<br/>
			<input type='submit' />
			</form>
			{books ? <Books books={books} /> : 'Loading...'}
		</div>
	)
}

export default Home