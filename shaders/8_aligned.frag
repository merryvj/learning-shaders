// Author: Mary Jiang
// Title: Aligned

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv -= vec2(0.5);
    vec3 color = vec3(0.);    
    float t = u_time * 0.5;
    
    //st *= mat2(length(st) + sin(t), 1., 0.0, length(st) + sin(t));
    uv *= mat2(sin(t), 1., 0.0, sin(t));
    
    for (int i = 0; i < 20; i++) {
        float r = 0.35;
        float rad = radians(360./20.) * float(i);
        color += 0.005/length(uv + vec2(r * cos(rad + t), r * sin(rad * 4.)));
        float tint = clamp(float(i), 0.1, 1.);
    }
    

    gl_FragColor = vec4(color,1.0);
}