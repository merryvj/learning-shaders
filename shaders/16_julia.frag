
//Julia set implementation from kythie's https://www.shadertoy.com/view/NdSGRG

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define ITR 32
#define PI 3.14

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;



float t = u_time;
float julia(vec2 uv){
	int j = 0;
    
    for(int i = 0; i < ITR; i++) {
        j++;
		vec2 c=vec2(sin(t),cos(t));
		vec2 d=vec2(t*0.0002,0.);
		uv=vec2(uv.x*uv.x-uv.y*uv.y,2.0*uv.x*uv.y)+c+d;
		if(length(uv)>float(ITR)){
			break;
		}
    }
    
	return float(j)/float(ITR);
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}


void main() {
    vec2 uv = (2.0*gl_FragCoord.xy-u_resolution.xy)/u_resolution.y;
    //uv.x *= u_resolution.x/u_resolution.y;
    

    uv = rotate2d(360.) * uv;
    uv = scale(vec2(2. - sin(t))) * uv;

    vec3 color = vec3(julia(uv));

    gl_FragColor = vec4(color,1.0);
}