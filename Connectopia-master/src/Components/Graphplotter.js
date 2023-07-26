import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Replace with your server address

const RealTimeGraphPlotter = () => {
  const [equation, setEquation] = useState('x^2'); // Default equation
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);

  useEffect(() => {
    socket.on('equation', (data) => {
      setEquation(data);
    });

    socket.on('graphData', ({ xValues, yValues }) => {
      setXValues(xValues);
      setYValues(yValues);
    });
  }, []);

  useEffect(() => {
    try {
      const xData = [];
      const yData = [];

      // Increase data density for a smoother plot
      const stepSize = 0.1;
      for (let x = -10; x <= 10; x += stepSize) {
        xData.push(x);
        const y = eval(equation.replace(/x/g, x));
        yData.push(y);
      }

      const graphData = { xValues: xData, yValues: yData };
      socket.emit('updateGraph', graphData);
    } catch (error) {
      console.error(error);
    }
  }, [equation]);

  const handleEquationChange = (event) => {
    setEquation(event.target.value);
  };

  return (
    <div>
      <h1>Real-Time Graph Plotter (Single Variable)</h1>
      <div>
        <input type="text" value={equation} onChange={handleEquationChange} />
        <button onClick={() => setEquation('x^2')}>Default</button>
      </div>
      <Plot
        data={[
          {
            x: xValues,
            y: yValues,
            type: 'scatter',
            mode: 'lines', // Set the mode to 'lines' to display lines
          },
        ]}
        layout={{
          title: 'Graph Plotter',
          xaxis: { title: 'X-axis' },
          yaxis: { title: 'Y-axis' },
        }}
      />
    </div>
  );
};

export default RealTimeGraphPlotter;
