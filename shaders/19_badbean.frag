// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float random(in vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}


float bean(vec2 uv, float radius, float index) {
    uv -= vec2(0.5);
    uv *= rotate2d(sin(u_time + index) + index * 2. + dot(u_mouse.x, u_mouse.y) * .00001);
    radius *= cos(atan(uv.x, uv.y * 2.) * .65);
    float m = smoothstep(radius, radius + 0.01, length(uv));
    return m;
}

vec2 tile (vec2 _st, float _zoom) {
    _st *= _zoom;
    return fract(_st);
}

float getIndexGrid(vec2 _st, float numCells){
    float grid = floor(_st.y * numCells) * 1.0/numCells;
    grid += floor(_st.x * numCells) * 1.0/numCells * 1.0/numCells;
    return grid;
}

//from http://thornebrandt.com/blog/bookofshaders_index
void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv.x *= u_resolution.x/u_resolution.y;

    float numCells = 11.2;
    float index = getIndexGrid(uv, numCells);
    uv = tile(uv,numCells);
    

    vec3 color = vec3(1.0 - index, 0.7, 0.2+(index* 0.1)) + bean(uv, 0.3, index);

    gl_FragColor = vec4(color,1.0);
}