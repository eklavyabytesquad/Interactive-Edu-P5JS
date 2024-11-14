import React from 'react';
import Sketch from 'react-p5';

const Trigonometry = () => {
  let time = 0;
  let waves = [];

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth - 280, p5.windowHeight - 100).parent(canvasParentRef);
    // Initialize different waves
    waves = [
      { amplitude: 50, frequency: 1, phase: 0, color: p5.color(64, 102, 237, 150) },    // Sine
      { amplitude: 40, frequency: 2, phase: p5.PI/4, color: p5.color(192, 165, 248, 150) }, // Cosine
      { amplitude: 30, frequency: 3, phase: p5.PI/2, color: p5.color(96, 219, 219, 150) }   // Tangent
    ];
  };

  const draw = (p5) => {
    p5.background(21, 21, 33);
    drawGrid(p5);
    
    // Draw unit circle
    drawUnitCircle(p5);
    
    // Draw waves
    drawWaves(p5);
    
    time += 0.02;
  };

  const drawGrid = (p5) => {
    p5.stroke(255, 255, 255, 20);
    p5.strokeWeight(1);
    
    // Draw vertical lines
    for (let x = 0; x < p5.width; x += 50) {
      p5.line(x, 0, x, p5.height);
    }
    
    // Draw horizontal lines
    for (let y = 0; y < p5.height; y += 50) {
      p5.line(0, y, p5.width, y);
    }
  };

  const drawUnitCircle = (p5) => {
    const centerX = p5.width / 4;
    const centerY = p5.height / 2;
    const radius = 100;
    
    // Draw circle
    p5.noFill();
    p5.stroke(255, 255, 255, 100);
    p5.strokeWeight(2);
    p5.circle(centerX, centerY, radius * 2);
    
    // Draw axes
    p5.line(centerX - radius - 20, centerY, centerX + radius + 20, centerY);
    p5.line(centerX, centerY - radius - 20, centerX, centerY + radius + 20);
    
    // Draw moving point
    const x = centerX + radius * p5.cos(time);
    const y = centerY + radius * p5.sin(time);
    p5.fill(255);
    p5.noStroke();
    p5.circle(x, y, 8);
    
    // Draw lines to axes
    p5.stroke(255, 255, 255, 100);
    p5.line(x, y, centerX, y);
    p5.line(x, y, x, centerY);
  };

  const drawWaves = (p5) => {
    waves.forEach((wave, index) => {
      p5.stroke(wave.color);
      p5.strokeWeight(2);
      p5.noFill();
      
      p5.beginShape();
      for (let x = 0; x < p5.width / 2; x += 5) {
        const xPos = x + p5.width / 2;
        const yPos = p5.height / 2 + 
          wave.amplitude * p5.sin(wave.frequency * (x * 0.02) + time + wave.phase);
        p5.vertex(xPos, yPos);
      }
      p5.endShape();
    });
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth - 280, p5.windowHeight - 100);
  };

  return (
    <div className="h-full">
      {/* Title Section */}
      <div className="relative z-10 mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
          Trigonometry
        </h1>
        <p className="text-gray-400 max-w-2xl animate-slide-up">
          Discover the fascinating world of trigonometry, where circles, angles, and waves converge
          to create powerful mathematical tools.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="relative">
        {/* P5 Canvas Container */}
        <div className="absolute inset-0 -z-10">
          <Sketch 
            setup={setup} 
            draw={draw} 
            windowResized={windowResized}
          />
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {/* Basic Ratios Card */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-semibold text-white mb-3">Basic Ratios</h3>
            <p className="text-gray-400">Master sine, cosine, and tangent ratios in right triangles.</p>
          </div>

          {/* Unit Circle Card */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-semibold text-white mb-3">Unit Circle</h3>
            <p className="text-gray-400">Understand angles, radians, and their relationship to trig functions.</p>
          </div>

          {/* Graphs Card */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-semibold text-white mb-3">Graphs</h3>
            <p className="text-gray-400">Explore the periodic nature of trigonometric functions.</p>
          </div>

          {/* Identities Card */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-semibold text-white mb-3">Identities</h3>
            <p className="text-gray-400">Learn fundamental trigonometric identities and their proofs.</p>
          </div>

          {/* Applications Card */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-semibold text-white mb-3">Applications</h3>
            <p className="text-gray-400">Apply trigonometry to real-world problems and physics.</p>
          </div>

          {/* Advanced Topics Card */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-semibold text-white mb-3">Advanced Topics</h3>
            <p className="text-gray-400">Explore inverse functions and complex trigonometric equations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trigonometry;