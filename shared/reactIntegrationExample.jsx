/**
 * React Integration Example for FBLA Roleplay Database
 * 
 * This example shows how to integrate the roleplay database with your React frontend.
 * Copy these patterns into your existing React components.
 */

import React, { useState, useEffect } from 'react';
import { 
  getAllEvents, 
  getEventDetails, 
  addNewEvent, 
  addPromptToEvent,
  searchPrompts,
  getDatabaseStats
} from './roleplayDatabase.js';

// Example Component 1: Event Selector
export function EventSelector({ onEventSelect }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load all events when component mounts
    const loadEvents = async () => {
      try {
        const eventList = getAllEvents();
        setEvents(eventList);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadEvents();
  }, []);

  if (loading) return <div>Loading events...</div>;

  return (
    <div className="event-selector">
      <h2>Choose Your FBLA Roleplay Event</h2>
      <div className="events-grid">
        {events.map(event => (
          <div 
            key={event.id} 
            className="event-card"
            onClick={() => onEventSelect(event.id)}
          >
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <span className="prompt-count">{event.promptCount} prompts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Example Component 2: Prompt Practice Interface
export function PromptPractice({ eventId }) {
  const [eventDetails, setEventDetails] = useState(null);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [userResponse, setUserResponse] = useState('');

  useEffect(() => {
    if (eventId) {
      const details = getEventDetails(eventId);
      setEventDetails(details);
      setCurrentPromptIndex(0);
      setUserResponse('');
    }
  }, [eventId]);

  const handleNextPrompt = () => {
    if (eventDetails && currentPromptIndex < eventDetails.prompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
      setUserResponse('');
    }
  };

  const handlePreviousPrompt = () => {
    if (currentPromptIndex > 0) {
      setCurrentPromptIndex(currentPromptIndex - 1);
      setUserResponse('');
    }
  };

  if (!eventDetails) return <div>Select an event to start practicing</div>;

  const currentPrompt = eventDetails.prompts[currentPromptIndex];

  return (
    <div className="prompt-practice">
      <div className="event-header">
        <h2>{eventDetails.name}</h2>
        <p>Prompt {currentPromptIndex + 1} of {eventDetails.prompts.length}</p>
      </div>
      
      <div className="prompt-section">
        <h3>Scenario:</h3>
        <p className="prompt-text">{currentPrompt}</p>
      </div>
      
      <div className="response-section">
        <h3>Your Response:</h3>
        <textarea
          value={userResponse}
          onChange={(e) => setUserResponse(e.target.value)}
          placeholder="Type your response to this roleplay scenario..."
          rows={8}
          cols={80}
        />
      </div>
      
      <div className="navigation-buttons">
        <button 
          onClick={handlePreviousPrompt}
          disabled={currentPromptIndex === 0}
        >
          Previous
        </button>
        <button 
          onClick={handleNextPrompt}
          disabled={currentPromptIndex === eventDetails.prompts.length - 1}
        >
          Next
        </button>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ 
            width: `${((currentPromptIndex + 1) / eventDetails.prompts.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
}

// Example Component 3: Admin Interface (for adding content)
export function AdminInterface() {
  const [newEventName, setNewEventName] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('');
  const [newPrompt, setNewPrompt] = useState('');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setStats(getDatabaseStats());
  }, []);

  const handleAddEvent = () => {
    if (newEventName.trim()) {
      const eventId = newEventName.toLowerCase().replace(/\s+/g, '-');
      const success = addNewEvent(eventId, newEventName, newEventDescription);
      
      if (success) {
        alert('Event added successfully!');
        setNewEventName('');
        setNewEventDescription('');
        setStats(getDatabaseStats());
      } else {
        alert('Failed to add event. It may already exist.');
      }
    }
  };

  const handleAddPrompt = () => {
    if (selectedEventId && newPrompt.trim()) {
      const success = addPromptToEvent(selectedEventId, newPrompt);
      
      if (success) {
        alert('Prompt added successfully!');
        setNewPrompt('');
        setStats(getDatabaseStats());
      } else {
        alert('Failed to add prompt.');
      }
    }
  };

  return (
    <div className="admin-interface">
      <h2>FBLA Roleplay Database Admin</h2>
      
      {stats && (
        <div className="stats-section">
          <h3>Database Statistics</h3>
          <p>Total Events: {stats.totalEvents}</p>
          <p>Total Prompts: {stats.totalPrompts}</p>
          <p>Average Prompts per Event: {stats.averagePromptsPerEvent}</p>
        </div>
      )}
      
      <div className="add-event-section">
        <h3>Add New Event</h3>
        <input
          type="text"
          placeholder="Event Name"
          value={newEventName}
          onChange={(e) => setNewEventName(e.target.value)}
        />
        <textarea
          placeholder="Event Description"
          value={newEventDescription}
          onChange={(e) => setNewEventDescription(e.target.value)}
          rows={3}
        />
        <button onClick={handleAddEvent}>Add Event</button>
      </div>
      
      <div className="add-prompt-section">
        <h3>Add Prompt to Existing Event</h3>
        <select
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
        >
          <option value="">Select an event...</option>
          {stats?.eventNames.map(eventId => (
            <option key={eventId} value={eventId}>
              {eventId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </option>
          ))}
        </select>
        <textarea
          placeholder="New prompt text..."
          value={newPrompt}
          onChange={(e) => setNewPrompt(e.target.value)}
          rows={4}
        />
        <button onClick={handleAddPrompt}>Add Prompt</button>
      </div>
    </div>
  );
}

// Example Component 4: Search Interface
export function PromptSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const results = searchPrompts(searchTerm);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="prompt-search">
      <h2>Search Roleplay Prompts</h2>
      
      <div className="search-controls">
        <input
          type="text"
          placeholder="Search for keywords in prompts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      <div className="search-results">
        <p>{searchResults.length} results found</p>
        {searchResults.map((result, index) => (
          <div key={index} className="search-result">
            <h4>{result.eventName}</h4>
            <p>{result.prompt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Example: Complete App Integration
export function RoleplayApp() {
  const [currentView, setCurrentView] = useState('selector');
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleEventSelect = (eventId) => {
    setSelectedEventId(eventId);
    setCurrentView('practice');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'selector':
        return <EventSelector onEventSelect={handleEventSelect} />;
      case 'practice':
        return <PromptPractice eventId={selectedEventId} />;
      case 'admin':
        return <AdminInterface />;
      case 'search':
        return <PromptSearch />;
      default:
        return <EventSelector onEventSelect={handleEventSelect} />;
    }
  };

  return (
    <div className="roleplay-app">
      <nav className="app-nav">
        <button onClick={() => setCurrentView('selector')}>Events</button>
        <button onClick={() => setCurrentView('practice')}>Practice</button>
        <button onClick={() => setCurrentView('search')}>Search</button>
        <button onClick={() => setCurrentView('admin')}>Admin</button>
      </nav>
      
      <main className="app-content">
        {renderCurrentView()}
      </main>
    </div>
  );
}

// CSS Styles (add to your stylesheet)
const styles = `
.event-selector {
  padding: 20px;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.event-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.event-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.prompt-practice {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.prompt-text {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  font-style: italic;
  margin: 15px 0;
}

.response-section textarea {
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: Arial, sans-serif;
}

.navigation-buttons {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.navigation-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: #007bff;
  color: white;
  cursor: pointer;
}

.navigation-buttons button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #007bff;
  transition: width 0.3s ease;
}
`;

export default RoleplayApp;