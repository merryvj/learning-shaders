// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(in vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 464758.5452);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f*f*(3.0-2.0*f);
    return mix( mix( random( i + vec2(0.0,0.0) ),
                     random( i + vec2(1.0,0.0) ), u.x),
                mix( random( i + vec2(0.0,1.0) ),
                     random( i + vec2(1.0,1.0) ), u.x), u.y);
}


float t = u_time  * .01 + (u_mouse.y + u_mouse.x)* .0001;
mat2 m = mat2(.8, cos(t), cos(t), .1);

float fbm (vec2 p) {
    float f = 0.0;
    p*=noise(p - u_mouse * .002);
    f += 0.5 * noise(p); p*=m*2.02;
    f += 0.25 * noise(p); p*=m*4.03;
    f += 0.125 * noise(p); p*=m*3.01;
    f += 0.425 * noise(p); p*=m*2.04;
    //f += 0.0625 * noise(p); p*=2.04;
    
    //f /= 0.975;
    return f + u_mouse.x * 0.0001 - u_mouse.y * 0.0001;
    
}
void main() {
    vec2 q = gl_FragCoord.xy/u_resolution.xy;
    vec2 p = -1.0 + 2.0 * q;
    float f = fbm(p * 4.);


    vec3 color = vec3(f) + vec3(.24, .12, .0);

    gl_FragColor = vec4(color,1.0);
}