        // Initialize saved notes from localStorage or empty array if none exists
        let savedNotes = JSON.parse(localStorage.getItem('savedNotes') || '[]');
        let isPlaying = false;
        let playingInterval;
        let currentKey = 'eMinor';
        let frequencies = {};
        let chords = {};
        let bgmPlaying = false;

        // Separate audio contexts for notes and chords
        let noteAudioContext = null;
        let chordAudioContext = null;
        let bgmAudioContext = null;

        const musicalScales = {
            eMinor: {
                frequencies: {
                    'E': 329.63,  // Root note
                    'F#': 369.99, // Second
                    'G': 392.00,  // Minor third
                    'A': 440.00,  // Fourth
                    'B': 493.88,  // Fifth
                    'C': 523.25,  // Minor sixth
                    'D': 587.33,  // Minor seventh
                    'E2': 659.26  // Octave
                },
                chords: {
                    'Em': ['E', 'G', 'B'],         // i (tonic)
                    'F#dim': ['F#', 'A', 'C'],     // ii° (diminished)
                    'G': ['G', 'B', 'D'],          // III (major)
                    'Am': ['A', 'C', 'E'],         // iv (minor)
                    'Bm': ['B', 'D', 'F#'],        // v (minor)
                    'C': ['C', 'E', 'G'],          // VI (major)
                    'D': ['D', 'F#', 'A'],         // VII (major)
                    'Em2': ['E', 'G', 'B']          // i (tonic)
                }
            },

            gMajor: {
                frequencies: {
                    'G': 392.00,   // Root note
                    'A': 440.00,   // Second
                    'B': 493.88,   // Third
                    'C': 523.25,   // Fourth
                    'D': 587.33,   // Fifth
                    'E': 659.26,   // Sixth
                    'F#': 739.99,  // Seventh
                    'G2': 783.99   // Octave
                },
                chords: {
                    'G': ['G', 'B', 'D'],          // I (tonic)
                    'Am': ['A', 'C', 'E'],         // ii (minor)
                    'Bm': ['B', 'D', 'F#'],        // iii (minor)
                    'C': ['C', 'E', 'G'],          // IV (major)
                    'D': ['D', 'F#', 'A'],         // V (major)
                    'Em': ['E', 'G', 'B'],         // vi (minor)
                    'F#dim': ['F#', 'A', 'C'],     // vii° (diminished)
                    'G2': ['G', 'B', 'D']           // I (tonic)
                }
            },

            dMajor: {
                frequencies: {
                    'D': 587.33,   // Root note
                    'E': 659.26,   // Second
                    'F#': 739.99,  // Third
                    'G': 783.99,   // Fourth
                    'A': 880.00,   // Fifth
                    'B': 987.77,   // Sixth
                    'C#': 1108.73, // Seventh
                    'D2': 1174.66  // Octave
                },
                chords: {
                    'D': ['D', 'F#', 'A'],         // I (tonic)
                    'Em': ['E', 'G', 'B'],         // ii (minor)
                    'F#m': ['F#', 'A', 'C#'],      // iii (minor)
                    'G': ['G', 'B', 'D'],          // IV (major)
                    'A': ['A', 'C#', 'E'],         // V (major)
                    'Bm': ['B', 'D', 'F#'],        // vi (minor)
                    'C#dim': ['C#', 'E', 'G'],     // vii° (diminished)
                    'D2': ['D', 'F#', 'A']          // I (tonic)
                }
            },

            bMajor: {
                frequencies: {
                    'B': 493.88,   // Root note
                    'C#': 554.37,  // Second
                    'D#': 622.25,  // Third
                    'E': 659.26,   // Fourth
                    'F#': 739.99,  // Fifth
                    'G#': 830.61,  // Sixth
                    'A#': 932.33,  // Seventh
                    'B2': 987.77   // Octave
                },
                chords: {
                    'B': ['B', 'D#', 'F#'],        // I (tonic)
                    'C#m': ['C#', 'E', 'G#'],      // ii (minor)
                    'D#m': ['D#', 'F#', 'A#'],     // iii (minor)
                    'E': ['E', 'G#', 'B'],         // IV (major)
                    'F#': ['F#', 'A#', 'C#'],      // V (major)
                    'G#m': ['G#', 'B', 'D#'],      // vi (minor)
                    'A#dim': ['A#', 'C#', 'E'],    // vii° (diminished)
                    'B2': ['B', 'D#', 'F#']         // I (tonic)
                }
            },

            aMinor: {
                frequencies: {
                    'A': 440.00,   // Root note
                    'B': 493.88,   // Second
                    'C': 523.25,   // Minor third
                    'D': 587.33,   // Fourth
                    'E': 659.26,   // Fifth
                    'F': 698.46,   // Minor sixth
                    'G': 783.99,   // Minor seventh
                    'A2': 880.00   // Octave
                },
                chords: {
                    'Am': ['A', 'C', 'E'],         // i (tonic)
                    'Bdim': ['B', 'D', 'F'],       // ii° (diminished)
                    'C': ['C', 'E', 'G'],          // III (major)
                    'Dm': ['D', 'F', 'A'],         // iv (minor)
                    'Em': ['E', 'G', 'B'],         // v (minor)
                    'F': ['F', 'A', 'C'],          // VI (major)
                    'G': ['G', 'B', 'D'],          // VII (major)
                    'Am2': ['A', 'C', 'E']          // i (tonic)
                }
            }
        };

        // Create a single shared AudioContext at the global level
       function getNoteAudioContext() {
            if (!noteAudioContext) {
                noteAudioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            return noteAudioContext;
        }

        function getChordAudioContext() {
            if (!chordAudioContext) {
                chordAudioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            return chordAudioContext;
        }

        function getBgmAudioContext() {
            if (!bgmAudioContext) {
                bgmAudioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            return bgmAudioContext;
        }

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

        export function changeKey(newKey) {
            // Update current key
            currentKey = newKey;

            // Update the display text
            const displayText = newKey.replace(/([A-Z])/g, ' $1').trim()
                                     .replace('Minor', ' Minor')
                                     .replace('Major', ' Major');
           // document.getElementById('currentKeyDisplay').textContent = displayText;

            // Update button styles
            document.querySelectorAll('.key-button').forEach(button => {
                if (button.textContent.toLowerCase().includes(newKey.toLowerCase())) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });

            // Get and verify the frequencies and chords for the new key
            frequencies = getFrequenciesForKey(currentKey);
            chords = getChordsForKey(currentKey);
        }


        // Call changeKey with default key on page load
        document.addEventListener('DOMContentLoaded', () => {
            changeKey('eMinor');
        });

        function getRandomKey() {
            const keys = Object.keys(musicalScales);
            return keys[Math.floor(Math.random() * keys.length)];
        }

        function getFrequenciesForKey(key) {
            return musicalScales[key].frequencies;
        }

        function getChordsForKey(key) {
            return musicalScales[key].chords;
        }

        export function playNote(order, duration = 0.5, audioContext=getNoteAudioContext(), initialGain=0.5) {

            if (typeof order !== 'number' || isNaN(order)) {
              console.error('Invalid order parameter:', order);
              return;
            }

            if (audioContext.state === 'suspended') {
              audioContext.resume().catch((err) => console.error('Failed to resume audio context:', err));
            }

            const currentFrequencies = getFrequenciesForKey(currentKey) || {};
            const notes = Object.keys(currentFrequencies);

            if (order < 0 || order >= notes.length) {
              console.error('Order out of bounds:', order, 'notes length:', notes.length);
              return;
            }

            const note = notes[order];
            const frequency = currentFrequencies[note];

            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            if (!isPlaying) {
              saveNote(order);
            }

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

            // const initialGain = 0.5;
            gainNode.gain.setValueAtTime(initialGain, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.start();
            oscillator.stop(audioContext.currentTime + duration);

            oscillator.onended = () => {
              oscillator.disconnect();
              gainNode.disconnect();
            };
          }


        function playChords(noteNames, duration = 0.3) {
            const audioContext = getChordAudioContext();

            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            // Get frequencies for current key
            const currentFrequencies = getFrequenciesForKey(currentKey);

            noteNames.forEach((noteName, index) => {
                // Check if the note exists in current key
                if (currentFrequencies[noteName]) {
                    let frequency = currentFrequencies[noteName];
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();

                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

                    // Lower volume for chord notes
                    const initialGain = 0.05;
                    gainNode.gain.setValueAtTime(initialGain, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);

                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + duration);

                    oscillator.onended = () => {
                        oscillator.disconnect();
                        gainNode.disconnect();
                    };
                } else {
                    console.warn(`Note ${noteName} not found in key ${currentKey}`);
                }
            });
        }

        let lastSavedNote = null;
        let lastSaveTime = 0;

        export function saveNote(order) {
            const now = Date.now();
            // Prevent duplicate saves within 100ms
            if (now - lastSaveTime < 100) {
                return;
            }
            const noteObject = {
                order: order,
                key: currentKey, // Ensure currentKey is valid
            };

            savedNotes.push(noteObject);
            lastSaveTime = now;

            if (savedNotes.length > 10) {
                savedNotes = savedNotes.slice(-10); // Keep only the last 10 notes
            }

            lastSaveTime = now;
        }

        export function clearSavedNotes() {
            savedNotes = [];
            localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
        }

        export function stopSequence() {
            // Stop playing
            clearInterval(playingInterval);
            isPlaying = false;

            // Optionally suspend the audio context when stopping
            if (noteAudioContext) {
                noteAudioContext.suspend();
            }
            return;
        }

        export function playSequence() {
            const button = document.querySelector('.play-button');
            if(isPlaying) {
                stopSequence();
                return;
            }
            // Don't start if there are no notes
            if (savedNotes.length === 0) {
                alert('No notes to play! Please add some notes first.');
                return;
            }

            // Start playing
            isPlaying = true;
           // button.textContent = 'Stop Sequence';
            // button.style.backgroundColor = '#ff6b6b';

            const rhythmPattern = generateJazzDurations(savedNotes.length);
            let currentIndex = 0;

            async function playNotesWithRhythm() {
                if (!isPlaying || currentIndex >= savedNotes.length) {
                    isPlaying = false;
                    return;
                }

                const duration = rhythmPattern[Math.floor(Math.random() * rhythmPattern.length)];
                const noteObj = savedNotes[currentIndex];

                // Play the melody note using the stored order and key
                playNote(noteObj.order, duration);

                // Get chords for the note's original key
                const currentChords = musicalScales[noteObj.key].chords;
                const availableChords = Object.keys(currentChords);

                // Play a corresponding
                if (availableChords.length > 0) {
                    const randomChordName = availableChords[noteObj.order];
                    const chordNotes = currentChords[randomChordName];

                    // Play the chord using playChords
                    playChords(chordNotes, duration);
                }

                await new Promise(resolve => setTimeout(resolve, duration * 1000));

                currentIndex = (currentIndex + 1) % savedNotes.length;

                if (isPlaying) {
                    playNotesWithRhythm();
                }
            }

            // Start the sequence
            playNotesWithRhythm();
        }

        export function playBgm() {
            try {
                const sequence = [0, 2, 3, 4, 5, 6, 2, 1, 7, 4, 3, 2, 0, 5, 6, 4, 3, 2, 1];
                const bgmAudioContext = getBgmAudioContext();
                if (!bgmAudioContext) {
                    console.error('Failed to get audio context');
                    return;
                }
                const bgmGain = 0.1; // volume

                const rhythmPattern = generateJazzDurations(sequence.length);
                let currentIndex = 0;

                changeKey('eMinor');
                bgmPlaying = true;

                async function playNextNote() {

                    if (!bgmPlaying) {
                        return;
                    }
                    // Generate jazz durations for the entire sequence
                    const duration = rhythmPattern[Math.floor(Math.random() * rhythmPattern.length)];
                    // const bgmAudioContext = getBgmAudioContext();
                    if (bgmAudioContext.state === 'suspended') {
                        bgmAudioContext.resume();
                    }

                    // Use the pre-generated duration for the current note
                    // const noteDuration = noteDurations[currentIndex];


                    playNote(sequence[currentIndex], duration, bgmAudioContext, bgmGain);

                    currentIndex = (currentIndex + 1) % sequence.length;

                    // Schedule next note
                    setTimeout(() => {
                        if (bgmPlaying) {
                            playNextNote();
                        }
                    }, duration * 1000);

                    // await new Promise(resolve => setTimeout(resolve, duration * 1000));

                    // if (isPlaying) {
                    //     playNextNote();
                    // }
            }

            playNextNote();}
            catch (error) {
                console.error('Error playing BGM:', error);
            }

        }

        export function stopBgm() {
            bgmPlaying = false;
            const bgmAudioContext = getBgmAudioContext();
            if (bgmAudioContext) {
                bgmAudioContext.suspend();
            }
        }


        // download
        // async function downloadSequence() {
        //     if (savedNotes.length === 0) {
        //         alert('No notes to download! Please add some notes first.');
        //         return;
        //     }
        
        //     const sampleRate = 44100;
        //     const channels = 1; // Changed to mono for simplicity
        //     const kbps = 128;
        
        //     // Create offline context
        //     const offlineContext = new OfflineAudioContext(
        //         channels,
        //         sampleRate * 20, // 20 seconds
        //         sampleRate
        //     );
        
        //     const destination = offlineContext.destination;
        //     let currentTime = 0;
        //     let currentIndex = 0;
        
        //     // Show loading indicator
        //     const loadingDiv = document.createElement('div');
        //     loadingDiv.textContent = 'Generating MP3...';
        //     loadingDiv.style.position = 'fixed';
        //     loadingDiv.style.top = '50%';
        //     loadingDiv.style.left = '50%';
        //     loadingDiv.style.transform = 'translate(-50%, -50%)';
        //     loadingDiv.style.padding = '20px';
        //     loadingDiv.style.background = 'rgba(0,0,0,0.8)';
        //     loadingDiv.style.color = 'white';
        //     loadingDiv.style.borderRadius = '10px';
        //     document.body.appendChild(loadingDiv);
        
        //     function generateJazzDurations(count) {
        //         const durations = [];
        //         for (let i = 0; i < count; i++) {
        //             const swing = Math.random() > 0.8 ? 0.96 : 0.64;
        //             const base = Math.random() * 0.64 + 0.64;
        //             durations.push(base * swing);
        //         }
        //         return durations;
        //     }
        
        //     const rhythmPattern = generateJazzDurations(savedNotes.length);
        //     const totalDuration = 20;
        
        //     while (currentTime < totalDuration) {
        //         const duration = rhythmPattern[Math.floor(Math.random() * rhythmPattern.length)];
        //         const noteObj = savedNotes[currentIndex];
                
        //         const frequencies = musicalScales[noteObj.key].frequencies;
        //         const notes = Object.keys(frequencies);
        //         const noteName = notes[noteObj.order];
                
        //         if (noteName) {
        //             // Create oscillator for melody
        //             const oscillator = offlineContext.createOscillator();
        //             const gainNode = offlineContext.createGain();
        
        //             oscillator.type = 'sine';
        //             oscillator.frequency.setValueAtTime(
        //                 frequencies[noteName], 
        //                 currentTime
        //             );
        
        //             const initialGain = 0.2;
        //             gainNode.gain.setValueAtTime(initialGain, currentTime);
        //             gainNode.gain.exponentialRampToValueAtTime(
        //                 0.01, 
        //                 currentTime + duration
        //             );
        
        //             oscillator.connect(gainNode);
        //             gainNode.connect(destination);
        
        //             // Play chord
        //             const currentChords = musicalScales[noteObj.key].chords;
        //             const availableChords = Object.keys(currentChords);
                    
        //             if (availableChords.length > 0) {
        //                 const randomChordName = availableChords[Math.floor(Math.random() * availableChords.length)];
        //                 const chordNotes = currentChords[randomChordName];
                        
        //                 if (Array.isArray(chordNotes)) {
        //                     chordNotes.forEach(chordNote => {
        //                         if (frequencies[chordNote]) {
        //                             const chordOsc = offlineContext.createOscillator();
        //                             const chordGain = offlineContext.createGain();
        
        //                             chordOsc.type = 'sine';
        //                             chordOsc.frequency.setValueAtTime(
        //                                 frequencies[chordNote], 
        //                                 currentTime
        //                             );
        
        //                             const chordGainValue = 0.05;
        //                             chordGain.gain.setValueAtTime(chordGainValue, currentTime);
        //                             chordGain.gain.exponentialRampToValueAtTime(
        //                                 0.01, 
        //                                 currentTime + duration
        //                             );
        
        //                             chordOsc.connect(chordGain);
        //                             chordGain.connect(destination);
        
        //                             chordOsc.start(currentTime);
        //                             chordOsc.stop(currentTime + duration);
        //                         }
        //                     });
        //                 }
        //             }
        
        //             oscillator.start(currentTime);
        //             oscillator.stop(currentTime + duration);
        //         }
                
        //         currentTime += duration;
        //         currentIndex = (currentIndex + 1) % savedNotes.length;
        //     }
        
        //     try {
        //         // Render the audio
        //         const renderedBuffer = await offlineContext.startRendering();
                
        //         // Create MP3 encoder
        //         const mp3encoder = new lamejs.Mp3Encoder(channels, sampleRate, kbps);
        //         const mp3Data = [];
        
        //         // Convert Float32Array to Int16Array
        //         const samples = new Int16Array(renderedBuffer.length);
        //         const leftChannel = renderedBuffer.getChannelData(0);
                
        //         // Convert and clip samples
        //         for (let i = 0; i < renderedBuffer.length; i++) {
        //             // Convert float32 to int16
        //             const sample = Math.max(-1, Math.min(1, leftChannel[i]));
        //             samples[i] = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        //         }
        
        //         // Encode to MP3 in chunks
        //         const mp3ChunkSize = 1152; // Must be multiple of 576
        //         for (let i = 0; i < samples.length; i += mp3ChunkSize) {
        //             const sampleChunk = samples.subarray(i, i + mp3ChunkSize);
        //             const mp3buf = mp3encoder.encodeBuffer(sampleChunk);
        //             if (mp3buf.length > 0) {
        //                 mp3Data.push(new Int8Array(mp3buf));
        //             }
        //         }
        
        //         // Finish encoding
        //         const mp3buf = mp3encoder.flush();
        //         if (mp3buf.length > 0) {
        //             mp3Data.push(new Int8Array(mp3buf));
        //         }
        
        //         // Create MP3 Blob and download
        //         const blob = new Blob(mp3Data, { type: 'audio/mp3' });
        //         const url = URL.createObjectURL(blob);
        //         const link = document.createElement('a');
        //         link.href = url;
        //         link.download = 'sequence.mp3';
        //         link.click();
        //         URL.revokeObjectURL(url);
        
        //     } catch (error) {
        //         console.error('Error generating MP3:', error);
        //         alert('Error generating MP3. Please try again.');
        //     } finally {
        //         document.body.removeChild(loadingDiv);
        //     }
        // }