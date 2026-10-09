// frontend/src/components/MatterCanvas.jsx

import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import '../index.css'

const MatterCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Replicating your original code inside the useEffect hook
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    Matter.use('matter-attractors');
    Matter.use('matter-wrap');

    const Engine = Matter.Engine,
      Events = Matter.Events,
      Runner = Matter.Runner,
      Render = Matter.Render,
      World = Matter.World,
      Body = Matter.Body,
      Common = Matter.Common,
      Bodies = Matter.Bodies;

    const engine = Engine.create();
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;
    engine.world.gravity.scale = 0.1;

    const render = Render.create({
      element: canvas.parentElement,
      canvas: canvas,
      engine: engine,
      options: {
        showVelocity: false,
        width: dimensions.width,
        height: dimensions.height,
        wireframes: false,
        background: 'transparent',
      },
    });

    const runner = Runner.create();
    runner.delta = 1000 / 30;

    const world = engine.world;
    world.gravity.scale = 0;

    const isInitialLight = document.documentElement.getAttribute('data-theme') === 'light';

    const attractiveBody = Bodies.circle(
      render.options.width / 3,
      render.options.height / 3,
      Math.max(dimensions.width / 30, dimensions.height / 30) / 2,
      {
        render: {
          fillStyle: isInitialLight ? 'transparent' : '#000',
          strokeStyle: isInitialLight ? 'transparent' : '#000',
          lineWidth: 0,
        },
        isStatic: true,
        plugin: {
          attractors: [
            function (bodyA, bodyB) {
              return {
                x: (bodyA.position.x - bodyB.position.x) * 2e-7,
                y: (bodyA.position.y - bodyB.position.y) * 2e-7,
              };
            },
          ],
        },
      }
    );

    World.add(world, attractiveBody);

    const pastelPalettes = [
      'rgba(186, 230, 253, 0.48)', // pastel sky blue
      'rgba(191, 219, 254, 0.48)', // pastel light blue
      'rgba(167, 243, 208, 0.48)', // pastel mint green
      'rgba(187, 247, 208, 0.45)', // pastel pale green
      'rgba(254, 226, 226, 0.38)', // soft blush
      'rgba(243, 232, 255, 0.40)', // soft lavender
    ];

    for (let i = 0; i < 30; i++) {
      let x = Common.random(0, render.options.width);
      let y = Common.random(0, render.options.height);
      let s = Common.random() > 0.6 ? Common.random(10, 80) : Common.random(4, 60);
      let polygonNumber = Common.random(3, 6);
      const colorIndex = Math.floor(Common.random(0, pastelPalettes.length));

      const body = Bodies.polygon(x, y, polygonNumber, s, {
        mass: s / 20,
        friction: 0,
        frictionAir: 0.02,
        angle: Math.round(Math.random() * 360),
        render: {
          fillStyle: isInitialLight ? pastelPalettes[colorIndex] : '#222222',
          strokeStyle: isInitialLight ? 'rgba(148, 163, 184, 0.28)' : '#000000',
          lineWidth: isInitialLight ? 1.5 : 2,
        },
      });
      body.customType = 'polygon';
      body.colorIndex = colorIndex;

      World.add(world, body);

      const r = Common.random(0, 1);
      const c1Index = Math.floor(Common.random(0, pastelPalettes.length));
      const circle1 = Bodies.circle(x, y, Common.random(2, 8), {
        mass: 0.1,
        friction: 0,
        frictionAir: 0.01,
        render: {
          fillStyle: isInitialLight 
            ? pastelPalettes[c1Index] 
            : (r > 0.3 ? '#27292d' : '#444444'),
          strokeStyle: isInitialLight ? 'rgba(148, 163, 184, 0.25)' : '#000000',
          lineWidth: isInitialLight ? 1 : 2,
        },
      });
      circle1.customType = 'circle1';
      circle1.colorIndex = c1Index;
      circle1.randomVal = r;

      World.add(world, circle1);

      const c2Index = Math.floor(Common.random(0, pastelPalettes.length));
      const circle2 = Bodies.circle(x, y, Common.random(2, 20), {
        mass: 6,
        friction: 0,
        frictionAir: 0,
        render: {
          fillStyle: isInitialLight 
            ? pastelPalettes[c2Index] 
            : (r > 0.3 ? '#334443' : '#6b6666'),
          strokeStyle: isInitialLight ? 'rgba(148, 163, 184, 0.25)' : '#111111',
          lineWidth: isInitialLight ? 1 : 4,
        },
      });
      circle2.customType = 'circle2';
      circle2.colorIndex = c2Index;
      circle2.randomVal = r;

      World.add(world, circle2);

      const c3Index = Math.floor(Common.random(0, pastelPalettes.length));
      const circle3 = Bodies.circle(x, y, Common.random(2, 30), {
        mass: 0.2,
        friction: 0.6,
        frictionAir: 0.8,
        render: {
          fillStyle: isInitialLight ? pastelPalettes[c3Index] : '#191919',
          strokeStyle: isInitialLight ? 'rgba(148, 163, 184, 0.25)' : '#111111',
          lineWidth: isInitialLight ? 1 : 3,
        },
      });
      circle3.customType = 'circle3';
      circle3.colorIndex = c3Index;
      circle3.randomVal = r;

      World.add(world, circle3);
    }

    // Apply color changes dynamically on theme toggle
    const applyThemeColors = (themeName) => {
      const isLight = themeName === 'light';
      attractiveBody.render.fillStyle = isLight ? 'transparent' : '#000';
      attractiveBody.render.strokeStyle = isLight ? 'transparent' : '#000';

      world.bodies.forEach((b) => {
        if (b.customType === 'polygon') {
          b.render.fillStyle = isLight ? pastelPalettes[b.colorIndex] : '#222222';
          b.render.strokeStyle = isLight ? 'rgba(148, 163, 184, 0.28)' : '#000000';
          b.render.lineWidth = isLight ? 1.5 : 2;
        } else if (b.customType === 'circle1') {
          b.render.fillStyle = isLight ? pastelPalettes[b.colorIndex] : (b.randomVal > 0.3 ? '#27292d' : '#444444');
          b.render.strokeStyle = isLight ? 'rgba(148, 163, 184, 0.25)' : '#000000';
          b.render.lineWidth = isLight ? 1 : 2;
        } else if (b.customType === 'circle2') {
          b.render.fillStyle = isLight ? pastelPalettes[b.colorIndex] : (b.randomVal > 0.3 ? '#334443' : '#6b6666');
          b.render.strokeStyle = isLight ? 'rgba(148, 163, 184, 0.25)' : '#111111';
          b.render.lineWidth = isLight ? 1 : 4;
        } else if (b.customType === 'circle3') {
          b.render.fillStyle = isLight ? pastelPalettes[b.colorIndex] : '#191919';
          b.render.strokeStyle = isLight ? 'rgba(148, 163, 184, 0.25)' : '#111111';
          b.render.lineWidth = isLight ? 1 : 3;
        }
      });
    };

    const handleThemeEvent = (e) => {
      applyThemeColors(e.detail?.theme);
    };
    window.addEventListener('themeChange', handleThemeEvent);

    const mousePos = { x: dimensions.width / 2, y: dimensions.height / 2 };

    const handleMouseMove = (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    Events.on(engine, 'afterUpdate', () => {
      Body.translate(attractiveBody, {
        x: (mousePos.x - attractiveBody.position.x) * 0.08,
        y: (mousePos.y - attractiveBody.position.y) * 0.08,
      });
    });

    Runner.run(runner, engine);
    Render.run(render);

    // Cleanup function
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Events.off(engine, 'afterUpdate');
      World.clear(world, false);
      Engine.clear(engine);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('themeChange', handleThemeEvent);
    };
  }, []);

  return (
    <div id="wrapper-canvas-container">
      <canvas ref={canvasRef} id="wrapper-canvas"></canvas>
    </div>
  );
};

export default MatterCanvas;