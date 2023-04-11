// Author: Mary Jiang
// Title: Blooms

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rand(vec2 uv){
    return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
}

float rand(float n) {
    return fract(sin(n) * 43758.5453123);
}

float circle(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*1.01),
                         dot(dist,dist)*4.0 + rand(_st) * 300. );
}

float rand2D(in vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float dotNoise2D(in float x, in float y, in float fractionalMaxDotSize, in float dDensity)
{
    float integer_x = x - fract(x);
    float fractional_x = x - integer_x;

    float integer_y = y - fract(y);
    float fractional_y = y - integer_y;

    if (rand2D(vec2(integer_x+1.0, integer_y +1.0)) > dDensity)
       {return 0.0;}

    float xoffset = (rand2D(vec2(integer_x, integer_y)) -0.5);
    float yoffset = (rand2D(vec2(integer_x+1.0, integer_y)) - 0.5);
    float dotSize = 0.5 * fractionalMaxDotSize * max(0.25,rand2D(vec2(integer_x, integer_y+1.0)));

    vec2 truePos = vec2 (0.5 + xoffset * (1.0 - 2.0 * dotSize) , 0.5 + yoffset * (1.0 -2.0 * dotSize));

    float distance = length(truePos - vec2(fractional_x, fractional_y)) + sin(u_time * 1.5 + xoffset*2.5) * .1;

    return 1. - smoothstep (0.3 * dotSize, 1.0* dotSize, distance) - rand(vec2(x,y));

}
float DotNoise2D(in vec2 coord, in float wavelength, in float fractionalMaxDotSize, in float dDensity)
{
   return dotNoise2D(coord.x/wavelength, coord.y/wavelength, fractionalMaxDotSize, dDensity);
}

void main() { 
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv.x *= u_resolution.x/u_resolution.y;
    
    float t = u_time * .5;
    
 	vec3 color = vec3(0.);
    

    color += DotNoise2D(uv, .08, .2, .4);


    gl_FragColor = vec4(color, 1.);
}