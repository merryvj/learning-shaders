// Author: Mary Jiang
// Title: Twinkle

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rand(vec2 uv){
    return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
}

float rand(float n) {
    return fract(sin(n) * 43758.5453123);
}

float circle(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*1.01),
                         dot(dist,dist)*4.0 + rand(_st) * 300. );
}



void main() { 
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv.x *= u_resolution.x/u_resolution.y;
    uv *= 25.0;
    uv = fract(uv);
    
    float t = u_time * .5;
    
    // vec2 translate = vec2(cos(t),sin(t)) * .1;
    // uv += translate*0.000001;
    
 	vec3 color = vec3(.0);
    
    vec3 randomColor = vec3(rand(uv.x) + .5, rand(uv.y) + .5, rand(uv.x) + .5);

    vec3 circle = circle(uv, abs(sin(t)) * .6 + rand(uv)) * randomColor;
    
    color += circle;
    


    gl_FragColor = vec4(color, 1.);
}