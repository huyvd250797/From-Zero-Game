"""Run in Blender background mode. Explicit artist-authored LOD collections only.
Blender world: X right, Z up, -Y forward. Exports static evaluated shell geometry.
This does not generate a car from a photo or decimate a model automatically.
"""
import json, sys, pathlib, math
import bpy
from mathutils import Vector

def vec(v):
    return [float(v.x), float(v.z), -float(v.y)]

def main():
    args = sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
    if len(args)!=2: raise ValueError('Usage: blender -b artist.blend --python-exit-code 1 -P export-blender.py -- job.json output-dir')
    spec_path=pathlib.Path(args[0]).resolve(); job=json.loads(spec_path.read_text(encoding='utf8')); out=pathlib.Path(args[1]).resolve(); out.mkdir(parents=True,exist_ok=True)
    if len(job['collections'])!=3 or len(set(job['collections']))!=3: raise ValueError('Three distinct LOD collections required')
    roles={'paint','glass','chrome','trim','head','tail','plate'}; rolemap=job['materialRoles']; deps=bpy.context.evaluated_depsgraph_get()
    lod_files=[]
    for lod,name in enumerate(job['collections']):
        coll=bpy.data.collections.get(name)
        if not coll: raise ValueError('Missing collection '+name)
        groups={}; lookup={}; seen=set()
        for obj in coll.all_objects:
            if obj.type!='MESH': continue
            if obj.name in seen: continue
            seen.add(obj.name)
            if obj.get('fz_exclude_shell',False): continue
            evaluated=obj.evaluated_get(deps); mesh=evaluated.to_mesh(preserve_all_data_layers=True,depsgraph=deps)
            try:
                mesh.calc_loop_triangles(); uv_layer=mesh.uv_layers.active
                if not uv_layer: raise ValueError('Missing UV on '+obj.name)
                world=evaluated.matrix_world; linear=world.to_3x3(); normal_matrix=linear.inverted().transposed(); mirrored=linear.determinant()<0
                for tri in mesh.loop_triangles:
                    mat=mesh.materials[tri.material_index] if tri.material_index<len(mesh.materials) else None
                    role=rolemap.get(mat.name if mat else '')
                    if role not in roles: raise ValueError('Map material '+str(mat.name if mat else None)+' on '+obj.name)
                    g=groups.setdefault(role,{'positions':[],'normals':[],'uv':[],'indices':[]}); cache=lookup.setdefault(role,{})
                    loops=list(tri.loops)
                    if mirrored: loops[1],loops[2]=loops[2],loops[1]
                    for li in loops:
                        loop=mesh.loops[li]; pos=vec(world@mesh.vertices[loop.vertex_index].co)
                        n=vec((normal_matrix@mesh.corner_normals[li].vector).normalized()); uv=uv_layer.data[li].uv; tex=[float(uv.x),1-float(uv.y)]
                        key=tuple(pos+n+tex)
                        if not all(math.isfinite(x) for x in key): raise ValueError('Nonfinite corner')
                        if key not in cache:
                            cache[key]=len(g['positions'])//3;g['positions'].extend(pos);g['normals'].extend(n);g['uv'].extend(tex)
                        g['indices'].append(cache[key])
            finally: evaluated.to_mesh_clear()
        if not groups: raise ValueError('No mesh objects in '+name)
        # Maps must be prepared/baked by the artist to common role atlases and copied into output directory.
        for role,meta in job.get('lodMaterials',[{}, {}, {}])[lod].items():
            if role not in groups: raise ValueError('Material metadata for absent role '+role)
            for k in ('color','maps'):
                if k in meta: groups[role][k]=meta[k]
        filename=f'lod{lod}.json'; (out/filename).write_text(json.dumps({'groups':groups},separators=(',',':')),encoding='utf8'); lod_files.append(filename)
    result={k:job[k] for k in ('id','sourceFrame','wheelCenters','provenance')};result['lods']=lod_files
    (out/'job.json').write_text(json.dumps(result,indent=2),encoding='utf8')
    print('EXTRACTED:',job['id'],'three artist LODs; run vehicle:prepare next')

if __name__=='__main__': main()
