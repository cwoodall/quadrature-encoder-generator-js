/** 
 * Notes about making nice Optical Encoders!
 *
 * - Draw from outermost inward works pretty well. Fill each radiuses circle white
 * - Figure out scaling from SVG to realworld
 *
 * - Draw in rectangular box with outermost disk diameter = to drawing area
 */
paper.path("M200 200A100,100 0 0,0 300,300L300 200").attr({fill: "black"});
paper.path("M200 200A100,100 0 0,1 400,200L200 200").attr({fill: "white"});
paper.path("M400 200A100,100 0 0,0 300,100L300 200").attr({fill: "black"});
paper.path("M400 200A100,100 0 0,1 300,300L300 200").attr({fill: "white"});

paper.circle(300,200, 50).attr({fill: "white"});

paper.path("M250 200A50,50 0 0,0 350,200L250 200").attr({fill: "black"});

