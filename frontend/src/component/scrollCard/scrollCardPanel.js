import React from 'react';
import './scrollCardPanel.css'; // Import your CSS file for styling

const ScrollCardPanel = ({ data }) => {
  return (
    <div className="scroll-card-panel">
      console.log({data});
      {data.map((item) => (
        <div key={item.id} className="card">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ScrollCardPanel;
