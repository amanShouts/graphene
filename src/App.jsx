// import './App.css'
import { createContext, useCallback, useRef, useState } from 'react';
import ReactFlow, { Controls, Background, applyEdgeChanges, applyNodeChanges, addEdge, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { CustomNode } from './components/CustomNode';
import { PiRectangleLight } from "react-icons/pi";
import { GiCircle } from "react-icons/gi";
import { Navbar } from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import CustomEdge from './components/CustomEdge';

export const CIRCLE = 'CIRCLE';
export const RECTANGLE = 'RECTANGLE';

const nodeTypes = {
  clickableNode: CustomNode
}

const edgeTypes = {
  customEdge: CustomEdge
}

export const NodeCtx = createContext(null);


function App() {

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  // const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [shape, setShape] = useState(RECTANGLE);

  const nodeId = useRef(1);

  const createNode = () => {
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

  // console.log(nodes, " nodes", edges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes) => { setEdges((eds) => applyEdgeChanges(changes, eds)) },
    [],
  );

  const onConnect = useCallback(
    (params) => { setEdges((eds) => addEdge({...params, type : 'customEdge'}, eds))},
    [],
  );

  return (
    <>    <NodeCtx.Provider value={{ nodes, edges, setNodes, setEdges }}>
      <div className='min-h-screen min-w-screen '>
        <Navbar />
        <div className='flex justify-around items-center gap-2 p-2 mt-16'>
          <div className=''>
            <button className='hover:bg-slate-400 rounded-sm p-2 bg-slate-300 text-slate-700 active:shadow-inner shadow-slate-600 shadow-md active:scale-95 transition-all duration-100'
              onClick={createNode}
            >
              Create Node
            </button>

            <div className='flex flex-col justify-center items-center gap-2 mt-8'>
              <div className='flex justify-center items-center gap-8 '>
                <button className={`p-2 rounded-sm bg-slate-400 hover:bg-slate-500 transition-all duration-400 ${shape == CIRCLE ? 'bg-slate-500 scale-110 font-extrabold shadow-md shadow-slate-800/30 ' : '' } `}>
                  <GiCircle onClick={() => setShape(CIRCLE)} className='text-md text-white' />
                </button>
                <button className={`p-[6px] rounded-sm bg-slate-400 transition-all duration-400 hover:bg-slate-500 ${shape == RECTANGLE ? 'bg-slate-500 scale-110 font-extrabold shadow-md shadow-slate-800/30' : '' } `}>
                  <PiRectangleLight onClick={() => setShape(RECTANGLE)} className='text-xl text-white' />
                </button>
              </div>
              <hr className='w-full border-[1px] border-slate-200'></hr>
              <label className='text-sm'>Select Shape</label>
            </div>

          </div>

          <div style={{ width: '70vw', height: '70vh' }} className='border-2 rounded-md w-7/8'>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              // fitView={true}
              onNodesChange={(e) => { onNodesChange(e) }}
              onEdgesChange={(e) => { onEdgesChange(e) }}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              attributionPosition="top-right"
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </div>
        <Toaster position='bottom-right' />
      </div>
    </NodeCtx.Provider>
    </>

  )
}

export default App
