// Author: Mary Jiang
// Title: Moment of clarity

#ifdef GL_ES
precision mediump float;
#endif

float PI = 3.1415926;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;



float Circle(vec2 uv, vec2 p, float r, float blur) {
    float d = length(uv-p);
    float c = smoothstep(r, r - blur, d);
    return c;
}



void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

	st -= 0.5;
    st.x *= u_resolution.x/u_resolution.y;
    
    float c = Circle(st, vec2(0,0), 0.3, sin(u_time));
        
    gl_FragColor = vec4(vec3(c), 1.0);


    
}

