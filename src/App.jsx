// import './App.css'
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import ReactFlow, { Controls, Background, applyEdgeChanges, applyNodeChanges, useNodes, useNodesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import { CustomNode } from './components/CustomNode';
import { MdOutlineRectangle } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import { PiRectangleLight } from "react-icons/pi";
import { GiCircle } from "react-icons/gi";
import { Navbar } from './components/Navbar';
import { Toaster } from 'react-hot-toast';

const initNodes = [
  {
    id: '1',
    data: { label: 'Node 1' },
    position: { x: 150, y: 0 },
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 500, y: 150 },
  },

];

const initEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
];

export const CIRCLE = 'CIRCLE';
export const RECTANGLE = 'RECTANGLE';

const nodeTypes = {
  clickableNode: CustomNode
}

export const NodeCtx = createContext(null);


function App() {

  const [nodes, setNodes] = useState([]);
  // const [edges, setEdges] = useState(initEdges);
  const [edges, setEdges] = useState([]);
  const [shape, setShape] = useState(RECTANGLE);

  const nodeId = useRef(1);

  const createNode = () => {
    console.log(nodeId.current, nodeId, ' ref')
    const newNode = {
      id: `${nodeId.current}`,
      data: { shape: shape, label: nodeId.current },
      position: { x: 100, y: 100 },
      type: 'clickableNode',
      shape: 'circle',
    };

    nodeId.current = nodeId.current + 1;
    setNodes(prev => ([...prev, newNode]))
  }

  console.log(nodes, " nodes", edges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes) => { console.log(changes, "changes"); setEdges((eds) => applyEdgeChanges(changes, eds)) },
    [],
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onNodeDelete = (nodeId) => {
    setElements((prevElements) => removeElements([{ id: nodeId }], prevElements));
  };

  return (
    <NodeCtx.Provider value={{nodes, edges, setNodes, setEdges}}>
      <div className='min-h-screen min-w-screen '>
        <Navbar />
        <div className='flex justify-around items-center gap-2 p-2 mt-16'>
          <div className=''>
            <button className='bg-slate-600 text-slate-200 rounded-sm p-2 hover:bg-slate-500 active:shadow-inner shadow-slate-600 shadow-md active:scale-95 transition-all duration-200'
              onClick={createNode}
            >
              Create Node
            </button>

            <div className='flex flex-col justify-center items-center gap-2 mt-8'>
              <div className='flex justify-center items-center gap-8 '>
                <button className='p-2 shadow-xl rounded-sm bg-slate-400 hover:bg-slate-500 focus:bg-slate-500 transition-all focus:shadow-2xl focus:scale-110 focus:font-extrabold'>
                  <GiCircle onClick={() => setShape(CIRCLE)} className='text-md text-white' />
                </button>
                <button className='p-[6px] shadow-xl rounded-sm bg-slate-400 hover:bg-slate-500 focus:bg-slate-500 transition-all focus:scale-110 focus:font-extrabold'>
                  <PiRectangleLight onClick={() => setShape(RECTANGLE)} className='text-xl text-white' />
                </button>
              </div>
              <label className='text-sm'>Select Shape</label>
            </div>

          </div>

          <div style={{ width: '70vw', height: '70vh' }} className='border-2 rounded-md w-7/8'>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              // fitView={true}
              onNodesChange={(e) => { console.log("chnaging ------------", e); onNodesChange(e) }}
              onEdgesChange={(e) => { console.log(e, " edging------"); onEdgesChange(e) }}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </div>
        <Toaster position='bottom-right' />
      </div>
    </NodeCtx.Provider>
  )
}

export default App
