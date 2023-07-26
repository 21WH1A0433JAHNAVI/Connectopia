import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { compile } from 'mathjs';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Replace with your server address

const GraphPlotter = () => {
  const [equation, setEquation] = useState('x^2 + y^2'); // Default equation
  const [users, setUsers] = useState({});

  useEffect(() => {
    // Listen for the initial equation from the server
    socket.on('equation', (data) => {
      setEquation(data);
    });

    // Listen for updates from the server
    socket.on('updateGraph', (data) => {
      setUsers(data);
    });
  }, []);

  useEffect(() => {
    try {
      const compiledEquation = compile(equation);

      const xValues = [];
      const yValues = [];
      const zValues = [];

      for (let x = -10; x <= 10; x += 1) {
        for (let y = -10; y <= 10; y += 1) {
          xValues.push(x);
          yValues.push(y);

          const scope = { x, y };
          const result = compiledEquation.evaluate(scope);
          zValues.push(result);
        }
      }

      const data = { equation, xValues, yValues, zValues };
      socket.emit('updateGraph', data);
    } catch (error) {
      console.error(error);
    }
  }, [equation]);

  const handleEquationChange = (event) => {
    setEquation(event.target.value);
  };

  return (
    <div>
      <h1>Collaborative Graph Plotter</h1>
      <div>
        <input type="text" value={equation} onChange={handleEquationChange} />
        <button onClick={() => setEquation('x^2 + y^2')}>Default</button>
      </div>
      <Plot
        data={[
          {
            x: users[socket.id]?.xValues || [],
            y: users[socket.id]?.yValues || [],
            z: users[socket.id]?.zValues || [],
            type: 'surface',
          },
        ]}
        layout={{
          title: 'Graph Plotter',
          scene: {
            xaxis: { title: 'X-axis' },
            yaxis: { title: 'Y-axis' },
            zaxis: { title: 'Z-axis' },
          },
        }}
      />
      <div>
        <h3>Collaborators:</h3>
        <ul>
          {Object.entries(users).map(([id, user]) => (
            <li key={id}>{`User ${id}: ${user.equation}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GraphPlotter;
