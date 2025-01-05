// Initialize saved notes from localStorage or empty array if none exists
let savedNotes = JSON.parse(localStorage.getItem('savedNotes') || '[]');
let isPlaying = false;
let playingInterval;

// Display saved notes on page load
//displaySavedNotes();

// E minor
const frequencies = {
    'E': 329.63,  // Root note
    'F#': 369.99, // Second
    'G': 392.00,  // Minor third
    'A': 440.00,  // Fourth
    'B': 493.88,  // Fifth
    'C': 523.25,  // Minor sixth
    'D': 587.33,  // Minor seventh
    'E2': 659.26  // Octave
};

const eminorChords = {
    // Basic triads
    'Em': ['E', 'G', 'B'],         // i (tonic)
    'F#dim': ['F#', 'A', 'C'],     // ii° (diminished)
    'G': ['G', 'B', 'D'],          // III (major)
    'Am': ['A', 'C', 'E'],         // iv (minor)
    'Bm': ['B', 'D', 'F#'],        // v (minor)
    'C': ['C', 'E', 'G'],          // VI (major)
    'D': ['D', 'F#', 'A'],         // VII (major)
};

// const rhythmPattern = [0.8, 0.4, 0.6, 1.0, 0.5, 0.3, 0.7, 1.2];

// Create a single shared AudioContext at the global level
let sharedAudioContext = null;

function getAudioContext() {
    if (!sharedAudioContext) {
        sharedAudioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return sharedAudioContext;
}

function playChord(chordName) {
    const chord = eminorChords[chordName];
    if (!chord) return;
    chord.forEach(note => {
        playNote(note, true); // true indicates it's part of a chord
    });
}

export function playNote(note, isChord, duration = 0.5) {
    const audioContext = getAudioContext();

    // Resume the context if it's suspended
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Save the note
    // if (!isPlaying && !isChord) {
    //     saveNote(note);
    // }

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequencies[note], audioContext.currentTime);

    // Set different volumes for melody notes and chord notes
    const initialGain = isChord ? 0.15 : 0.5; // Reduced volume for chord notes
    gainNode.gain.setValueAtTime(initialGain, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);

    // Clean up
    oscillator.onended = () => {
        oscillator.disconnect();
        gainNode.disconnect();
    };
}

// Only the relevant JavaScript functions need to change:

export function saveNote(note) {
    // Add new note to the end of the array
    savedNotes.push(note);
    
    // Keep only the last 5 notes by removing from the beginning if needed
    if (savedNotes.length > 5) {
        savedNotes = savedNotes.slice(-5);
    }
    
    // Save to localStorage
    localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
    
    // Update display
    displaySavedNotes();
}

export function displaySavedNotes() {
    const container = document.getElementById('savedSequence');
    container.innerHTML = '';
    
    // Fill empty slots with placeholder at the beginning if less than 5 notes
    const remainingSlots = 5 - savedNotes.length;
    for (let i = 0; i < remainingSlots; i++) {
        const emptySlot = document.createElement('div');
        emptySlot.className = 'saved-note';
        emptySlot.textContent = '-';
        container.appendChild(emptySlot);
    }

    // Display saved notes after the empty slots
    savedNotes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'saved-note';
        noteElement.textContent = note;
        container.appendChild(noteElement);
    });
}


export function clearSavedNotes() {
    savedNotes = [];
    localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
    displaySavedNotes();
}

export function playSequence() {
    const button = document.querySelector('.play-button');
    
    if (isPlaying) {
        // Stop playing
        clearInterval(playingInterval);
        isPlaying = false;
        button.textContent = 'Play Sequence';
        button.style.backgroundColor = '#4CAF50';

        // Optionally suspend the audio context when stopping
        if (sharedAudioContext) {
            sharedAudioContext.suspend();
        }
        return;
    }

    // Don't start if there are no notes
    if (savedNotes.length === 0) {
        alert('No notes to play! Please add some notes first.');
        return;
    }

    // Start playing
    isPlaying = true;
    button.textContent = 'Stop Sequence';
    button.style.backgroundColor = '#ff6b6b';

    // Generate random jazz-inspired durations
    function generateJazzDurations(count) {
        const durations = [];
        for (let i = 0; i < count; i++) {
            const swing = Math.random() > 0.8 ? 0.96 : 0.64; // Swing feel (60-40% ratio)
            const base = Math.random() * 0.64 + 0.64; // Base duration between 0.4s and 0.8s
            durations.push(base * swing); // Apply swing factor
        }
        return durations;
    }

    const rhythmPattern = generateJazzDurations(savedNotes.length); // Random jazz durations


    let currentIndex = 0;
    const availableChords = Object.keys(eminorChords); // Extract keys from eminorChords

    async function playNotesWithRhythm() {
        if (!isPlaying) return;

        const duration = rhythmPattern[Math.floor(Math.random() * rhythmPattern.length)];
        
        // Play the melody note
        playNote(savedNotes[currentIndex], false, duration);
        
        // Play a random chord with reduced volume
        const randomChordName = availableChords[Math.floor(Math.random() * availableChords.length)];
        const chordNotes = eminorChords[randomChordName];
        chordNotes.forEach(note => {
            playNote(note, true, duration);
        });
        
        await new Promise(resolve => setTimeout(resolve, duration * 1000));
        
        currentIndex = (currentIndex + 1) % savedNotes.length;
        
        if (isPlaying) {
            playNotesWithRhythm();
        }
    }


    // Start the sequence
    playNotesWithRhythm();
}