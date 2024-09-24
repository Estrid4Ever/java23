import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ReviewForm() {
  const [username, setUsername] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          feedback,
          isAnonymous,
        })
      });
      
      const data = await response.json()
      console.log('Review submitted:', data);

      navigate('/');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <main className="review__container">
      <article className="review__input">
        <h1>Tyck till!</h1>
        <p>Berätta vad du tycker</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Användarnamn:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isAnonymous}
            />
          </div>
          <div>
            <label htmlFor="anonymous">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              Vill du vara anonym?
            </label>
          </div>
          <div>
            <label htmlFor="feedback">Feedback:</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="button button--cta">Skicka</button>
        </form>
        <Link to="/" className="button">Tillbaka</Link>
      </article>
    </main>
  );
}

export default ReviewForm;