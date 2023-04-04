// Author: Mary Jiang
// Title: Stars to stars

#ifdef GL_ES
precision mediump float;
#endif

float PI = 3.1415926;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main()
{
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy)/u_resolution.y;

    vec3 col = vec3(0);
    
    vec2 gv = fract(uv*5.);

    
    float m = 0.;
    float t = u_time * 1.5;
    float dist = length(uv) * 2.;
    
    for (float y = -1.; y <= 1.; y++){
        for (float x = -1.; x <= 1.; x++) {
        
            vec2 offset = vec2(x,y);
        
            float d = length(gv + offset);
            
            float r = mix(.3, .5, sin(t + dist) * 2. + .5);
            m += smoothstep(r, r * .9, d);
    
        } 
    }
    
    
    col += m;
    
    gl_FragColor = vec4(col,1.0);
 
    
}

