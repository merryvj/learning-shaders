#ifdef GL_ES
precision mediump float;
#endif

float PI = 3.1415926;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;




float Band(float t, float start, float end, float blur) {
    float step1 = smoothstep(start-blur, start+blur, t);
    float step2 = smoothstep(end+blur, end-blur, t);
    return step1*step2;
}

float Rect(vec2 uv, float left, float right, float bottom, float top, float blur) {
    float band1 = Band(uv.x, left, right, blur);
    float band2 = Band(uv.y, bottom, top, blur);
    return band1*band2;
}


void main()
{
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv -= .5;
    uv.x *= u_resolution.x/u_resolution.y;
    vec3 col = vec3(0.);
    
    float x = uv.x;
    
    float m = (sin(u_time + x*1.)*sin(u_time + x*15.)) * .08;
    float y = uv.y - m;
    
    
    float mask = Rect(vec2(x,y), -1., 1., -.01, .01, 0.01);
    col = vec3(1.,1.,1.)*mask;
    
    gl_FragColor = vec4(col, 1.);
 
    
}

