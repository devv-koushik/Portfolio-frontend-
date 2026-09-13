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

    const attractiveBody = Bodies.circle(
      render.options.width / 3,
      render.options.height / 3,
      Math.max(dimensions.width / 30, dimensions.height / 30) / 2,
      {
        render: {
          fillStyle: '#000',
          strokeStyle: '#000',
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

    for (let i = 0; i < 30; i++) {
      let x = Common.random(0, render.options.width);
      let y = Common.random(0, render.options.height);
      let s = Common.random() > 0.6 ? Common.random(10, 80) : Common.random(4, 60);
      let polygonNumber = Common.random(3, 6);

      const body = Bodies.polygon(x, y, polygonNumber, s, {
        mass: s / 20,
        friction: 0,
        frictionAir: 0.02,
        angle: Math.round(Math.random() * 360),
        render: {
          fillStyle: '#222222',
          strokeStyle: '#000000',
          lineWidth: 2,
        },
      });

      World.add(world, body);

      const r = Common.random(0, 1);
      const circle1 = Bodies.circle(x, y, Common.random(2, 8), {
        mass: 0.1,
        friction: 0,
        frictionAir: 0.01,
        render: {
          fillStyle: r > 0.3 ? '#27292d' : '#444444',
          strokeStyle: '#000000',
          lineWidth: 2,
        },
      });

      World.add(world, circle1);

      const circle2 = Bodies.circle(x, y, Common.random(2, 20), {
        mass: 6,
        friction: 0,
        frictionAir: 0,
        render: {
          fillStyle: r > 0.3 ? '#334443' : '#6b6666',
          strokeStyle: '#111111',
          lineWidth: 4,
        },
      });

      World.add(world, circle2);

      const circle3 = Bodies.circle(x, y, Common.random(2, 30), {
        mass: 0.2,
        friction: 0.6,
        frictionAir: 0.8,
        render: {
          fillStyle: '#191919',
          strokeStyle: '#111111',
          lineWidth: 3,
        },
      });

      World.add(world, circle3);
    }

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
    };
  }, []);

  return (
    <div id="wrapper-canvas-container">
      <canvas ref={canvasRef} id="wrapper-canvas"></canvas>
    </div>
  );
};

export default MatterCanvas;