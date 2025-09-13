import React, { useEffect } from 'react'

const useOnClickOutside = (ref, hadler) => {

    useEffect(() => {
        const listener = (event) => {
            console.log('ref', ref.current)
            // 현재 모달을 클릭하고 있으면 return
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            // 현재 모달 외 바깥을 클릭하고 있으면 모달 닫기
            hadler();
        };
        document.addEventListener("mousedown", listener)
        document.addEventListener("touchstart", listener)
        // unMount 되었을 때 clear 하는 부분을 return 에 넣어주면 된다.
        return () => {
            document.removeEventListener("mousedown", listener)
            document.removeEventListener("touchstart", listener)
        }
    }, [])
    
}

export default useOnClickOutside