import React, { useEffect, useState } from 'react'
import "./Nav.css"
import { useNavigate } from 'react-router-dom';

export default function Nav() {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    // 검색 시 경로 이동시켜줌
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("scroll", () => {
            console.log(window.scrollY)
            // 스크롤이 50을 넘었을 때 검은색으로 변경해준다. 그렇지 않으면 투명하게
            if (window.scrollY > 50) {
                setShow(true)
            } else {
                setShow(false)
            }
        })

        return () => {
            window.removeEventListener("scroll", () => {});
        }
    })

    // 검색어 입력 시
    const handleChange = (e) => {
        setSearchValue(e.target.value)
        navigate(`/search?q=${e.target.value}`)
    }

    return <nav className={`nav ${show && "nav__black"}`}>
        <img 
            alt='Netflix logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/960px-Netflix_2015_logo.svg.png?20190206123158'
            className='nav__logo'
            onClick={() => window.location.reload()}
        />

        <input 
            value={searchValue}
            onChange={handleChange}
            className='nav__input'
            type='text'
            placeholder='영화를 검색해주세요.'
        />


        <img 
            alt='User logged'
            src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
            className='nav__avatar'
        />
    </nav>
}
