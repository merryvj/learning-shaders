// Author: Mary Jiang
// Title: Meandering

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


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


float shape(vec2 st, float radius) {
        float r = length(st) + sin(atan(st.x, st.y) * 10.) * .01;
    r += noise(st * 10. + u_time * .1) * .1;
    return 1. - smoothstep(radius, radius + 0.001, r);
    
}

float shapeOutline(vec2 st, float radius, float width) {
    return shape(st, radius) - shape(st, radius-width);
}
void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv -= vec2(0.5);
    uv.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(1.) * shapeOutline(uv, 0.3, .005);
    
    gl_FragColor = vec4(color,1.0);
}