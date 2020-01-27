import { Scene3D } from "./laya/d3/core/scene/Scene3D";
import { MeshRenderDynamicBatchManager } from "./laya/d3/graphics/MeshRenderDynamicBatchManager";
import { MeshRenderStaticBatchManager } from "./laya/d3/graphics/MeshRenderStaticBatchManager";
import { SubMeshDynamicBatch } from "./laya/d3/graphics/SubMeshDynamicBatch";
import { Matrix4x4 } from "./laya/d3/math/Matrix4x4";
import { Shader3D } from "./laya/d3/shader/Shader3D";
import { Laya3D } from "./Laya3D";

/**
 * @internal
 * 使用全局类的时候，避免引用其他模块
 */
export class ILaya3D {
    static Shader3D: typeof Shader3D = null;
    static Scene3D: typeof Scene3D = null;
    static MeshRenderStaticBatchManager: typeof MeshRenderStaticBatchManager = null;
    static MeshRenderDynamicBatchManager: typeof MeshRenderDynamicBatchManager = null;
    static SubMeshDynamicBatch: typeof SubMeshDynamicBatch = null;
    static Laya3D: typeof Laya3D = null;
    static Matrix4x4: typeof Matrix4x4 = null;
}
