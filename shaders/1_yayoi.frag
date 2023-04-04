// Author: Mary Jiang
// Title: Yayoi-inspired

#ifdef GL_ES
precision mediump float;
#endif

#define RADIUS 300.0

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    vec2 center = vec2(u_resolution.x / 2.0, u_resolution.y / 2.0);
    
    vec3 colorA = vec3(0.912,0.008,0.052);
	vec3 colorB = vec3(1.000,0.753,0.010);
    
    float pct = abs(sin(u_time));
    vec3 colorAB = mix(colorA, colorB, pct);
    
    if (length(gl_FragCoord.xy - center) < RADIUS * abs(sin(u_time))) {
        gl_FragColor = vec4(0.0);
    } else {
        gl_FragColor = vec4(colorAB, 1.0);
    }
  
}

