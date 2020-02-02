import * as SAT from 'sat';

/** 弧度转化为向量 */
export function angleToVector(angle: number) {
    return new SAT.Vector(Math.cos(angle), Math.sin(angle));
}
/** 弧度转化为向量 */
export function degreeToVector(degree: number) {
    const angle = (degree * Math.PI) / 180;
    return {
        x: Math.cos(angle),
        y: Math.sin(angle),
    };
}
/** 向量转化为弧度 */
export function vectorToAngle(vector: Point) {
    return Math.atan2(vector.y, vector.x);
}
/** 弧度转化为角度 */
export function angleToDegree(angle: number) {
    return (angle * 180) / Math.PI;
}
/** 向量转化为角度 */
export function vectorToDegree(vector: Point) {
    const angle = vectorToAngle(vector);
    const degree = angleToDegree(angle);
    return degree;
}
/** 角度转化为弧度 */
export function degreeToAngle(degrees: number) {
    return (degrees * Math.PI) / 180;
}
/** 将时间秒转化为帧, 一秒 = 60帧 */
export function timeToFrame(time: number) {
    return Math.ceil(time * 60);
}
/** 将帧 -->秒, 一秒 = 60帧 */
export function frameToTime(frame: number) {
    return Math.ceil(frame / 60);
}
