import React, { useState } from 'react';
import DynamicForm from '../components/DynamicForm';
import Navbar from '../components/Navbar';

const MovieRequestPage = () => {
    const [submittedData, setSubmittedData] = useState(null);

    const formFields = [
        { name: 'title', label: 'Movie Title', type: 'text', placeholder: 'Enter movie name' },
        {
            name: 'genre', label: 'Genre', type: 'select', options: [
                { value: 'action', label: 'Action' },
                { value: 'comedy', label: 'Comedy' },
                { value: 'drama', label: 'Drama' },
                { value: 'horror', label: 'Horror' },
                { value: 'scifi', label: 'Sci-Fi' }
            ]
        },
        { name: 'releaseYear', label: 'Release Year', type: 'number', placeholder: 'e.g. 2024' },
        { name: 'reason', label: 'Why do you want this movie?', type: 'textarea' }
    ];

    const handleFormSubmit = (data) => {
        console.log("Form Submitted:", data);
        setSubmittedData(data);
        alert("Request Submitted!");
    };

    return (
        <div style={{ backgroundColor: '#111', minHeight: '100vh', color: 'white' }}>
            <Navbar />
            <div style={{ paddingTop: '100px', maxWidth: '600px', margin: '0 auto', padding: '100px 20px 20px' }}>
                <h1 style={{ marginBottom: '30px' }}>Request a Movie</h1>
                <div style={{ backgroundColor: '#222', padding: '20px', borderRadius: '8px' }}>
                    <DynamicForm
                        fields={formFields}
                        onSubmit={handleFormSubmit}
                        submitLabel="Request Movie"
                    />
                </div>

                {submittedData && (
                    <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #444', borderRadius: '8px' }}>
                        <h3>Last Request:</h3>
                        <pre>{JSON.stringify(submittedData, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieRequestPage;
