import { useState, useEffect } from "react";

export const useDebounce = (value, delay) => {

    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
      
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, delay)
    
        // 다시 호출될 때 원래있던 setTimeout 을 없애주기 위해
        return () => {
            clearTimeout(handler)
        }

    }, [value, delay]) // value 혹은 delay 가 바뀌면 useEffect 내부에 있는 것을 다시 호출

    return debounceValue
    
}