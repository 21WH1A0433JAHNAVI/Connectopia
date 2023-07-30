import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Replace with your server address

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [brushColor, setBrushColor] = useState('#000000'); // Default brush color: black
  const [brushSize, setBrushSize] = useState(5); // Default brush size: 5

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
      freeDrawingBrush: 'Pencil', // Default brush shape: Pencil
    });
    setCanvas(canvas);

    socket.on('drawingData', (data) => {
      canvas.loadFromJSON(JSON.parse(data), canvas.renderAll.bind(canvas));
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (canvas) {
      const sendDrawingData = () => {
        socket.emit('updateDrawing', JSON.stringify(canvas.toJSON()));
      };

      canvas.on('path:created', sendDrawingData);

      // Clean up listeners on component unmount
      return () => {
        canvas.off('path:created', sendDrawingData);
      };
    }
  }, [canvas]);

  useEffect(() => {
    // Handle receiving drawing data from other clients
    socket.on('receiveDrawingData', (data) => {
      if (canvas) {
        canvas.loadFromJSON(JSON.parse(data), canvas.renderAll.bind(canvas));
      }
    });

    return () => {
      socket.off('receiveDrawingData');
    };
  }, [canvas]);

  const handleColorChange = (event) => {
    setBrushColor(event.target.value);
    if (canvas) {
      canvas.freeDrawingBrush.color = event.target.value;
    }
  };

  const handleSizeChange = (event) => {
    setBrushSize(parseInt(event.target.value, 10));
    if (canvas) {
      canvas.freeDrawingBrush.width = parseInt(event.target.value, 10);
    }
  };

  return (
    <div className='bg-light' >
      <h6>Real-Time Collaborative Whiteboard</h6>
      <div>
        <label>Color: </label>
        <input type="color" value={brushColor} onChange={handleColorChange} />
        <label>Size: </label>
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={handleSizeChange}
        />
      </div>
      <canvas ref={canvasRef} width={800} height={600} />
    </div>
  );
};

export default Whiteboard;
