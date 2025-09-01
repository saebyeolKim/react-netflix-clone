import React, { useEffect, useState } from 'react'
import "./Nav.css"

export default function Nav() {
    const [show, setShow] = useState(false);

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



    return <nav className={`nav ${show && "nav__black"}`}>
        <img 
            alt='Netflix logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/960px-Netflix_2015_logo.svg.png?20190206123158'
            className='nav__logo'
            onClick={() => window.location.reload()}
        />
        <img 
            alt='User logged'
            src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
            className='nav__avatar'
        />
    </nav>
}
