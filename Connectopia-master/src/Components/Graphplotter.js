import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { compile } from 'mathjs';
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
      const compiledEquation = compile(equation);

      const xValues = [];
      const yValues = [];

      // Increase data density for a smoother plot
      const stepSize = 0.01;
      for (let x = -10; x <= 10; x += stepSize) {
        xValues.push(x);
        const scope = { x };
        const result = compiledEquation.evaluate(scope);
        yValues.push(result);
      }

      const graphData = { xValues, yValues };
      socket.emit('updateGraph', graphData);
    } catch (error) {
      console.error(error);
    }
  }, [equation]);

  const handleEquationChange = (event) => {
    setEquation(event.target.value);
  };

  return (
    <div className='bg-dark text-light p-3'>
      <h6>Real-Time Graph Plotter (Single Variable)</h6>
      <div className='d-flex gap-2 px-2 mb-2'>
        <input type="text" className='form-control ' value={equation} onChange={handleEquationChange} />
        <button className='btn btn-light' onClick={() => setEquation('x^2')}>Default</button>
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
