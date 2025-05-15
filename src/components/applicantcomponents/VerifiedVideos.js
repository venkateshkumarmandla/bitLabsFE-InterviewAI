// import React from 'react';

// const VerifiedVideos = () => {
//   return (
//     <div style={{ position: 'relative', paddingTop: '56.25%' }}>
//       <iframe
//         src="https://www.youtube.com/embed/E8lXC2mR6-k?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0"
//         title="Verified Video"
//         frameBorder="0"
//         allow="autoplay; encrypted-media"
//         allowFullScreen
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 10,
//           width: '80%',
//           height: '100%',
//         }}
//       />
//     </div>
//   );
// };

// export default VerifiedVideos;



// import React, { useRef, useState } from 'react';
// import ReactPlayer from 'react-player/youtube';

// const VerifiedVideos = () => {
//   const playerRef = useRef(null);
//   const [playing, setPlaying] = useState(false);
//   const [muted, setMuted] = useState(true);
//   const [volume, setVolume] = useState(0.5);

//   return (
//     <div style={{ maxWidth: '800px', margin: 'auto' }}>
//       <ReactPlayer
//         ref={playerRef}
//         url="https://www.youtube.com/watch?v=E8lXC2mR6-k"
//         playing={playing}
//         muted={muted}
//         volume={volume}
//         controls={false}
//         width="100%"
//         height="450px"
//         config={{
//           youtube: {
//             playerVars: { modestbranding: 1, rel: 0, showinfo: 0 },
//           },
//         }}
//       />

//       <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
//         <button onClick={() => setPlaying(!playing)}>
//           {playing ? 'Pause' : 'Play'}
//         </button>
//         <button onClick={() => setMuted(!muted)}>
//           {muted ? 'Unmute' : 'Mute'}
//         </button>
//         <input
//           type="range"
//           min={0}
//           max={1}
//           step={0.1}
//           value={volume}
//           onChange={(e) => setVolume(parseFloat(e.target.value))}
//         />
//       </div>
//     </div>
//   );
// };

// export default VerifiedVideos;





// import React, { useRef, useState } from 'react';
// import ReactPlayer from 'react-player';

// const VerifiedVideos = () => {
//   const playerRef = useRef(null);
//   const [playing, setPlaying] = useState(true);
//   const [muted, setMuted] = useState(true);
//   const [volume, setVolume] = useState(0.5);

//   return (
//     <div style={{ maxWidth: '800px', margin: 'auto' }}>
//       <ReactPlayer
//         ref={playerRef}
//         url="https://www.youtube.com/watch?v=E8lXC2mR6-k"
//         playing={playing}
//         muted={muted}
//         volume={volume}
//         controls={false}
//         width="100%"
//         height="450px"
//         config={{
//           youtube: {
//             playerVars: {
//               autoplay: 1,
//               mute: 1,
//               controls: 0,
//               modestbranding: 1,
//               rel: 0,
//               showinfo: 0,
//               iv_load_policy: 3, // Hides annotations
//             },
//           },
//         }}
//       />

//       <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
//         <button onClick={() => setPlaying(!playing)}>
//           {playing ? 'Pause' : 'Play'}
//         </button>
//         <button onClick={() => setMuted(!muted)}>
//           {muted ? 'Unmute' : 'Mute'}
//         </button>
//         <input
//           type="range"
//           min={0}
//           max={1}
//           step={0.1}
//           value={volume}
//           onChange={(e) => setVolume(parseFloat(e.target.value))}
//         />
//       </div>
//     </div>
//   );
// };

// export default VerifiedVideos;



// import React, { useRef, useState } from 'react';
// import ReactPlayer from 'react-player';

// const VerifiedVideos = () => {
//   const playerRef = useRef(null);
//   const [playing, setPlaying] = useState(true);
//   const [muted, setMuted] = useState(true);
//   const [volume, setVolume] = useState(0.5);
//   const [playedSeconds, setPlayedSeconds] = useState(0);
//   const [duration, setDuration] = useState(0);

//   // Format seconds to mm:ss
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   return (
//     <div style={{ maxWidth: '800px', margin: 'auto' }}>
//       <ReactPlayer
//         ref={playerRef}
//         url="https://www.youtube.com/watch?v=E8lXC2mR6-k"
//         playing={playing}
//         muted={muted}
//         volume={volume}
//         controls={false}
//         width="100%"
//         height="450px"
//         onProgress={({ playedSeconds }) => setPlayedSeconds(playedSeconds)}
//         onDuration={(dur) => setDuration(dur)}
//         config={{
//           youtube: {
//             playerVars: {
//               autoplay: 1,
//               mute: 1,
//               controls: 0,
//               modestbranding: 1,
//               rel: 0,
//               showinfo: 0,
//               iv_load_policy: 3,
//             },
//           },
//         }}
//       />

//       <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '15px' }}>
//         <button onClick={() => setPlaying(!playing)}>
//           {playing ? 'Pause' : 'Play'}
//         </button>

//         <button onClick={() => setMuted(!muted)}>
//           {muted ? 'Unmute' : 'Mute'}
//         </button>

//         <label>
//           Volume:
//           <input
//             type="range"
//             min={0}
//             max={1}
//             step={0.1}
//             value={volume}
//             onChange={(e) => setVolume(parseFloat(e.target.value))}
//             style={{ marginLeft: '5px' }}
//           />
//         </label>

//         <span>
//           {formatTime(playedSeconds)} / {formatTime(duration)}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default VerifiedVideos;




// import React, { useRef, useState, useEffect } from 'react';
// import ReactPlayer from 'react-player';
// import axios from 'axios';
// import { apiUrl } from '../../services/ApplicantAPIService';

// const VerifiedVideos = () => {
//   const playerRef = useRef(null);
//   const [videoUrl, setVideoUrl] = useState('');
//   const [playing, setPlaying] = useState(true);
//   const [muted, setMuted] = useState(true);
//   const [volume, setVolume] = useState(0.5);
//   const [playedSeconds, setPlayedSeconds] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [seeking, setSeeking] = useState(false);
//   const [playbackRate, setPlaybackRate] = useState(1);

//   // Format seconds into MM:SS
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   // Fetch videos with JWT token
//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//       const jwtToken = localStorage.getItem('jwtToken');
//         const response = await axios.get(`${apiUrl}/file/allVideos`, {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         });

//         // Assuming response contains an array of video URLs
//         if (response.data.length > 0) {
//           setVideoUrl(response.data[0]); // Set first video
//         } else {
//           console.warn('No videos found');
//         }
//       } catch (error) {
//         console.error('Error fetching videos:', error);
//       }
//     };

//     fetchVideos();
//   }, []);

//   const handleSeekChange = (e) => {
//     const newTime = parseFloat(e.target.value);
//     setPlayedSeconds(newTime);
//     playerRef.current.seekTo(newTime, 'seconds');
//   };

//   const skipTime = (seconds) => {
//     const currentTime = playerRef.current.getCurrentTime();
//     const newTime = currentTime + seconds;
//     playerRef.current.seekTo(newTime, 'seconds');
//     setPlayedSeconds(newTime);
//   };

//   const changeSpeed = (rate) => {
//     setPlaybackRate(rate);
//   };

//   return (
//     <div style={{ maxWidth: '800px', margin: 'auto' }}>
//       {videoUrl ? (
//         <>
//           <ReactPlayer
//             ref={playerRef}
//             url={videoUrl}
//             playing={playing}
//             muted={muted}
//             volume={volume}
//             controls={false}
//             playbackRate={playbackRate}
//             width="100%"
//             height="450px"
//             onProgress={({ playedSeconds }) => {
//               if (!seeking) setPlayedSeconds(playedSeconds);
//             }}
//             onDuration={(dur) => setDuration(dur)}
//           />

//           <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
//             <button onClick={() => skipTime(-10)}>⏪ 10s</button>
//             <button onClick={() => setPlaying(!playing)}>{playing ? 'Pause' : 'Play'}</button>
//             <button onClick={() => skipTime(10)}>10s ⏩</button>
//             <button onClick={() => setMuted(!muted)}>{muted ? 'Unmute' : 'Mute'}</button>
//             <label>
//               Volume:
//               <input
//                 type="range"
//                 min={0}
//                 max={1}
//                 step={0.1}
//                 value={volume}
//                 onChange={(e) => setVolume(parseFloat(e.target.value))}
//                 style={{ marginLeft: '5px' }}
//               />
//             </label>
//           </div>

//           <div style={{ marginTop: '10px', textAlign: 'center' }}>
//             <input
//               type="range"
//               min={0}
//               max={duration}
//               step={0.1}
//               value={playedSeconds}
//               onMouseDown={() => setSeeking(true)}
//               onChange={handleSeekChange}
//               onMouseUp={() => setSeeking(false)}
//               style={{ width: '80%' }}
//             />
//             <div style={{ marginTop: '5px' }}>
//               {formatTime(playedSeconds)} / {formatTime(duration)}
//             </div>
//           </div>

//           <div style={{ marginTop: '15px', textAlign: 'center' }}>
//             <label>Speed: </label>
//             {[0.5, 1, 1.5, 2].map((rate) => (
//               <button
//                 key={rate}
//                 onClick={() => changeSpeed(rate)}
//                 style={{
//                   margin: '0 5px',
//                   backgroundColor: playbackRate === rate ? '#333' : '#eee',
//                   color: playbackRate === rate ? '#fff' : '#000',
//                 }}
//               >
//                 {rate}x
//               </button>
//             ))}
//           </div>
//         </>
//       ) : (
//         <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading video...</p>
//       )}
//     </div>
//   );
// };

// export default VerifiedVideos;







// import React, { useRef, useState, useEffect } from 'react';
// import ReactPlayer from 'react-player';
// import axios from 'axios';
// import { apiUrl } from '../../services/ApplicantAPIService';

// const VerifiedVideos = () => {
//   const playerRef = useRef(null);
//   const [videoList, setVideoList] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [playing, setPlaying] = useState(true);
//   const [muted, setMuted] = useState(true);
//   const [volume, setVolume] = useState(0.5);
//   const [playedSeconds, setPlayedSeconds] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [seeking, setSeeking] = useState(false);
//   const [playbackRate, setPlaybackRate] = useState(1);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//        const jwtToken = localStorage.getItem('jwtToken');
//         const res = await axios.get(`${apiUrl}/file/allVideos`, {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         });

//         if (res.data.length > 0) {
//           setVideoList(res.data);
//         }
//       } catch (err) {
//         console.error('Error fetching videos:', err);
//       }
//     };

//     fetchVideos();
//   }, []);

//   const handleSeekChange = (e) => {
//     const newTime = parseFloat(e.target.value);
//     setPlayedSeconds(newTime);
//     playerRef.current.seekTo(newTime, 'seconds');
//   };

//   const skipTime = (sec) => {
//     const currentTime = playerRef.current.getCurrentTime();
//     const newTime = currentTime + sec;
//     playerRef.current.seekTo(newTime, 'seconds');
//     setPlayedSeconds(newTime);
//   };

//   const changeSpeed = (rate) => setPlaybackRate(rate);

//   const goToVideo = (index) => {
//     setCurrentIndex(index);
//     setPlayedSeconds(0);
//   };

//   const currentVideo = videoList[currentIndex];

//   return (
//     <div style={{ maxWidth: '800px', margin: 'auto' }}>
//       {currentVideo ? (
//         <>
//           <ReactPlayer
//             ref={playerRef}
//             url={currentVideo}
//             playing={playing}
//             muted={muted}
//             volume={volume}
//             controls={false}
//             playbackRate={playbackRate}
//             width="100%"
//             height="450px"
//             onProgress={({ playedSeconds }) => !seeking && setPlayedSeconds(playedSeconds)}
//             onDuration={(d) => setDuration(d)}
//           />

//           {/* Controls */}
//           <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
//             <button onClick={() => skipTime(-10)}>⏪ 10s</button>
//             <button onClick={() => setPlaying(!playing)}>{playing ? 'Pause' : 'Play'}</button>
//             <button onClick={() => skipTime(10)}>10s ⏩</button>
//             <button onClick={() => setMuted(!muted)}>{muted ? 'Unmute' : 'Mute'}</button>
//             <label>
//               Volume:
//               <input
//                 type="range"
//                 min={0}
//                 max={1}
//                 step={0.1}
//                 value={volume}
//                 onChange={(e) => setVolume(parseFloat(e.target.value))}
//                 style={{ marginLeft: '5px' }}
//               />
//             </label>
//           </div>

//           {/* Seek Bar */}
//           <div style={{ marginTop: '10px', textAlign: 'center' }}>
//             <input
//               type="range"
//               min={0}
//               max={duration}
//               step={0.1}
//               value={playedSeconds}
//               onMouseDown={() => setSeeking(true)}
//               onChange={handleSeekChange}
//               onMouseUp={() => setSeeking(false)}
//               style={{ width: '80%' }}
//             />
//             <div style={{ marginTop: '5px' }}>
//               {formatTime(playedSeconds)} / {formatTime(duration)}
//             </div>
//           </div>

//           {/* Speed Buttons */}
//           <div style={{ marginTop: '15px', textAlign: 'center' }}>
//             <label>Speed: </label>
//             {[0.5, 1, 1.5, 2].map((rate) => (
//               <button
//                 key={rate}
//                 onClick={() => changeSpeed(rate)}
//                 style={{
//                   margin: '0 5px',
//                   backgroundColor: playbackRate === rate ? '#333' : '#eee',
//                   color: playbackRate === rate ? '#fff' : '#000',
//                 }}
//               >
//                 {rate}x
//               </button>
//             ))}
//           </div>

//           {/* Navigation Buttons */}
//           <div style={{ marginTop: '20px', textAlign: 'center' }}>
//             <button
//               onClick={() => goToVideo(currentIndex - 1)}
//               disabled={currentIndex === 0}
//               style={{ marginRight: '10px' }}
//             >
//               ⬅ Previous
//             </button>
//             <button
//               onClick={() => goToVideo(currentIndex + 1)}
//               disabled={currentIndex === videoList.length - 1}
//             >
//               Next ➡
//             </button>
//           </div>

//           {/* Dots Navigation */}
//           <div style={{ marginTop: '10px', textAlign: 'center' }}>
//             {videoList.map((_, index) => (
//               <span
//                 key={index}
//                 onClick={() => goToVideo(index)}
//                 style={{
//                   cursor: 'pointer',
//                   fontSize: '20px',
//                   margin: '0 5px',
//                   color: index === currentIndex ? 'blue' : 'gray',
//                 }}
//               >
//                 ●
//               </span>
//             ))}
//           </div>
//         </>
//       ) : (
//         <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading video...</p>
//       )}
//     </div>
//   );
// };

// export default VerifiedVideos;




// import React, { useRef, useState, useEffect } from 'react';
// import ReactPlayer from 'react-player';
// import axios from 'axios';
// import { apiUrl } from '../../services/ApplicantAPIService';
// import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaForward, FaBackward } from 'react-icons/fa';

// const VerifiedVideos = () => {
//   const playerRef = useRef(null);
//   const [videoList, setVideoList] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [playing, setPlaying] = useState(true);
//   const [muted, setMuted] = useState(true);
//   const [volume, setVolume] = useState(0.5);
//   const [playedSeconds, setPlayedSeconds] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [seeking, setSeeking] = useState(false);
//   const [playbackRate, setPlaybackRate] = useState(1);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const jwtToken = localStorage.getItem('jwtToken');
//         const res = await axios.get(`${apiUrl}/file/allVideos`, {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         });
//         if (res.data.length > 0) setVideoList(res.data);
//       } catch (err) {
//         console.error('Error fetching videos:', err);
//       }
//     };
//     fetchVideos();
//   }, []);

//   const handleSeekChange = (e) => {
//     const newTime = parseFloat(e.target.value);
//     setPlayedSeconds(newTime);
//     playerRef.current.seekTo(newTime, 'seconds');
//   };

//   const skipTime = (sec) => {
//     const currentTime = playerRef.current.getCurrentTime();
//     const newTime = currentTime + sec;
//     playerRef.current.seekTo(newTime, 'seconds');
//     setPlayedSeconds(newTime);
//   };

//   const changeSpeed = (rate) => setPlaybackRate(rate);
//   const goToVideo = (index) => {
//     setCurrentIndex(index);
//     setPlayedSeconds(0);
//   };

//   const currentVideo = videoList[currentIndex];

//   return (
//     <div style={styles.container}>
//       {currentVideo ? (
//         <>
//           <div style={styles.playerWrapper}>
//             <ReactPlayer
//               ref={playerRef}
//               url={currentVideo}
//               playing={playing}
//               muted={muted}
//               volume={volume}
//               controls={false}
//               playbackRate={playbackRate}
//               width="100%"
//               height="100%"
//               onProgress={({ playedSeconds }) => !seeking && setPlayedSeconds(playedSeconds)}
//               onDuration={(d) => setDuration(d)}
//             />
//           </div>

//           {/* Controls */}
//           <div style={styles.controls}>
//             <button onClick={() => skipTime(-10)}><FaBackward /></button>
//             <button onClick={() => setPlaying(!playing)}>
//               {playing ? <FaPause /> : <FaPlay />}
//             </button>
//             <button onClick={() => skipTime(10)}><FaForward /></button>
//             <button onClick={() => setMuted(!muted)}>
//               {muted ? <FaVolumeMute /> : <FaVolumeUp />}
//             </button>
//             <input
//               type="range"
//               min={0}
//               max={1}
//               step={0.1}
//               value={volume}
//               onChange={(e) => setVolume(parseFloat(e.target.value))}
//               style={styles.volumeSlider}
//             />
//           </div>

//           {/* Seek Bar */}
//           <div style={styles.seekBarContainer}>
//             <input
//               type="range"
//               min={0}
//               max={duration}
//               step={0.1}
//               value={playedSeconds}
//               onMouseDown={() => setSeeking(true)}
//               onChange={handleSeekChange}
//               onMouseUp={() => setSeeking(false)}
//               style={styles.seekBar}
//             />
//             <div style={styles.timer}>
//               {formatTime(playedSeconds)} / {formatTime(duration)}
//             </div>
//           </div>

//           {/* Speed */}
//           <div style={styles.speedControl}>
//             {[0.5, 1, 1.5, 2].map((rate) => (
//               <button
//                 key={rate}
//                 onClick={() => changeSpeed(rate)}
//                 style={{
//                   ...styles.speedButton,
//                   backgroundColor: playbackRate === rate ? '#ff0000' : '#333',
//                 }}
//               >
//                 {rate}x
//               </button>
//             ))}
//           </div>

//           {/* Navigation */}
//           <div style={styles.navigation}>
//             <button
//               onClick={() => goToVideo(currentIndex - 1)}
//               disabled={currentIndex === 0}
//               style={styles.navButton}
//             >
//               ⬅ Previous
//             </button>
//             <button
//               onClick={() => goToVideo(currentIndex + 1)}
//               disabled={currentIndex === videoList.length - 1}
//               style={styles.navButton}
//             >
//               Next ➡
//             </button>
//           </div>

//           {/* Dots */}
//           <div style={styles.dots}>
//             {videoList.map((_, index) => (
//               <span
//                 key={index}
//                 onClick={() => goToVideo(index)}
//                 style={{
//                   ...styles.dot,
//                   color: index === currentIndex ? '#ff0000' : 'gray',
//                 }}
//               >
//                 ●
//               </span>
//             ))}
//           </div>
//         </>
//       ) : (
//         <p style={{ textAlign: 'center', marginTop: '50px', color: '#fff' }}>Loading video...</p>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: '900px',
//     margin: 'auto',
//     padding: '20px',
//     backgroundColor: '#121212',
//     color: '#fff',
//     borderRadius: '10px',
//   },
//   playerWrapper: {
//     position: 'relative',
//     paddingTop: '56.25%', // 16:9 aspect ratio
//     marginBottom: '20px',
//   },
//   controls: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: '15px',
//     marginBottom: '15px',
//   },
//   volumeSlider: {
//     width: '100px',
//   },
//   seekBarContainer: {
//     textAlign: 'center',
//     marginBottom: '10px',
//   },
//   seekBar: {
//     width: '80%',
//   },
//   timer: {
//     marginTop: '5px',
//     color: '#aaa',
//   },
//   speedControl: {
//     textAlign: 'center',
//     marginBottom: '15px',
//   },
//   speedButton: {
//     margin: '0 5px',
//     padding: '5px 10px',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
//   navigation: {
//     textAlign: 'center',
//     marginBottom: '15px',
//   },
//   navButton: {
//     margin: '0 10px',
//     padding: '6px 12px',
//     backgroundColor: '#ff0000',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   },
//   dots: {
//     textAlign: 'center',
//     fontSize: '24px',
//   },
//   dot: {
//     cursor: 'pointer',
//     margin: '0 5px',
//   },
// };

// export default VerifiedVideos;









// import React, { useRef, useState, useEffect } from 'react';
// import ReactPlayer from 'react-player';
// import axios from 'axios';
// import { apiUrl } from '../../services/ApplicantAPIService';

// const VerifiedVideos = () => {
//   const playerRef = useRef(null);
//   const [videoList, setVideoList] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [playing, setPlaying] = useState(true);
//   const [muted, setMuted] = useState(true);
//   const [volume, setVolume] = useState(0.5);
//   const [playedSeconds, setPlayedSeconds] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [seeking, setSeeking] = useState(false);
//   const [playbackRate, setPlaybackRate] = useState(1);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const jwtToken = localStorage.getItem('jwtToken');
//         const res = await axios.get(`${apiUrl}/file/allVideos`, {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         });
//         if (res.data.length > 0) setVideoList(res.data);
//       } catch (err) {
//         console.error('Error fetching videos:', err);
//       }
//     };

//     fetchVideos();
//   }, []);

//   const handleSeekChange = (e) => {
//     const newTime = parseFloat(e.target.value);
//     setPlayedSeconds(newTime);
//     playerRef.current.seekTo(newTime, 'seconds');
//   };

//   const skipTime = (sec) => {
//     const newTime = playerRef.current.getCurrentTime() + sec;
//     playerRef.current.seekTo(newTime, 'seconds');
//     setPlayedSeconds(newTime);
//   };

//   const goToVideo = (index) => {
//     setCurrentIndex(index);
//     setPlayedSeconds(0);
//   };

//   const currentVideo = videoList[currentIndex];

//   return (
//     <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'sans-serif' }}>
//       {currentVideo ? (
//         <>
//           <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
//             <ReactPlayer
//               ref={playerRef}
//               url={currentVideo}
//               playing={playing}
//               muted={muted}
//               volume={volume}
//               controls={false}
//               playbackRate={playbackRate}
//               width="100%"
//               height="250px"
//               onProgress={({ playedSeconds }) => !seeking && setPlayedSeconds(playedSeconds)}
//               onDuration={(d) => setDuration(d)}
//             />
//           </div>

//           <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '0 0 10px 10px' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
//               <button onClick={() => skipTime(-10)}>⏪</button>
//               <button onClick={() => setPlaying(!playing)}>{playing ? 'Pause' : 'Play'}</button>
//               <button onClick={() => skipTime(10)}>⏩</button>
//               <button onClick={() => setMuted(!muted)}>{muted ? '🔇' : '🔊'}</button>
//               <input
//                 type="range"
//                 min={0}
//                 max={1}
//                 step={0.1}
//                 value={volume}
//                 onChange={(e) => setVolume(parseFloat(e.target.value))}
//                 style={{ width: '80px' }}
//               />
//             </div>

//             <input
//               type="range"
//               min={0}
//               max={duration}
//               step={0.1}
//               value={playedSeconds}
//               onMouseDown={() => setSeeking(true)}
//               onChange={handleSeekChange}
//               onMouseUp={() => setSeeking(false)}
//               style={{ width: '100%', marginTop: '10px' }}
//             />
//             <div style={{ fontSize: '14px', textAlign: 'center' }}>
//               {formatTime(playedSeconds)} / {formatTime(duration)}
//             </div>

//             <div style={{ textAlign: 'center', marginTop: '10px' }}>
//               {[0.5, 1, 1.5, 2].map((rate) => (
//                 <button
//                   key={rate}
//                   onClick={() => setPlaybackRate(rate)}
//                   style={{
//                     margin: '0 5px',
//                     padding: '5px 10px',
//                     background: playbackRate === rate ? '#007bff' : '#e0e0e0',
//                     color: playbackRate === rate ? '#fff' : '#000',
//                     border: 'none',
//                     borderRadius: '5px',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   {rate}x
//                 </button>
//               ))}
//             </div>

//             <div style={{ marginTop: '15px', textAlign: 'center' }}>
//               <button onClick={() => goToVideo(currentIndex - 1)} disabled={currentIndex === 0}>
//                 ⬅ Prev
//               </button>
//               <button
//                 onClick={() => goToVideo(currentIndex + 1)}
//                 disabled={currentIndex === videoList.length - 1}
//                 style={{ marginLeft: '10px' }}
//               >
//                 Next ➡
//               </button>
//             </div>

//             <div style={{ marginTop: '10px', textAlign: 'center' }}>
//               {videoList.map((_, index) => (
//                 <span
//                   key={index}
//                   onClick={() => goToVideo(index)}
//                   style={{
//                     cursor: 'pointer',
//                     fontSize: '18px',
//                     margin: '0 4px',
//                     color: index === currentIndex ? '#007bff' : '#ccc',
//                   }}
//                 >
//                   ●
//                 </span>
//               ))}
//             </div>
//           </div>
//         </>
//       ) : (
//         <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading video...</p>
//       )}
//     </div>
//   );
// };

// export default VerifiedVideos;






// import React, { useRef, useState, useEffect } from 'react';
// import ReactPlayer from 'react-player';
// import axios from 'axios';
// import { apiUrl } from '../../services/ApplicantAPIService';

// const VerifiedVideos = () => {
//   const playerRef = useRef(null);
//   const [videoList, setVideoList] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [playing, setPlaying] = useState(true);
//   const [muted, setMuted] = useState(true);
//   const [volume, setVolume] = useState(0.5);
//   const [playedSeconds, setPlayedSeconds] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [seeking, setSeeking] = useState(false);
//   const [playbackRate, setPlaybackRate] = useState(1);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const jwtToken = localStorage.getItem('jwtToken');
//         const res = await axios.get(`${apiUrl}/file/allVideos`, {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         });
//         if (res.data.length > 0) setVideoList(res.data);
//       } catch (err) {
//         console.error('Error fetching videos:', err);
//       }
//     };

//     fetchVideos();
//   }, []);

//   const handleSeekChange = (e) => {
//     const newTime = parseFloat(e.target.value);
//     setPlayedSeconds(newTime);
//     playerRef.current.seekTo(newTime, 'seconds');
//   };

//   const skipTime = (sec) => {
//     const newTime = playerRef.current.getCurrentTime() + sec;
//     playerRef.current.seekTo(newTime, 'seconds');
//     setPlayedSeconds(newTime);
//   };

//   const goToVideo = (index) => {
//     setCurrentIndex(index);
//     setPlayedSeconds(0);
//   };

//   const currentVideo = videoList[currentIndex];

//   return (
//     <div style={{
//       maxWidth: '600px',
//       margin: '20px auto',
//       fontFamily: 'sans-serif',
//       backgroundColor: '#fff',
//       borderRadius: '10px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//     }}>
//       {currentVideo ? (
//         <>
//           <div style={{ borderRadius: '10px 10px 0 0', overflow: 'hidden' }}>
//             <ReactPlayer
//               ref={playerRef}
//               url={currentVideo}
//               playing={playing}
//               muted={muted}
//               volume={volume}
//               controls={false}
//               playbackRate={playbackRate}
//               width="100%"
//               height="250px"
//               onProgress={({ playedSeconds }) => !seeking && setPlayedSeconds(playedSeconds)}
//               onDuration={(d) => setDuration(d)}
//             />
//           </div>

//           <div style={{
//             padding: '10px',
//             background: '#f9f9f9',
//             borderRadius: '0 0 10px 10px'
//           }}>
//             {/* Control Bar */}
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               flexWrap: 'wrap',
//               gap: '10px'
//             }}>
//               <button onClick={() => goToVideo(currentIndex - 1)} disabled={currentIndex === 0}>⬅</button>
//               <button onClick={() => setPlaying(!playing)}>{playing ? '⏸️' : '▶️'}</button>
//               <button onClick={() => skipTime(-10)}>⏪ 10s</button>
//               <button onClick={() => skipTime(10)}>10s ⏩</button>
//               <button onClick={() => setMuted(!muted)}>{muted ? '🔇' : '🔊'}</button>
//               <input
//                 type="range"
//                 min={0}
//                 max={1}
//                 step={0.1}
//                 value={volume}
//                 onChange={(e) => setVolume(parseFloat(e.target.value))}
//                 style={{ width: '70px' }}
//               />
//               <select
//                 value={playbackRate}
//                 onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
//                 style={{
//                   padding: '4px',
//                   borderRadius: '4px',
//                   border: '1px solid #ccc',
//                   background: '#fff'
//                 }}
//               >
//                 {[0.5, 1, 1.5, 2].map((rate) => (
//                   <option key={rate} value={rate}>{rate}x</option>
//                 ))}
//               </select>
//               <button onClick={() => goToVideo(currentIndex + 1)} disabled={currentIndex === videoList.length - 1}>➡</button>
//             </div>

//             {/* Progress Bar */}
//             <div style={{ marginTop: '10px' }}>
//               <input
//                 type="range"
//                 min={0}
//                 max={duration}
//                 step={0.1}
//                 value={playedSeconds}
//                 onMouseDown={() => setSeeking(true)}
//                 onChange={handleSeekChange}
//                 onMouseUp={() => setSeeking(false)}
//                 style={{ width: '100%' }}
//               />
//               <div style={{ fontSize: '13px', textAlign: 'center', color: '#555' }}>
//                 {formatTime(playedSeconds)} / {formatTime(duration)}
//               </div>
//             </div>

//             {/* Video Dots Navigation */}
//             <div style={{ marginTop: '8px', textAlign: 'center' }}>
//               {videoList.map((_, index) => (
//                 <span
//                   key={index}
//                   onClick={() => goToVideo(index)}
//                   style={{
//                     cursor: 'pointer',
//                     fontSize: '18px',
//                     margin: '0 4px',
//                     color: index === currentIndex ? '#007bff' : '#ccc',
//                   }}
//                 >
//                   ●
//                 </span>
//               ))}
//             </div>
//           </div>
//         </>
//       ) : (
//         <p style={{ textAlign: 'center', padding: '50px 20px' }}>Loading video...</p>
//       )}
//     </div>
//   );
// };

// export default VerifiedVideos;





// import React, { useRef, useState, useEffect } from 'react';
// import ReactPlayer from 'react-player';
// import axios from 'axios';
// import { apiUrl } from '../../services/ApplicantAPIService';

// const VerifiedVideos = () => {
//   const playerRef = useRef(null);
//   const [videoList, setVideoList] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [playing, setPlaying] = useState(true);
//   const [muted, setMuted] = useState(true);
//   const [volume, setVolume] = useState(0.5);
//   const [playedSeconds, setPlayedSeconds] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [seeking, setSeeking] = useState(false);
//   const [playbackRate, setPlaybackRate] = useState(1);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const jwtToken = localStorage.getItem('jwtToken');
//         const res = await axios.get(`${apiUrl}/file/allVideos`, {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         });
//         if (res.data.length > 0) setVideoList(res.data);
//       } catch (err) {
//         console.error('Error fetching videos:', err);
//       }
//     };

//     fetchVideos();
//   }, []);

//   const handleSeekChange = (e) => {
//     const newTime = parseFloat(e.target.value);
//     setPlayedSeconds(newTime);
//     playerRef.current.seekTo(newTime, 'seconds');
//   };

//   const skipTime = (sec) => {
//     const newTime = playerRef.current.getCurrentTime() + sec;
//     playerRef.current.seekTo(newTime, 'seconds');
//     setPlayedSeconds(newTime);
//   };

//   const goToVideo = (index) => {
//     setCurrentIndex(index);
//     setPlayedSeconds(0);
//   };

//   const currentVideo = videoList[currentIndex];

//   return (
//     <div style={{
//       maxWidth: '650px',
//       margin: '20px auto',
//       fontFamily: 'sans-serif',
//       backgroundColor: '#fff',
//       borderRadius: '10px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//     }}>
//       {currentVideo ? (
//         <>
//           <div style={{ borderRadius: '10px 10px 0 0', overflow: 'hidden' }}>
//             <ReactPlayer
//               ref={playerRef}
//               url={currentVideo}
//               playing={playing}
//               muted={muted}
//               volume={volume}
//               controls={false}
//               playbackRate={playbackRate}
//               width="100%"
//               height="350px"
//               onProgress={({ playedSeconds }) => !seeking && setPlayedSeconds(playedSeconds)}
//               onDuration={(d) => setDuration(d)}
//             />
//           </div>

//           <div style={{
//             padding: '10px',
//             background: '#f9f9f9',
//             borderRadius: '0 0 10px 10px'
//           }}>
//             {/* Control Bar (All in One Line) */}
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               flexWrap: 'wrap',
//               gap: '10px'
//             }}>
//               <button onClick={() => goToVideo(currentIndex - 1)} disabled={currentIndex === 0}>⬅</button>
//               <button onClick={() => setPlaying(!playing)}>{playing ? '⏸️' : '▶️'}</button>
//               <button onClick={() => skipTime(-10)}>⏪ 10s</button>
//               <button onClick={() => skipTime(10)}>10s ⏩</button>
//               <button onClick={() => setMuted(!muted)}>{muted ? '🔇' : '🔊'}</button>
//               <input
//                 type="range"
//                 min={0}
//                 max={1}
//                 step={0.1}
//                 value={volume}
//                 onChange={(e) => setVolume(parseFloat(e.target.value))}
//                 style={{ width: '80px' }}
//               />
//               <select
//                 value={playbackRate}
//                 onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
//                 style={{
//                   padding: '4px',
//                   borderRadius: '4px',
//                   border: '1px solid #ccc',
//                   background: '#fff',
//                   width: '60px',
//                   height: '30px'
//                 }}
//               >
//                 {[0.25, 0.5, 1, 1.5,1.75, 2].map((rate) => (
//                   <option key={rate} value={rate}>{rate}x</option>
//                 ))}
//               </select>
//               <button onClick={() => goToVideo(currentIndex + 1)} disabled={currentIndex === videoList.length - 1}>➡</button>
//             </div>

//             {/* Progress Bar */}
//             <div style={{ marginTop: '10px' }}>
//               <input
//                 type="range"
//                 min={0}
//                 max={duration}
//                 step={0.1}
//                 value={playedSeconds}
//                 onMouseDown={() => setSeeking(true)}
//                 onChange={handleSeekChange}
//                 onMouseUp={() => setSeeking(false)}
//                 style={{ width: '100%' }}
//               />
//               <div style={{ fontSize: '13px', textAlign: 'center', color: '#555' }}>
//                 {formatTime(playedSeconds)} / {formatTime(duration)}
//               </div>
//             </div>

//             {/* Video Dots Navigation */}
//             <div style={{ marginTop: '8px', textAlign: 'center' }}>
//               {videoList.map((_, index) => (
//                 <span
//                   key={index}
//                   onClick={() => goToVideo(index)}
//                   style={{
//                     cursor: 'pointer',
//                     fontSize: '18px',
//                     margin: '0 4px',
//                     color: index === currentIndex ? '#007bff' : '#ccc',
//                   }}
//                 >
//                   ●
//                 </span>
//               ))}
//             </div>
//           </div>
//         </>
//       ) : (
//         <p style={{ textAlign: 'center', padding: '50px 20px' }}>Loading video...</p>
//       )}
//     </div>
//   );
// };

// export default VerifiedVideos;






// import React, { useState, useEffect } from 'react';
// import ReactPlayer from 'react-player';
// import axios from 'axios';
// import { apiUrl } from '../../services/ApplicantAPIService';

// const VerifiedVideos = () => {
//   const [videoList, setVideoList] = useState([]);
//   const [playingIndex, setPlayingIndex] = useState(null);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const jwtToken = localStorage.getItem('jwtToken');
//         const res = await axios.get(`${apiUrl}/file/allVideos`, {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         });
//         if (res.data.length > 0) setVideoList(res.data);
//       } catch (err) {
//         console.error('Error fetching videos:', err);
//       }
//     };

//     fetchVideos();
//   }, []);

//   return (
//     <div style={{
//       maxWidth: '1200px',
//       margin: '0 auto',
//       padding: '40px 20px',
//       fontFamily: 'sans-serif',
//     }}>
//       <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
//          Check Our <span style={{ color: 'orange' }}>Reviews</span>
//       </h2>

//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//         gap: '30px',
//       }}>
//         {videoList.map((videoUrl, index) => (
//           <div key={index} style={{ textAlign: 'center' }}>
//             <div style={{
//               borderRadius: '10px',
//               overflow: 'hidden',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//             }}>
//               <ReactPlayer
//                 url={videoUrl}
//                 playing={playingIndex === index}
//                 controls
//                 muted
//                 width="100%"
//                 height="200px"
//                 light={true}
//                 onClickPreview={() => setPlayingIndex(index)}
//               />
//             </div>
//             <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
//               {index === 0 ? ' Review1' :
//                index === 1 ? 'Review2' :
//                index === 2 ? 'Review3' : `Video ${index + 1}`}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VerifiedVideos;




// import React, { useState, useEffect } from 'react';
// import ReactPlayer from 'react-player';
// import axios from 'axios';
// import { apiUrl } from '../../services/ApplicantAPIService';

// const VerifiedVideos = () => {
//   const [videoList, setVideoList] = useState([]);
//   const [playingIndex, setPlayingIndex] = useState(null);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const jwtToken = localStorage.getItem('jwtToken');
//         const res = await axios.get(`${apiUrl}/file/allVideos`, {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         });
//         if (res.data.length > 0) setVideoList(res.data);
//       } catch (err) {
//         console.error('Error fetching videos:', err);
//       }
//     };

//     fetchVideos();
//   }, []);

//   return (
//     <div style={{
//       maxWidth: '1200px',
//       margin: '0 auto',
//       padding: '40px 20px',
//       fontFamily: 'sans-serif',
//     }}>
//       <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
//         Check Our <span style={{ color: 'orange' }}>Reviews</span>
//       </h2>

//       <div style={{
//         display: 'flex',
//         overflowX: 'auto',
//         gap: '20px',
//         paddingBottom: '10px',
//       }}>
//         {videoList.map((videoUrl, index) => (
//           <div key={index} style={{
//             minWidth: '300px',
//             flex: '0 0 auto',
//             textAlign: 'center'
//           }}>
//             <div style={{
//               borderRadius: '10px',
//               overflow: 'hidden',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//               position: 'relative'
//             }}>
//               <ReactPlayer
//                 url={videoUrl}
//                 playing={playingIndex === index}
//                 controls
//                 muted
//                 width="100%"
//                 height="200px"
//                 light={true}
//                 onClickPreview={() => setPlayingIndex(index)}
//                 onPlay={() => setPlayingIndex(index)}
//               />
//             </div>
//             <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
//               {index === 0 ? 'Review 1' :
//                index === 1 ? 'Review 2' :
//                index === 2 ? 'Review 3' : `Video ${index + 1}`}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VerifiedVideos;




// import React, { useState, useEffect, useRef } from 'react';
// import ReactPlayer from 'react-player';
// import axios from 'axios';
// import { apiUrl } from '../../services/ApplicantAPIService';

// const VerifiedVideos = () => {
//   const [videoList, setVideoList] = useState([]);
//   const [playingIndex, setPlayingIndex] = useState(null);
//   const [currentPage, setCurrentPage] = useState(0);

//   const scrollContainerRef = useRef(null);
//   const VIDEOS_PER_PAGE = 3; // Customize how many videos per "page"

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const jwtToken = localStorage.getItem('jwtToken');
//         const res = await axios.get(`${apiUrl}/file/allVideos`, {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         });
//         if (res.data.length > 0) setVideoList(res.data);
//       } catch (err) {
//         console.error('Error fetching videos:', err);
//       }
//     };

//     fetchVideos();
//   }, []);

//   const totalPages = Math.ceil(videoList.length / VIDEOS_PER_PAGE);

//   const scrollToPage = (pageIndex) => {
//     const container = scrollContainerRef.current;
//     if (container) {
//       const scrollAmount = pageIndex * (320 * VIDEOS_PER_PAGE + 20 * (VIDEOS_PER_PAGE - 1));
//       container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
//       setCurrentPage(pageIndex);
//     }
//   };

//   const goToNext = () => {
//     if (currentPage < totalPages - 1) scrollToPage(currentPage + 1);
//   };

//   const goToPrev = () => {
//     if (currentPage > 0) scrollToPage(currentPage - 1);
//   };

//   return (
//     <div style={{
//       maxWidth: '1200px',
//       margin: '0 auto',
//       padding: '40px 20px',
//       fontFamily: 'sans-serif',
//     }}>
//       <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
//         Check Our <span style={{ color: 'orange' }}>Reviews</span>
//       </h2>

//       <div style={{ position: 'relative' }}>
//         {/* Scrollable video container */}
//         <div
//           ref={scrollContainerRef}
//           style={{
//             display: 'flex',
//             overflowX: 'hidden',
//             gap: '20px',
//             scrollBehavior: 'smooth',
//             paddingBottom: '10px',
//           }}
//         >
//           {videoList.map((videoUrl, index) => (
//             <div key={index} style={{
//               minWidth: '300px',
//               flex: '0 0 auto',
//               textAlign: 'center'
//             }}>
//               <div style={{
//                 borderRadius: '10px',
//                 overflow: 'hidden',
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//                 position: 'relative'
//               }}>
//                 <ReactPlayer
//                   url={videoUrl}
//                   playing={playingIndex === index}
//                   controls
//                   muted
//                   width="100%"
//                   height="200px"
//                   light={true}
//                   onClickPreview={() => setPlayingIndex(index)}
//                   onPlay={() => setPlayingIndex(index)}
//                 />
//               </div>
//               <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
//                 {`Review ${index + 1}`}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Navigation buttons */}
//         <div style={{
//           display: 'flex',
//           justifyContent: 'center',
//           marginTop: '20px',
//           gap: '20px'
//         }}>
//           <button
//             onClick={goToPrev}
//             disabled={currentPage === 0}
//             style={{
//               padding: '10px 20px',
//               backgroundColor: currentPage === 0 ? 'gray' : 'orange',
//               color: 'white',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
//               fontWeight: 'bold'
//             }}
//           >
//             ⬅ Prev
//           </button>
//           <button
//             onClick={goToNext}
//             disabled={currentPage === totalPages - 1}
//             style={{
//               padding: '10px 20px',
//               backgroundColor: currentPage === totalPages - 1 ? 'gray' : 'orange',
//               color: 'white',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
//               fontWeight: 'bold'
//             }}
//           >
//             Next ➡
//           </button>
//         </div>

//         {/* Dot indicators */}
//         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', gap: '10px' }}>
//           {Array.from({ length: totalPages }).map((_, i) => (
//             <span
//               key={i}
//               onClick={() => scrollToPage(i)}
//               style={{
//                 width: '12px',
//                 height: '12px',
//                 borderRadius: '50%',
//                 backgroundColor: i === currentPage ? 'orange' : '#ccc',
//                 cursor: 'pointer',
//                 display: 'inline-block',
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerifiedVideos;



import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { apiUrl } from '../../services/ApplicantAPIService';

const VerifiedVideos = () => {
  const [videoList, setVideoList] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const scrollContainerRef = useRef(null);
  const VIDEOS_PER_PAGE = 3;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        const res = await axios.get(`${apiUrl}/file/allVideos`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        if (res.data.length > 0) setVideoList(res.data);
      } catch (err) {
        console.error('Error fetching videos:', err);
      }
    };

    fetchVideos();
  }, []);

  const totalPages = Math.ceil(videoList.length / VIDEOS_PER_PAGE);

  const scrollToPage = (pageIndex) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = pageIndex * (320 * VIDEOS_PER_PAGE + 20 * (VIDEOS_PER_PAGE - 1));
      container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      setCurrentPage(pageIndex);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages - 1) scrollToPage(currentPage + 1);
  };

  const goToPrev = () => {
    if (currentPage > 0) scrollToPage(currentPage - 1);
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: 'sans-serif',
      position: 'relative',
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Check Our <span style={{ color: 'orange' }}>Reviews</span>
      </h2>

      <div style={{ position: 'relative' }}>
        {/* Left Arrow */}
        {currentPage > 0 && (
          <button
            onClick={goToPrev}
            style={{
              position: 'absolute',
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'orange',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              zIndex: 1,
              fontSize: '20px',
            }}
          >
            ⬅
          </button>
        )}

        {/* Right Arrow */}
        {currentPage < totalPages - 1 && (
          <button
            onClick={goToNext}
            style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'orange',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              zIndex: 1,
              fontSize: '20px',
            }}
          >
            ➡
          </button>
        )}

        {/* Video List */}
        <div
          ref={scrollContainerRef}
          style={{
            display: 'flex',
            overflowX: 'hidden',
            gap: '20px',
            scrollBehavior: 'smooth',
            paddingBottom: '10px',
          }}
        >
          {videoList.map((videoUrl, index) => (
            <div key={index} style={{
              minWidth: '300px',
              flex: '0 0 auto',
              textAlign: 'center'
            }}>
              <div style={{
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                <ReactPlayer
                  url={videoUrl}
                  playing={playingIndex === index}
                  controls
                  muted
                  width="100%"
                  height="200px"
                  light={true}
                  onClickPreview={() => setPlayingIndex(index)}
                  onPlay={() => setPlayingIndex(index)}
                />
              </div>
              <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
                {`Review ${index + 1}`}
              </p>
            </div>
          ))}
        </div>

        {/* Dot indicators below */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', gap: '10px' }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <span
              key={i}
              onClick={() => scrollToPage(i)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: i === currentPage ? 'orange' : '#ccc',
                cursor: 'pointer',
                display: 'inline-block',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerifiedVideos;
