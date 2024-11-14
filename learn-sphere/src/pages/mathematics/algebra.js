import React, { useState } from 'react';
import Sketch from 'react-p5';

const Algebra = () => {
  // State for equation coefficients
  const [coefficients, setCoefficients] = useState({ a: 1, b: 0, c: 0 });
  
  let particles = [];
  let gridSize = 40;
  let xOffset = 0;
  let yOffset = 0;
  let zoom = 1;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth - 280, p5.windowHeight - 100).parent(canvasParentRef);
    
    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle(p5));
    }

    // Center the coordinate system
    xOffset = p5.width / 2;
    yOffset = p5.height / 2;
  };

  const draw = (p5) => {
    p5.background(21, 21, 33);
    
    // Draw grid and axes
    drawGrid(p5);
    
    // Draw quadratic function
    drawQuadratic(p5);
    
    // Draw particles in background
    for (let particle of particles) {
      particle.update(p5);
      particle.display(p5);
    }

    // Draw mathematical symbols
    drawMathSymbols(p5);
    
    // Draw equation at the top
    drawEquation(p5);
  };

  const drawGrid = (p5) => {
    p5.stroke(255, 255, 255, 20);
    p5.strokeWeight(1);

    // Draw vertical grid lines
    for (let x = -p5.width; x < p5.width; x += gridSize * zoom) {
      let screenX = x * zoom + xOffset;
      p5.line(screenX, 0, screenX, p5.height);
    }

    // Draw horizontal grid lines
    for (let y = -p5.height; y < p5.height; y += gridSize * zoom) {
      let screenY = y * zoom + yOffset;
      p5.line(0, screenY, p5.width, screenY);
    }

    // Draw axes
    p5.stroke(255, 255, 255, 100);
    p5.strokeWeight(2);
    p5.line(0, yOffset, p5.width, yOffset); // x-axis
    p5.line(xOffset, 0, xOffset, p5.height); // y-axis
  };

  const drawQuadratic = (p5) => {
    p5.stroke(64, 192, 237);
    p5.strokeWeight(3);
    p5.noFill();
    
    p5.beginShape();
    for (let px = -p5.width/2; px < p5.width/2; px += 2) {
      let x = (px - xOffset) / (gridSize * zoom);
      let y = coefficients.a * x * x + coefficients.b * x + coefficients.c;
      let screenY = -y * gridSize * zoom + yOffset;
      p5.vertex(px + xOffset, screenY);
    }
    p5.endShape();

    // Draw vertex point
    let vertexX = -coefficients.b / (2 * coefficients.a);
    let vertexY = coefficients.a * vertexX * vertexX + coefficients.b * vertexX + coefficients.c;
    let screenVertexX = vertexX * gridSize * zoom + xOffset;
    let screenVertexY = -vertexY * gridSize * zoom + yOffset;
    
    p5.fill(255);
    p5.noStroke();
    p5.circle(screenVertexX, screenVertexY, 8);
    
    // Draw vertex coordinates
    p5.textSize(14);
    p5.text(`Vertex: (${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})`, 
            screenVertexX + 10, screenVertexY - 10);
  };

  const drawEquation = (p5) => {
    p5.fill(255);
    p5.noStroke();
    p5.textSize(24);
    p5.textAlign(p5.CENTER);
    let equation = `f(x) = ${coefficients.a}x² + ${coefficients.b}x + ${coefficients.c}`;
    p5.text(equation, p5.width/2, 40);
  };

  class Particle {
    constructor(p5) {
      this.init(p5);
    }

    init(p5) {
      this.pos = p5.createVector(p5.random(p5.width), p5.random(p5.height));
      this.vel = p5.createVector(p5.random(-1, 1), p5.random(-1, 1));
      this.size = p5.random(2, 5);
      this.color = p5.color(
        p5.random([64, 96, 192]),
        p5.random([102, 165, 219]),
        p5.random([237, 255, 248]),
        p5.random(100, 150)
      );
    }

    update(p5) {
      this.pos.add(this.vel);
      if (this.pos.x < 0 || this.pos.x > p5.width) this.vel.x *= -1;
      if (this.pos.y < 0 || this.pos.y > p5.height) this.vel.y *= -1;
      if (p5.random(1) < 0.02) this.vel.rotate(p5.random(-0.5, 0.5));
    }

    display(p5) {
      p5.noStroke();
      p5.fill(this.color);
      p5.circle(this.pos.x, this.pos.y, this.size);
    }
  }

  const drawMathSymbols = (p5) => {
    const symbols = ['∫', '∑', 'π', '√', '∞', '×', '÷', '±', '≠', '≈'];
    p5.textSize(20);
    p5.textStyle(p5.BOLD);
    p5.fill(255, 255, 255, 30);

    for (let i = 0; i < 5; i++) {
      const x = p5.random(p5.width);
      const y = p5.random(p5.height);
      const symbol = symbols[Math.floor(p5.random(symbols.length))];
      p5.text(symbol, x, y);
    }
  };

  const mousePressed = (p5) => {
    dragging = true;
    lastX = p5.mouseX;
    lastY = p5.mouseY;
  };

  const mouseReleased = () => {
    dragging = false;
  };

  const mouseDragged = (p5) => {
    if (dragging) {
      xOffset += p5.mouseX - lastX;
      yOffset += p5.mouseY - lastY;
      lastX = p5.mouseX;
      lastY = p5.mouseY;
    }
  };

  const mouseWheel = (p5, event) => {
    let zoomChange = -event.delta * 0.001;
    zoom = p5.constrain(zoom + zoomChange, 0.1, 5);
    return false;
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth - 280, p5.windowHeight - 100);
    xOffset = p5.width / 2;
    yOffset = p5.height / 2;
  };
  return (
    <div className="min-h-screen pb-8">
      {/* Title Section */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
          Interactive Algebra
        </h1>
        <p className="text-gray-400 max-w-2xl animate-slide-up">
          Explore quadratic functions in real-time. Drag to pan, scroll to zoom, and use the controls
          to modify the equation.
        </p>
      </div>

      {/* Controls Section */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4">
          <label className="text-white mb-2 block">Coefficient a</label>
          <input
            type="range"
            min="-5"
            max="5"
            step="0.1"
            value={coefficients.a}
            onChange={(e) => setCoefficients({...coefficients, a: parseFloat(e.target.value)})}
            className="w-48"
          />
          <span className="text-white ml-2">{coefficients.a}</span>
        </div>
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4">
          <label className="text-white mb-2 block">Coefficient b</label>
          <input
            type="range"
            min="-10"
            max="10"
            step="0.5"
            value={coefficients.b}
            onChange={(e) => setCoefficients({...coefficients, b: parseFloat(e.target.value)})}
            className="w-48"
          />
          <span className="text-white ml-2">{coefficients.b}</span>
        </div>
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4">
          <label className="text-white mb-2 block">Coefficient c</label>
          <input
            type="range"
            min="-10"
            max="10"
            step="0.5"
            value={coefficients.c}
            onChange={(e) => setCoefficients({...coefficients, c: parseFloat(e.target.value)})}
            className="w-48"
          />
          <span className="text-white ml-2">{coefficients.c}</span>
        </div>
      </div>

      {/* Graph Section */}
      <div className="relative h-[400px] mb-8 bg-white/5 rounded-xl overflow-hidden">
        <Sketch 
          setup={setup}
          draw={draw}
          mousePressed={mousePressed}
          mouseReleased={mouseReleased}
          mouseDragged={mouseDragged}
          mouseWheel={mouseWheel}
          windowResized={windowResized}
        />
      </div>

      {/* Content Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Linear Equations Card */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-semibold text-white mb-3">Linear Equations</h3>
          <p className="text-gray-400">Master the basics of solving linear equations and understanding their applications.</p>
        </div>

        {/* Quadratic Equations Card */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-semibold text-white mb-3">Quadratic Equations</h3>
          <p className="text-gray-400">Learn to solve and graph quadratic equations using various methods.</p>
        </div>

        {/* Polynomials Card */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-semibold text-white mb-3">Polynomials</h3>
          <p className="text-gray-400">Explore operations with polynomials and factoring techniques.</p>
        </div>

        {/* Functions Card */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-semibold text-white mb-3">Functions</h3>
          <p className="text-gray-400">Understand function notation, domain, range, and graphing.</p>
        </div>

        {/* Inequalities Card */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-semibold text-white mb-3">Inequalities</h3>
          <p className="text-gray-400">Learn to solve and graph linear and quadratic inequalities.</p>
        </div>

        {/* Systems of Equations Card */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-semibold text-white mb-3">Systems of Equations</h3>
          <p className="text-gray-400">Solve systems using substitution, elimination, and matrices.</p>
        </div>
      </div>
    </div>
  );
};

export default Algebra;