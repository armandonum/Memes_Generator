import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import '../styles/MemeGenerator.css'; // Importamos el CSS

const MemeGenerator = () => {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [imageUrl, setImageUrl] = useState('https://i.imgflip.com/1bij.jpg'); // Imagen por defecto
  const memeRef = useRef(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleDownload = () => {
    if (memeRef.current) {
      html2canvas(memeRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'meme.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };
  

  return (
    <div className="meme-container">
      <h1>Meme Generator</h1>

      <div className='inputs'>
        <input
          type="text"
          placeholder="Top Text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bottom Text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
        />
      </div>

      <div className='read_file'>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
   

      <div
        className="meme"
        ref={memeRef}
      >
        <img src={imageUrl} alt="Meme" style={{ width: '100%' }} />
        <h2 className="top-text">{topText}</h2>
        <h2 className="bottom-text">{bottomText}</h2>
      </div>

      <button onClick={handleDownload}>Download Meme</button>
    </div>
  );
};

export default MemeGenerator;
