import React from 'react'


export const Started = () => {

    

    const click = function simulateClick() {
        const btn = document.getElementById('menu');
        btn.click();
    }
    

    return (
        <div id='started'>
        <div>Welcome to our <b>book crawler</b> website, where you can embark on a literary adventure and explore the vast world of books. Whether you are a bookworm or a casual reader, we've got you covered with an extensive collection of books from various genres and authors. Our website is designed to provide you with an immersive experience that will take you on a journey through the pages of books and open up new worlds for you to explore. So, sit back, relax, and let our <b>B-RWALER</b> take you on a reading journey you won't forget!</div>
        <button  onClick={click}>Get started</button>
        </div>
    )
}
