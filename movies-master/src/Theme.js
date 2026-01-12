import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'react-bootstrap';

function Theme() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <>
            <h1 className="text-center mb-5">
                Using Bootstrap's built-in dark mode
            </h1>
            <Container
                className={`d-flex flex-column justify-content-center 
        align-items-center ${isDarkMode ?
                        'bg-dark text-light' : 'bg-light'}`}
                style={{ minHeight: '70vh' }}
            >
                <h1>{isDarkMode ? 'Dark Theme' : 'Light Theme'}</h1>
                <Button variant="primary" onClick={toggleDarkMode}>
                    Toggle Theme
                </Button>
            </Container>
        </>
    );
}

export default Theme;