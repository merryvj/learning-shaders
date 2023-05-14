// Author: Mary Jiang
// Title: Barber

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float light(vec2 uv, float r) {
    return 1. - smoothstep(r, r + 0.01, length(uv));
}

void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy - 0.5;
    uv.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.);    
    float t = u_time * 0.5;
    
    
    for (int i = 0; i < 80; i++) {
        float r = 0.3;
        float rad = radians(360./80.) * float(i);
        float m = light(uv + vec2(r * cos(rad * 3. + sin(t * 1.2)), r * sin(rad + t )), 0.005);
        color += m;
                       
    }

    gl_FragColor = vec4(color,1.0);
}