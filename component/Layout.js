import React, {useState, useEffect, cloneElement} from 'react';
import Header from './Header'



const Layout = ({children}) => {

    return (
        <>
            <main>
                <Header />
                {children}
            </main>
        </>
    )
}

export default Layout
