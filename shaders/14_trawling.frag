// Author: Mary Jiang
// Title: Trawling

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float distLine(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p-a;
    vec2 ba = b-a;
    float t = clamp(dot(pa, ba) / dot(ba, ba), 0., 1.);
    return length(pa - ba*t);
}

float random(in vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

vec2 getPos(vec2 p) {
    vec2 n = random2(p) * u_time * .8;
    return sin(n) * .4;
}

vec3 cosPalette( float t , vec3 brightness, vec3 contrast, vec3 osc, vec3 phase)
{
    return brightness + contrast*cos( 6.28318*(osc*t+phase) );
}

void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv.x *= u_resolution.x/u_resolution.y;
    
    uv *= 6.;
    
    vec2 i_uv = floor(uv);
    vec2 f_uv = fract(uv) - .5;
    vec2 point = getPos(i_uv);
    float d = length(f_uv - point);
    float m = smoothstep(.1 * random(f_uv) + .04 + random(i_uv) * .05 + cos(u_time * .6) * .04, 0., d);
    vec3 glow = cosPalette(uv.x,vec3(0.96,0.61,0.84),vec3(0.69,0.12,0.92),vec3(0.70,0.70,0.79),vec3(0.01,0.65,0.66));
    vec3 color = vec3(m) * glow - vec3(random(i_uv));
    gl_FragColor = vec4(color,1.0);
}