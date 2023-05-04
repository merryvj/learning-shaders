// Author: Mary Jiang
// Title: Affinities

#ifdef GL_ES
precision mediump float;
#endif


uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float distLine(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float t = clamp(dot(pa, ba) / dot(ba, ba), 0., 1.);
    
    return length(pa - ba * t);
}

float N21(vec2 p) {
    p = fract(p*vec2(233.34, 851.73));
    p += dot(p, p+23.45);
    return fract(p.x*p.y);
}

vec2 N22(vec2 p) {
    float n = N21(p);
    return vec2(n, N21(p + n));
}

vec2 getPos(vec2 p, vec2 offset) {
    vec2 n = N22(p + offset) * u_time;
    return offset + sin(n) * .35;
    
}

float line(vec2 p, vec2 a, vec2 b) {
    float d = distLine(p, a, b);
    float m = smoothstep(.03, .001 * abs(sin(u_time + p.x)), d);
    m *= smoothstep(.5, .2, length(a-b));
    
    return m;
}

vec3 cosPalette( float t , vec3 brightness, vec3 contrast, vec3 osc, vec3 phase)
{
    return brightness + contrast*cos( 6.28318*(osc*t+phase) );
}


float layer(vec2 uv) {
    float m = 0.;
    
    vec2 gv = fract(uv) - .5;
    vec2 id = floor(uv);
    float m_dist = 1.;

    for (int y= -1; y <= 1; y++) {
        for (int x= -1; x <= 1; x++) {
            vec2 point = getPos(id, vec2(x, y));
            m += line(gv, getPos(id, vec2(0)), point);
    
        }
    }
    
    return m;
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv.x *= u_resolution.x/u_resolution.y;
    float m = 0.;
    float t = u_time * .02;
    
    uv -= vec2(0.5);
    uv = rotate2d( sin(u_time * .03)*3.14 ) * uv;
    uv += vec2(0.5);

    
    for(float i = 0.; i <= 1.; i+=1./4.) {
        float z = fract(i + t);
        float size = mix(5., 1., z);
        float fade = smoothstep(0., .5, z) * smoothstep(1., .8, z);
        m += layer(uv * size + i*20.) * fade;
    }
    
    vec3 glow = cosPalette(uv.x ,vec3(0.96,0.61,0.84),vec3(0.69,0.12,0.92),vec3(0.70,0.70,0.79),vec3(0.01,0.65,0.66));

    vec3 color = vec3(m) * glow;

    gl_FragColor = vec4(color,1.0);
}