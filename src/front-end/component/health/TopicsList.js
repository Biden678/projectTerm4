import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TopicsList = ({ onSelectTopic }) => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axios.get('http://localhost:9999/api/health/question-topic');
                setTopics(response.data);
            } catch (error) {
                console.error('Error fetching topics:', error);
            }
        };

        fetchTopics();
    }, []);

    const handleSelectTopic = (topicId) => {
        onSelectTopic(topicId);
    };


    

    return (
        <div style={styles.topicsContainer}>
            <br/>
            <h2 style={styles.heading}>Check for vitamin deficiencies</h2>
            <div style={styles.topicsGrid}>
                {topics.map(topic => (
                    <div key={topic.id} style={styles.topicCardWrapper}>
                        <div style={styles.topicCard}>
                            <div style={styles.cardBody}>
                                <i className="fa fa-medkit fa-3x" style={styles.icon}></i>
                                <h4 style={styles.cardTitle}>{topic.question_topic}</h4>
                                <Link to={`/question/${topic.id}`} style={styles.button}>Select</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    topicsContainer: {
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        textAlign: 'center',
    },
    heading: {
        marginBottom: '2rem',
        fontSize: '2rem',
        color: '#81c408',
        fontWeight: 700,
    },
    topicsGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    topicCardWrapper: {
        flex: '1 1 30%',
        maxWidth: '30%',
        margin: '1rem',
    },
    topicCard: {
        border: '1px solid #e3e3e3',
        borderRadius: '10px',
        transition: 'transform 0.3s ease, boxShadow 0.3s ease',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    },
    topicCardHovered: {
        transform: 'translateY(-10px)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    },
    cardBody: {
        padding: '1.5rem',
    },
    icon: {
        color: '#81c408',
    },
    cardTitle: {
        fontSize: '1.5rem',
        color: '#333',
    },
    button: {
        display: 'inline-block',
        backgroundColor: '#81c408',
        color: '#fff',
        fontSize: '1rem',
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        transition: 'backgroundColor 0.3s ease',
        textDecoration: 'none',
    },
    buttonHovered: {
        backgroundColor: '#0056b3',
    },
};

export default TopicsList;