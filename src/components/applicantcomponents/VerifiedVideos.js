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



// import React, { useRef, useState } from 'react';
// import ReactPlayer from 'react-player';

// const VerifiedVideos = () => {
//   const playerRef = useRef(null);
//   const [playing, setPlaying] = useState(true);
//   const [muted, setMuted] = useState(true);
//   const [volume, setVolume] = useState(0.5);
//   const [playedSeconds, setPlayedSeconds] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [seeking, setSeeking] = useState(false);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   const handleSeekChange = (e) => {
//     const newTime = parseFloat(e.target.value);
//     setPlayedSeconds(newTime);
//     playerRef.current.seekTo(newTime, 'seconds');
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
//         onProgress={({ playedSeconds }) => {
//           if (!seeking) setPlayedSeconds(playedSeconds);
//         }}
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

//       <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '15px', flexWrap: 'wrap' }}>
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
//       </div>

//       <div style={{ marginTop: '15px', textAlign: 'center' }}>
//         <input
//           type="range"
//           min={0}
//           max={duration}
//           step={0.1}
//           value={playedSeconds}
//           onMouseDown={() => setSeeking(true)}
//           onChange={handleSeekChange}
//           onMouseUp={() => setSeeking(false)}
//           style={{ width: '80%' }}
//         />
//         <div style={{ marginTop: '5px' }}>
//           {formatTime(playedSeconds)} / {formatTime(duration)}
//         </div>
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
//   const [seeking, setSeeking] = useState(false);
//   const [playbackRate, setPlaybackRate] = useState(1);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

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
//       <ReactPlayer
//         ref={playerRef}
//         url="https://www.youtube.com/watch?v=E8lXC2mR6-k"
//         playing={playing}
//         muted={muted}
//         volume={volume}
//         controls={false}
//         playbackRate={playbackRate}
//         width="100%"
//         height="450px"
//         onProgress={({ playedSeconds }) => {
//           if (!seeking) setPlayedSeconds(playedSeconds);
//         }}
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

//       <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
//         <button onClick={() => skipTime(-10)}>⏪ 10s</button>
//         <button onClick={() => setPlaying(!playing)}>{playing ? 'Pause' : 'Play'}</button>
//         <button onClick={() => skipTime(10)}>10s ⏩</button>
//         <button onClick={() => setMuted(!muted)}>{muted ? 'Unmute' : 'Mute'}</button>
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
//       </div>

//       <div style={{ marginTop: '10px', textAlign: 'center' }}>
//         <input
//           type="range"
//           min={0}
//           max={duration}
//           step={0.1}
//           value={playedSeconds}
//           onMouseDown={() => setSeeking(true)}
//           onChange={handleSeekChange}
//           onMouseUp={() => setSeeking(false)}
//           style={{ width: '80%' }}
//         />
//         <div style={{ marginTop: '5px' }}>
//           {formatTime(playedSeconds)} / {formatTime(duration)}
//         </div>
//       </div>

//       <div style={{ marginTop: '15px', textAlign: 'center' }}>
//         <label>Speed: </label>
//         {[0.5, 1, 1.5, 2].map((rate) => (
//           <button
//             key={rate}
//             onClick={() => changeSpeed(rate)}
//             style={{
//               margin: '0 5px',
//               backgroundColor: playbackRate === rate ? '#333' : '#eee',
//               color: playbackRate === rate ? '#fff' : '#000',
//             }}
//           >
//             {rate}x
//           </button>
//         ))}
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







import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { apiUrl } from '../../services/ApplicantAPIService';

const VerifiedVideos = () => {
  const playerRef = useRef(null);
  const [videoList, setVideoList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
       const jwtToken = localStorage.getItem('jwtToken');
        const res = await axios.get(`${apiUrl}/file/allVideos`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (res.data.length > 0) {
          setVideoList(res.data);
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
      }
    };

    fetchVideos();
  }, []);

  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setPlayedSeconds(newTime);
    playerRef.current.seekTo(newTime, 'seconds');
  };

  const skipTime = (sec) => {
    const currentTime = playerRef.current.getCurrentTime();
    const newTime = currentTime + sec;
    playerRef.current.seekTo(newTime, 'seconds');
    setPlayedSeconds(newTime);
  };

  const changeSpeed = (rate) => setPlaybackRate(rate);

  const goToVideo = (index) => {
    setCurrentIndex(index);
    setPlayedSeconds(0);
  };

  const currentVideo = videoList[currentIndex];

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      {currentVideo ? (
        <>
          <ReactPlayer
            ref={playerRef}
            url={currentVideo}
            playing={playing}
            muted={muted}
            volume={volume}
            controls={false}
            playbackRate={playbackRate}
            width="100%"
            height="450px"
            onProgress={({ playedSeconds }) => !seeking && setPlayedSeconds(playedSeconds)}
            onDuration={(d) => setDuration(d)}
          />

          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
            <button onClick={() => skipTime(-10)}>⏪ 10s</button>
            <button onClick={() => setPlaying(!playing)}>{playing ? 'Pause' : 'Play'}</button>
            <button onClick={() => skipTime(10)}>10s ⏩</button>
            <button onClick={() => setMuted(!muted)}>{muted ? 'Unmute' : 'Mute'}</button>
            <label>
              Volume:
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                style={{ marginLeft: '5px' }}
              />
            </label>
          </div>

          {/* Seek Bar */}
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <input
              type="range"
              min={0}
              max={duration}
              step={0.1}
              value={playedSeconds}
              onMouseDown={() => setSeeking(true)}
              onChange={handleSeekChange}
              onMouseUp={() => setSeeking(false)}
              style={{ width: '80%' }}
            />
            <div style={{ marginTop: '5px' }}>
              {formatTime(playedSeconds)} / {formatTime(duration)}
            </div>
          </div>

          {/* Speed Buttons */}
          <div style={{ marginTop: '15px', textAlign: 'center' }}>
            <label>Speed: </label>
            {[0.5, 1, 1.5, 2].map((rate) => (
              <button
                key={rate}
                onClick={() => changeSpeed(rate)}
                style={{
                  margin: '0 5px',
                  backgroundColor: playbackRate === rate ? '#333' : '#eee',
                  color: playbackRate === rate ? '#fff' : '#000',
                }}
              >
                {rate}x
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
              onClick={() => goToVideo(currentIndex - 1)}
              disabled={currentIndex === 0}
              style={{ marginRight: '10px' }}
            >
              ⬅ Previous
            </button>
            <button
              onClick={() => goToVideo(currentIndex + 1)}
              disabled={currentIndex === videoList.length - 1}
            >
              Next ➡
            </button>
          </div>

          {/* Dots Navigation */}
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            {videoList.map((_, index) => (
              <span
                key={index}
                onClick={() => goToVideo(index)}
                style={{
                  cursor: 'pointer',
                  fontSize: '20px',
                  margin: '0 5px',
                  color: index === currentIndex ? 'blue' : 'gray',
                }}
              >
                ●
              </span>
            ))}
          </div>
        </>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading video...</p>
      )}
    </div>
  );
};

export default VerifiedVideos;
