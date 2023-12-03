/* eslint-disable
   no-param-reassign,
   react/no-this-in-sfc,
   @typescript-eslint/no-use-before-define */

import React, { createRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import pastConferences from './past-conferences.json';
import { Box, Typography } from '@mui/material';

declare const planetaryjs: any;
declare const topojson: any;

// initial longitude and latitude that specify the point that faces the user
const CANVAS_SIZE = 500; // internal width and height of the canvas
const INIT_DELAY = 500; // ms
const INIT_LNG = -71.10561;
const INIT_LAT = 42.3751;
const REPEAT_DELAY = 1000; // ms
const ROTATE_DURATION = 2; // s

const OCEAN_COLOR = '#D6EFFF';
const LAND_COLOR = '#A51C30';
const BORDER_COLOR = '#FFFFFF';
const LAKE_COLOR = '#D6EFFF';
const PING_COLOR = 'white';

// This plugin takes lake data from the special
// TopoJSON we're loading and draws them on the map.
function lakes(options: any = {}) {
  let lakes2 = null as any;
  return (planet: any) => {
    planet.onInit(() => {
      // We can access the data loaded from the TopoJSON plugin
      // on its namespace on `planet.plugins`. We're loading a custom
      // TopoJSON file with an object called "ne_110m_lakes".
      const { world } = planet.plugins.topojson;
      lakes2 = topojson.feature(world, world.objects.ne_110m_lakes);
    });

    planet.onDraw(() => {
      planet.withSavedContext((context: any) => {
        context.beginPath();
        planet.path.context(context)(lakes2);
        context.fillStyle = options.fill || 'black';
        context.fill();
      });
    });
  };
}

export default function Planet() {
  const canvasRef = createRef<HTMLCanvasElement>();
  const [confData, setConfData] = useState({
    location: pastConferences[0].location,
    year: pastConferences[0].year,
    title: pastConferences[0].title,
  });

  useLayoutEffect(() => {
    const globe = planetaryjs.planet();
    // The `earth` plugin draws the oceans and the land; it's actually
    // a combination of several separate built-in plugins.
    //
    // Note that we're loading a special TopoJSON file
    // (world-110m-withlakes.json) so we can render lakes.
    globe.loadPlugin(planetaryjs.plugins.earth({
      topojson: { file: `${process.env.PUBLIC_URL}/js/world-110m-withlakes.json` },
      oceans: { fill: OCEAN_COLOR },
      land: { fill: LAND_COLOR },
      borders: { stroke: BORDER_COLOR },
    }));
    // Load our custom `lakes` plugin to draw lakes; see below.
    globe.loadPlugin(lakes({
      fill: LAKE_COLOR,
    }));
    // The `pings` plugin draws animated pings on the globe.
    globe.loadPlugin(planetaryjs.plugins.pings());
    // The `zoom` and `drag` plugins enable
    // manipulating the globe with the mouse.
    // globe.loadPlugin(planetaryjs.plugins.zoom({
    //   scaleExtent: [100, CANVAS_SIZE],
    // }));

    let currTween = null as gsap.core.Tween | null;

    // stores the rotation object for the globe
    // harvard's coordinates
    const obj = { lambda: -INIT_LNG, phi: -INIT_LAT, gamma: 0 };
    const target = { lat: 0, lng: 0 }; // latitude and longitude of conference location
    let index = -1;
    let pingInterval = null as NodeJS.Timeout | null;
    const timeouts = [] as NodeJS.Timeout[];
    // recursively iterate to the next location
    const startTween = () => {
      // increment the index and set the next target
      index = (index + 1) % pastConferences.length;
      const {
        location, year, title, lat, lng,
      } = pastConferences[index];
      target.lat = lat;
      target.lng = lng;

      // brief timeout so the text transitions as the same time as the rotation
      timeouts.push(setTimeout(() => setConfData({ location, year, title }), REPEAT_DELAY / 2));

      // red pings at next destination
      if (pingInterval) clearInterval(pingInterval);
      pingInterval = setInterval(() => globe.plugins.pings.add(target.lng, target.lat, {
        color: PING_COLOR,
        ttl: 2000,
        angle: 5 + Math.random() * 15,
      }), 400);

      // start tween to next destination
      currTween = gsap.to(obj, {
        duration: ROTATE_DURATION,
        lambda: -target.lng as number,
        phi: -target.lat as number,
        gamma: 0,
        ease: 'power2.inOut',
        onUpdate() {
          globe.projection.rotate([obj.lambda, obj.phi, obj.gamma]);
        },
        onComplete() {
          timeouts.push(setTimeout(startTween, REPEAT_DELAY));
        },
      });
    };

    // globe.loadPlugin(planetaryjs.plugins.drag({
    //   // dragging should kill the current tween and give control to the user
    //   onDragStart() {
    //     if (currTween) currTween.kill();
    //   },
    //   // on release, we set the starting position of the tween to the current
    //   // position and resume the animations
    //   onDragEnd() {
    //     index -= 1;
    //     [obj.lambda, obj.phi, obj.gamma] = globe.projection.rotate();
    //     startTween();
    //   },
    // }));

    // wait at the initial coordinates
    timeouts.push(setTimeout(startTween, INIT_DELAY));

    const canvas = canvasRef.current as HTMLCanvasElement;

    // Special code to handle high-density displays (e.g. retina, some phones)
    // In the future, Planetary.js will handle this by itself (or via a plugin).
    if (window.devicePixelRatio === 2) {
      canvas.width = CANVAS_SIZE * 2;
      canvas.height = CANVAS_SIZE * 2;
      const context = canvas.getContext('2d');
      if (context) context.scale(2, 2);

      // Set up the globe's initial scale, offset, and rotation.
      globe.projection.scale(canvas.width / 4)
        .translate([canvas.width / 4, canvas.width / 4])
        .rotate([obj.lambda, obj.phi, obj.gamma]);
    } else {
      // Set up the globe's initial scale, offset, and rotation.
      globe.projection.scale(canvas.width / 2)
        .translate([canvas.width / 2, canvas.width / 2]);
    }

    globe.projection.rotate([obj.lambda, obj.phi, obj.gamma]);

    // Draw that globe!
    globe.draw(canvas);

    return () => {
      if (currTween) currTween.kill();
      if (pingInterval) clearInterval(pingInterval);
      timeouts.forEach((to) => clearTimeout(to));
    };
    // eslint-disable-next-line
  }, []);

return (
    <Box
      sx={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '40vw',
        // padding: 8,
        // backgroundColor: 'red',
        gap: '1rem',
        position: 'relative', // Set the position to relative
      }}
    >
    <Typography variant="h5" fontWeight="bold">
        {confData.location} {confData.year}
    </Typography>
    <Typography variant="body1" sx={{ fontStyle: 'italic', fontSize: 'xl' }}>
        {confData.title}
    </Typography>
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        style={{
          width: '30vw',
          height: 'auto',
          aspectRatio: '1/1',
        }}
      />
    </Box>
  );
}