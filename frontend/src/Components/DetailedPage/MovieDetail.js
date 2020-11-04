import React, { useEffect, useState, useContext } from 'react';
import './movieDetail.css';
import axios from 'axios';
import { WatchlistContext } from '../Provider/Watchlistprovider';

export function MovieDetail(props) {
  const [movieDetail, setMovieDetail] = useState([[]]);
  const [watchlist, setWatchlist] = useContext(WatchlistContext);
  const url = `http://localhost:8080/about`;
  const imdbId = props.match.params.imdbID;
  const title = movieDetail.Title;
  const year = movieDetail.Year;
  const poster = movieDetail.Poster;

  const add = () => {
    setWatchlist(prevWatchlist => [...prevWatchlist, movieDetail]);
    console.log(movieDetail);
    const movie = {
      imdbId: imdbId,
      title: title,
      releaseYear: year,
      poster: poster,
    };
    axios.post('http://localhost:8080/watchlist/1', movie).catch(error => {
      console.log(error);
    });
  };

  useEffect(() => {
    axios
      .post('http://localhost:8080/about', imdbId, {
        headers: { 'Content-Type': 'text/plain' },
      })
      .then(response => {
        setMovieDetail(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [imdbId, url]);

  return (
    <div className='detail-container'>
      <div className='card-title'>
        <h2>
          {movieDetail.Title} ({movieDetail.Year})
        </h2>
      </div>
      <div className='poster-text-wrapper'>
        <div className='poster-box'>
          <img className='card-img' src={movieDetail?.Poster} alt='' />
        </div>
        <div className='text-box-detailed'>
          <div>
            <span>Runtime: </span>
            {movieDetail.Runtime}
          </div>
          <div>
            <span>Genre: </span>
            {movieDetail.Genre}
          </div>
          <div>
            <span>Rating: </span>
            {movieDetail.imdbRating}
          </div>
          <div>
            <span>Director: </span>
            {movieDetail.Director}
          </div>
          <div>
            <span>Actors: </span>
            {movieDetail.Actors}
          </div>
          <div>
            <span>Awards: </span>
            {movieDetail.Awards}
          </div>
          <div>
            <br></br>
            <span>Plot: </span>
            {movieDetail.Plot}
          </div>
          <button onClick={add} className='add-to-watchlist-button'>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
