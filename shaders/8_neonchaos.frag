// Author: Mary Jiang
// Title: Big fan

#ifdef GL_ES
precision mediump float;
#endif

float PI = 3.1415926;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float random (in float x) {
    return fract(sin(x)*1e4);
}

float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

void main()
{
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv *= 100.;
    
    vec2 ipos = floor(u_mouse + uv);
    
    float t = u_time;
    vec3 color = vec3(0.);
    color.r = random(ipos * u_mouse.x);
    color.g = random(ipos) + u_mouse.y/u_resolution.y;
    color.b = random(ipos) + u_mouse.x/u_resolution.x;
    
    gl_FragColor = vec4(color, 1.0);
    
 
    
}

