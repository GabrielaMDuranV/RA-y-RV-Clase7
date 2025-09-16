import React, { useState, useEffect } from 'react';
import { dogService } from '../service/sketchfabService';

const ModeloLista: React.FC = () => {
  const [dogImage, setDogImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [multipleDogs, setMultipleDogs] = useState<string[]>([]);
  const [showMultiple, setShowMultiple] = useState<boolean>(false);

  // Fetch single random dog image
  const fetchRandomDog = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await dogService.getRandomDogImage();
      setDogImage(response.message);
      setShowMultiple(false);
    } catch (err) {
      setError('Failed to fetch dog image. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch multiple random dog images
  const fetchMultipleDogs = async () => {
    try {
      setLoading(true);
      setError('');
      const responses = await dogService.getMultipleRandomDogImages(9);
      setMultipleDogs(responses);
      setShowMultiple(true);
    } catch (err) {
      setError('Failed to fetch multiple dog images. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial dog image on component mount
  useEffect(() => {
    fetchRandomDog();
  }, []);

  return (
    <div className="modelo-lista-container">
      <h1>Random Dog Images</h1>
      
      <div className="button-group">
        <button 
          onClick={fetchRandomDog} 
          disabled={loading}
          className="action-button"
        >
          {loading ? 'Loading...' : 'Get Random Dog'}
        </button>
        
        <button 
          onClick={fetchMultipleDogs} 
          disabled={loading}
          className="action-button"
        >
          {loading ? 'Loading...' : 'Get 9 Dogs'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading">Loading dog images...</div>
      ) : (
        <div className="dog-images-container">
          {showMultiple ? (
            <div className="multiple-dogs-grid">
              {multipleDogs.map((imageUrl, index) => (
                <div key={index} className="dog-image-item">
                  <img 
                    src={imageUrl} 
                    alt={`Random dog ${index + 1}`}
                    className="dog-image"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/150?text=Image+Error';
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="single-dog-container">
              {dogImage && (
                <img 
                  src={dogImage} 
                  alt="Random dog" 
                  className="dog-image single"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/500?text=Image+Error';
                  }}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModeloLista;