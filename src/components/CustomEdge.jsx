import React, { useContext } from 'react';
import 'reactflow/dist/style.css';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
} from 'reactflow';
import { NodeCtx } from '../App';

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const { setEdges } = useContext(NodeCtx);
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = (e) => {
    e.stopPropagation();
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // backgroundColor : 'red',
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: 'all',
          }}
          className=""
        >
          <button className="bg-slate-300 text-slate-600 rounded-[50%] w-8 h-8 hover:w-9 hover:h-9 transition-all duration-300 text-md font-semibold flex justify-center items-center" onClick={onEdgeClick}>
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
