"""Create an EMPTY artist workbench (guides, cameras, collections), not a finished model.
Run: blender -b --factory-startup --python-exit-code 1 -P scripts/modeling/create-sedan-studio.py -- VEH_CIVIC /path/to/sedan-studio.blend
Guide units match From Zero gameplay, not OEM engineering dimensions.
"""
import sys, pathlib, math, json
import bpy
from mathutils import Vector

def main():
    args=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
    if len(args)!=2: raise ValueError('Supply VEH_CIVIC, VEH_K3, VEH_K5 or VEH_VIOS and output .blend path')
    config=json.loads((pathlib.Path(__file__).resolve().parents[2]/'docs/modeling/sedan-studios.json').read_text(encoding='utf-8'))[args[0]]
    prefix=config['prefix']
    output=pathlib.Path(args[1]).resolve()
    if output.suffix.lower()!='.blend' or output.exists(): raise ValueError('New .blend output only; refusing overwrite')
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene=bpy.context.scene; scene.unit_settings.system='METRIC'; scene.unit_settings.scale_length=1
    def collection(name):
        c=bpy.data.collections.new(name);scene.collection.children.link(c);return c
    guides=collection('FZ_GUIDES_NOT_EXPORT'); master=collection(f'{prefix}_MASTER'); lods=[collection(f'{prefix}_LOD{i}') for i in range(3)]
    w,d,h=config['w'],config['d'],config['h']
    def empty(name,loc,display='PLAIN_AXES',size=.12):
        o=bpy.data.objects.new(name,None); guides.objects.link(o);o.location=loc;o.empty_display_type=display;o.empty_display_size=size;o.hide_render=True;return o
    for x in (-1,1):
        for z in (-1,1): empty(f'WHEEL_{x:+d}_{z:+d}',(x*w*.46,-z*d*.32,.28),'SPHERE',.08)
    for name,location in [('FRONT_BUMPER',(0,-d/2,0)),('REAR_BUMPER',(0,d/2,0)),('LEFT_EDGE',(-w/2,0,0)),('RIGHT_EDGE',(w/2,0,0)),('ROOF',(0,0,h)),('GROUND',(0,0,0))]:empty(name,location)
    def camera(name,loc,ortho):
        cam=bpy.data.cameras.new(name);o=bpy.data.objects.new(name,cam);guides.objects.link(o);o.location=loc;o.rotation_euler=(Vector((0,0,h*.5))-o.location).to_track_quat('-Z','Y').to_euler();cam.type='ORTHO';cam.ortho_scale=ortho;return o
    scene.camera=camera('FRONT',(0,-6,h*.5),2.0);camera('REAR',(0,6,h*.5),2.0);camera('SIDE',(6,0,h*.5),3.5);camera('THREE_QUARTER',(4,-5,2.5),3.6)
    scene.render.resolution_x=1200;scene.render.resolution_y=800;scene.render.resolution_percentage=100
    scene['fz_note']='Empty modeling guide only. Add lawful photo references, sculpt master, retopologize each LOD. No finished car mesh.'
    output.parent.mkdir(parents=True,exist_ok=True);bpy.ops.wm.save_as_mainfile(filepath=str(output)); print('Created empty sedan artist studio:',output)
if __name__=='__main__':main()
