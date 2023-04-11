// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;



float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.1),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.1),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}

float cross(in vec2 _st, float _size){
    return  box(_st, vec2(_size,_size/4.)) +
            box(_st, vec2(_size/4.,_size));
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

void main() {
    vec2 uv = (gl_FragCoord.xy/u_resolution.xy) - .5;
    uv.x *= u_resolution.x/u_resolution.y;
    //uv = tile(uv,15.);
    vec3 color = vec3(0.);
    uv = rotate2d(sin(u_time + uv.x)*PI ) * uv;
    uv += vec2(0.5);
    color += cross(uv, .6);

    gl_FragColor = vec4(color,1.0);
}