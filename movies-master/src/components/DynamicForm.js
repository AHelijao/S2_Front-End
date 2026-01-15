import React, { useState } from 'react';

const DynamicForm = ({ fields, onSubmit, submitLabel = "Submit" }) => {
    // Initialize state with empty strings for all fields
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    );

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="dynamic-form">
            {fields.map((field) => (
                <div key={field.name} className="form-group">
                    <label htmlFor={field.name} style={{ display: 'block', color: 'white', marginBottom: '5px' }}>
                        {field.label}
                    </label>

                    {field.type === 'select' ? (
                        <select
                            id={field.name}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
                        >
                            <option value="">Select an option</option>
                            {field.options && field.options.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    ) : field.type === 'textarea' ? (
                        <textarea
                            id={field.name}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            rows={4}
                            style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
                        />
                    ) : (
                        <input
                            type={field.type || 'text'}
                            id={field.name}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name]}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
                        />
                    )}
                </div>
            ))}
            <button
                type="submit"
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#e50914',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
            >
                {submitLabel}
            </button>
        </form>
    );
};

export default DynamicForm;
