import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function SearchPage() {

    const [searchResults, setSearchResults] = useState([]);

    // useLocation() -> 현재 브라우저의 **URL 정보(location 객체)**를 가져오는 **훅(Hook)**입니다.
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const searchTerm = query.get("q")

    useEffect(() => {
        if (searchTerm) {
            fetchSearchMovie();
        }
    }, [searchTerm]); // searchTerm 이 변경될 때 마다 해당 useEffect 가 실해되게 하기 위해 넣음

    const fetchSearchMovie = async (searchTerm) => {
        try {
            const request = await axios.get(
                `/search/multi?include_adult=false&query=${searchTerm}`
            )
            setSearchResults(request.data.results);
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <div>index</div>
    )
}
