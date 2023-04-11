// Author: Mary Jiang
// Title:PLURIPOTENT

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

float circle(in vec2 _st, in float _radius){
    vec2 dist = _st;
	return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*1.01),
                         dot(dist,dist)*4.0);
}

vec3 cosPalette( float t , vec3 brightness, vec3 contrast, vec3 osc, vec3 phase)
{
    return brightness + contrast*cos( 6.28318*(osc*t+phase) );
}

void main() { 
    vec2 uv = (gl_FragCoord.xy/u_resolution.xy) - .5;
    uv.x *= u_resolution.x/u_resolution.y;
    
 	vec3 color = vec3(.0);
    color += circle(uv, abs(length(uv)));
    vec3 col = cosPalette(uv.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.33,0.67) );
    color += noise(uv+u_time*0.3)*2.0 * col;
                          


    gl_FragColor = vec4(color, 1.);
}