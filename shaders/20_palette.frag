// Author: Mary Jiang
// Title: Waterwheel

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

mat2 m = mat2(.8, .6, -.6, .8);

float fbm (vec2 p) {
    float f = 0.0;
    f += 0.5 * noise(p); p*=m*2.02;
    f += 0.25 * noise(p); p*=m*2.03;
    f += 0.125 * noise(p); p*=m*2.01;
    f += 0.0625 * noise(p); p*=2.04;
    
    f /= 0.975;
    return f;
    
}

vec3 cosPalette( float t , vec3 brightness, vec3 contrast, vec3 osc, vec3 phase)
{
    return brightness + contrast*cos( 6.28318*(osc*t+phase) );
}


vec3 hsv2rgb(vec3 c) {
  vec3 rgb = clamp(abs(mod(c.x*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.);
  rgb = rgb * rgb * (3. - 2. * rgb);
  return c.z * mix(vec3(1.), rgb, c.y);
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    //st.x *= u_resolution.x/u_resolution.y;
    st -= vec2(0.5);
    vec2 pq = vec2(atan(st.x, st.y) / 6.28 + .5, length(st));
    float a = atan(st.x, st.y);

    a += fbm(10. * st) * dot(u_mouse.x, u_mouse.y) * 0.0000005;
    
    vec3 rainbow = hsv2rgb(vec3(pq.x + u_mouse.x * 0.0001 + u_time * 0.01, 1., 1.));
    float f = fbm(vec2(1. + u_time * 0.2, a * 10.));
    vec3 color = vec3(1.);
    color = mix(vec3(f), rainbow, length(st));


    gl_FragColor = vec4(color,1.0);
}