// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

float PI = 3.1415926;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main()
{
    vec2 normCoord = gl_FragCoord.xy/u_resolution;
    
    vec2 uv = -1. + 2. * normCoord;
    float c = mod(uv.x/uv.y, abs(sin(u_time/2.))) ;
    
    gl_FragColor =  vec4(c * cos(u_time), c * cos(u_time), c, 1.);
 
    
}

