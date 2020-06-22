import { LayaGL } from "../../layagl/LayaGL";
import { Render } from "../../renders/Render";
import { ISingletonElement } from "../../resource/ISingletonElement";
import { Stat } from "../../utils/Stat";
import { SimpleSingletonList } from "../component/SimpleSingletonList";
import { SingletonList } from "../component/SingletonList";
import { Camera } from "../core/Camera";
import { PixelLineSprite3D } from "../core/pixelLine/PixelLineSprite3D";
import { BaseRender } from "../core/render/BaseRender";
import { RenderContext3D } from "../core/render/RenderContext3D";
import { RenderElement } from "../core/render/RenderElement";
import { RenderQueue } from "../core/render/RenderQueue";
import { BoundsOctree } from "../core/scene/BoundsOctree";
import { Scene3D } from "../core/scene/Scene3D";
import { BoundFrustum } from "../math/BoundFrustum";
import { Color } from "../math/Color";
import { Plane } from "../math/Plane";
import { Vector3 } from "../math/Vector3";
import { Shader3D } from "../shader/Shader3D";
import { Utils3D } from "../utils/Utils3D";
import { DynamicBatchManager } from "./DynamicBatchManager";
import { StaticBatchManager } from "./StaticBatchManager";
import { Bounds } from "../core/Bounds";
import { BoundSphere } from "../math/BoundSphere";


export class CameraCullInfo {
	position: Vector3;

	useOcclusionCulling: Boolean;
	boundFrustum: BoundFrustum;
	cullingMask: number;
}

export class ShadowCullInfo {
	position: Vector3;
	cullPlanes: Plane[];
	cullSphere: BoundSphere;
	cullPlaneCount: number;
	direction: Vector3;
}

/**
 * @internal
 * <code>FrustumCulling</code> 类用于裁剪。
 */
export class FrustumCulling {
	/**@internal */
	private static _tempColor0: Color = new Color();
	/**@internal */
	private static _tempVector0: Vector3 = new Vector3();

	/**@internal */
	static _cameraCullInfo: CameraCullInfo = new CameraCullInfo();
	/**@internal */
	static _shadowCullInfo: ShadowCullInfo = new ShadowCullInfo();

	/**@internal */
	static debugFrustumCulling: boolean = false;

	/**
	 * @internal
	 */
	static __init__(): void {
		if (Render.supportWebGLPlusCulling) {//[NATIVE]
			FrustumCulling._cullingBufferLength = 0;
			FrustumCulling._cullingBuffer = new Float32Array(4096);
		}
	}

	/**
	 * @internal
	 */
	private static _drawTraversalCullingBound(renderList: SingletonList<ISingletonElement>, debugTool: PixelLineSprite3D): void {
		var renders: ISingletonElement[] = renderList.elements;
		for (var i: number = 0, n: number = renderList.length; i < n; i++) {
			var color: Color = FrustumCulling._tempColor0;
			color.r = 0;
			color.g = 1;
			color.b = 0;
			color.a = 1;
			Utils3D._drawBound(debugTool, ((<BaseRender>renders[i])).bounds._getBoundBox(), color);
		}
	}

	/**
	 * @internal
	 */
	private static _traversalCulling(cameraCullInfo: CameraCullInfo, scene: Scene3D, context: RenderContext3D, renderList: SingletonList<ISingletonElement>, customShader: Shader3D, replacementTag: string, isShadowCasterCull: boolean): void {
		var renders: ISingletonElement[] = renderList.elements;
		var boundFrustum: BoundFrustum = cameraCullInfo.boundFrustum;
		var camPos: Vector3 = cameraCullInfo.position;
		var cullMask: number = cameraCullInfo.cullingMask;
		var loopCount: number = Stat.loopCount;
		for (var i: number = 0, n: number = renderList.length; i < n; i++) {
			var render: BaseRender = <BaseRender>renders[i];
			var canPass: boolean;
			if (isShadowCasterCull)
				canPass = render._castShadow && render._enable;
			else
				canPass = ((Math.pow(2, render._owner._layer) & cullMask) != 0) && render._enable;

			if (canPass) {
				Stat.frustumCulling++;
				if (!cameraCullInfo.useOcclusionCulling || render._needRender(boundFrustum, context)) {
					render._renderMark = loopCount;
					render._distanceForSort = Vector3.distance(render.bounds.getCenter(), camPos);//TODO:合并计算浪费,或者合并后取平均值
					var elements: RenderElement[] = render._renderElements;
					for (var j: number = 0, m: number = elements.length; j < m; j++)
						elements[j]._update(scene, context, customShader, replacementTag);
				}
			}
		}
	}

	/**
	 * @internal
	 */
	static renderObjectCulling(cameraCullInfo: CameraCullInfo, scene: Scene3D, context: RenderContext3D, customShader: Shader3D, replacementTag: string, isShadowCasterCull: boolean): void {
		var i: number, n: number;
		var opaqueQueue: RenderQueue = scene._opaqueQueue;
		var transparentQueue: RenderQueue = scene._transparentQueue;
		var renderList: SingletonList<ISingletonElement> = scene._renders;
		opaqueQueue.clear();
		transparentQueue.clear();

		var staticBatchManagers: StaticBatchManager[] = StaticBatchManager._managers;
		for (i = 0, n = staticBatchManagers.length; i < n; i++)
			staticBatchManagers[i]._clear();
		var dynamicBatchManagers: DynamicBatchManager[] = DynamicBatchManager._managers;
		for (i = 0, n = dynamicBatchManagers.length; i < n; i++)
			dynamicBatchManagers[i]._clear();

		var octree: BoundsOctree = scene._octree;
		if (octree) {
			octree.updateMotionObjects();
			octree.shrinkRootIfPossible();
			octree.getCollidingWithFrustum(cameraCullInfo, context, customShader, replacementTag, isShadowCasterCull);
		}
		//else {//包围盒不完善的节点走遍历裁剪
		FrustumCulling._traversalCulling(cameraCullInfo, scene, context, renderList, customShader, replacementTag, isShadowCasterCull);
		//}

		if (FrustumCulling.debugFrustumCulling) {
			var debugTool: PixelLineSprite3D = scene._debugTool;
			debugTool.clear();
			if (octree) {
				octree.drawAllBounds(debugTool);
				octree.drawAllObjects(debugTool);
			}
			//else {//包围盒不完善的节点走遍历裁剪
			FrustumCulling._drawTraversalCullingBound(renderList, debugTool);
			//}
		}

		var count: number = opaqueQueue.elements.length;
		(count > 0) && (opaqueQueue._quickSort(0, count - 1));
		count = transparentQueue.elements.length;
		(count > 0) && (transparentQueue._quickSort(0, count - 1));
	}

	/**
	 * @internal
	 */
	static cullingShadow(cullInfo: ShadowCullInfo, scene: Scene3D, context: RenderContext3D): boolean {
		var opaqueQueue: RenderQueue = scene._opaqueQueue;
		var transparentQueue: RenderQueue = scene._transparentQueue;
		var renderList: SingletonList<ISingletonElement> = scene._renders;
		opaqueQueue.clear();
		transparentQueue.clear();

		var staticBatchManagers: StaticBatchManager[] = StaticBatchManager._managers;
		for (var i: number = 0, n: number = staticBatchManagers.length; i < n; i++)
			staticBatchManagers[i]._clear();
		var dynamicBatchManagers: DynamicBatchManager[] = DynamicBatchManager._managers;
		for (var i: number = 0, n: number = dynamicBatchManagers.length; i < n; i++)
			dynamicBatchManagers[i]._clear();

		var renderList: SingletonList<ISingletonElement> = scene._renders;
		var position: Vector3 = cullInfo.position;
		var cullPlaneCount: number = cullInfo.cullPlaneCount;
		var cullPlanes: Plane[] = cullInfo.cullPlanes;
		var cullSphere: BoundSphere = cullInfo.cullSphere;
		var direction: Vector3 = cullInfo.direction;
		var renders: ISingletonElement[] = renderList.elements;
		var loopCount: number = Stat.loopCount;
		for (var i: number = 0, n: number = renderList.length; i < n; i++) {
			var render: BaseRender = <BaseRender>renders[i];
			var canPass: boolean = render._castShadow && render._enable;
			if (canPass) {
				Stat.frustumCulling++;
				var bounds: Bounds = render.bounds;
				var min: Vector3 = bounds.getMin();
				var max: Vector3 = bounds.getMax();
				var minX: number = min.x;
				var minY: number = min.y;
				var minZ: number = min.z;
				var maxX: number = max.x;
				var maxY: number = max.y;
				var maxZ: number = max.z;
				//TODO:通过相机裁剪直接pass

				var pass: boolean = true;
				// cull by planes
				// Improve:Maybe use sphre and direction cull can savle the far plane cull
				for (var j: number = 0; j < cullPlaneCount; j++) {
					var plane: Plane = cullPlanes[j];
					var normal: Vector3 = plane.normal;
					if (plane.distance + (normal.x * (normal.x < 0.0 ? minX : maxX)) + (normal.y * (normal.y < 0.0 ? minY : maxY)) + (normal.z * (normal.z < 0.0 ? minZ : maxZ)) < 0.0) {
						pass = false;
						break;
					}
				}

				if (pass) {
					render._renderMark = loopCount;
					render._distanceForSort = Vector3.distance(bounds.getCenter(), position);//TODO:合并计算浪费,或者合并后取平均值
					var elements: RenderElement[] = render._renderElements;
					for (var j: number = 0, m: number = elements.length; j < m; j++)
						elements[j]._update(scene, context, null, null);
				}
			}
		}
		return opaqueQueue.elements.length > 0 ? true : false;
	}


	//---------------------------------------------------------NATIVE---------------------------------------------------------------------------------------------
	/**@internal	[NATIVE]*/
	static _cullingBufferLength: number;
	/**@internal	[NATIVE]*/
	static _cullingBuffer: Float32Array;

	/**
	 * @internal [NATIVE]
	 */
	static renderObjectCullingNative(camera: Camera, scene: Scene3D, context: RenderContext3D, renderList: SimpleSingletonList, customShader: Shader3D, replacementTag: string): void {
		var i: number, n: number, j: number, m: number;
		var opaqueQueue: RenderQueue = scene._opaqueQueue;
		var transparentQueue: RenderQueue = scene._transparentQueue;
		opaqueQueue.clear();
		transparentQueue.clear();

		var staticBatchManagers: StaticBatchManager[] = StaticBatchManager._managers;
		for (i = 0, n = staticBatchManagers.length; i < n; i++)
			staticBatchManagers[i]._clear();
		var dynamicBatchManagers: DynamicBatchManager[] = DynamicBatchManager._managers;
		for (i = 0, n = dynamicBatchManagers.length; i < n; i++)
			dynamicBatchManagers[i]._clear();

		var validCount: number = renderList.length;
		var renders: ISingletonElement[] = renderList.elements;
		for (i = 0; i < validCount; i++) {
			((<BaseRender>renders[i])).bounds;
			(<any>renders[i])._updateForNative && (<any>renders[i])._updateForNative(context);
		}
		var boundFrustum: BoundFrustum = camera.boundFrustum;
		FrustumCulling.cullingNative(camera._boundFrustumBuffer, FrustumCulling._cullingBuffer, scene._cullingBufferIndices, validCount, scene._cullingBufferResult);

		var loopCount: number = Stat.loopCount;
		var camPos: Vector3 = context.camera._transform.position;

		for (i = 0; i < validCount; i++) {
			var render: BaseRender = <BaseRender>renders[i];
			if (!camera.useOcclusionCulling || (camera._isLayerVisible(render._owner._layer) && render._enable && scene._cullingBufferResult[i])) {//TODO:需要剥离部分函数
				render._renderMark = loopCount;
				render._distanceForSort = Vector3.distance(render.bounds.getCenter(), camPos);//TODO:合并计算浪费,或者合并后取平均值
				var elements: RenderElement[] = render._renderElements;
				for (j = 0, m = elements.length; j < m; j++) {
					var element: RenderElement = elements[j];
					element._update(scene, context, customShader, replacementTag);
				}
			}
		}

		var count: number = opaqueQueue.elements.length;
		(count > 0) && (opaqueQueue._quickSort(0, count - 1));
		count = transparentQueue.elements.length;
		(count > 0) && (transparentQueue._quickSort(0, count - 1));
	}

	/**
	 * @internal [NATIVE]
	 */
	static cullingNative(boundFrustumBuffer: Float32Array, cullingBuffer: Float32Array, cullingBufferIndices: Int32Array, cullingCount: number, cullingBufferResult: Int32Array): number {
		return (<any>LayaGL.instance).culling(boundFrustumBuffer, cullingBuffer, cullingBufferIndices, cullingCount, cullingBufferResult);
	}
}

