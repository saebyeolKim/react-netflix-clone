import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './SearchPage.css'
import { useDebounce } from '../../hooks/useDebounce';

export default function SearchPage() {

    const navigate = useNavigate() // 검색 시 경로 이동시켜줌
    const [searchResults, setSearchResults] = useState([]);

    // useLocation() -> 현재 브라우저의 **URL 정보(location 객체)**를 가져오는 **훅(Hook)**입니다.
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const searchTerm = query.get("q")
    const debouncedSearchTerm = useDebounce(searchTerm, 500)

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchSearchMovie(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]); // searchTerm 이 변경될 때 마다 해당 useEffect 가 실해되게 하기 위해 넣음

    const fetchSearchMovie = async (debouncedSearchTerm) => {
        try {
            const request = await axios.get(
                `/search/multi?include_adult=false&query=${debouncedSearchTerm}`
            )
            setSearchResults(request.data.results);
        } catch (error) {
            console.log("error", error);
        }
    }

    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <section className='search-container'>
                {searchResults.map((movie) => {
                    if (movie.backdrop_path !== null && movie.media_type !== 'person') {
                        const movieImageUrl =
                        "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
                        return (
                            <div className='movie' key={movie.id}>
                                <div
                                    onClick={() => navigate(`/${movie.id}`)}
                                    className='movie__column-poster'
                                >
                                    <img
                                        src={movieImageUrl}
                                        alt='movie'
                                        className='movie__poster'
                                    />

                                </div>
                            </div>
                        )
                    }
                })}
            </section>
        ) : (
            <section className='no-results'>
                <div className='no-results__text'>
                    <p>
                        찾고자하는 검색어 "{debouncedSearchTerm}"에 맞는 영화가 없습니다.
                    </p>
                </div>
            </section>
        )
    }

    return renderSearchResults();
}
