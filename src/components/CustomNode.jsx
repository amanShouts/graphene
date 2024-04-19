import { useCallback, useContext, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { CIRCLE, NodeCtx } from '../App';
import { RxCross2 } from "react-icons/rx";
import { IoIosSave } from "react-icons/io";
import { SiGrapheneos } from "react-icons/si";
import toast from 'react-hot-toast';

export function CustomNode({ data }) {

  const [showPopup, setShowPopup] = useState(false);
  const [showCancelBtn, setShowCancelBtn] = useState(false);
  const [nodeName, setNodeName] = useState('');
  const [showNodename, setShowNodename] = useState(false);

  const {nodes, edges, setNodes, setEdges}= useContext(NodeCtx);

  console.log(nodes, edges, " from copntext");
  const handlePopup = () => {
    setShowPopup(true);
  }

  const handleSave = (e) => {
    e.stopPropagation();
    if (nodeName.trim() == '') {
      toast('Node name cannot be blank!');
      return;
    }
    setShowNodename(true);
    setShowPopup(false);
  }

  const handleCancel = (e) => {
    e.stopPropagation();
    setNodeName('');
    setShowPopup(false);
  }

  const handleNodeRemove = (e) => {
    console.log("inside node removeeeeeeeeeeeeeeeeeeeee XXXXXXXXXXXXXXXXXXXXXXXXX")
    e.stopPropagation()
    
    const id = data.label;
    console.log(id , " iddddddd", nodes);
    const updatedNodes =  nodes.filter((node) => {
      return node.id != id;
    })
    console.log(updatedNodes , " updates nodes")

    setNodes(prev => updatedNodes)
  }

  return (
    <>
      <Handle type="target" id="a" position={Position.Top} />

      <div onClick={handlePopup} className='relative flex justify-center items-center bg-slate-200 text-slate-600 p-2 rounded-sm border-[1px] border-slate-700 text-center min-w-12 min-h-12'
        style={data.shape === CIRCLE ? { borderRadius: '50%' } : {}}
        onMouseEnter={() => setShowCancelBtn(true)}
        onMouseLeave={() => setShowCancelBtn(false)}
      >
        <label htmlFor="text" > 
          <SiGrapheneos />
        </label>
        <div className={`flex flex-col justify-center items-center gap-2 absolute -top-8 left-14 p-4 rounded-sm bg-slate-200 text-slate-700 border-[1px] border-slate-500 shadow-md transition-all ${showPopup ? 'block' : 'hidden'}`}
          onMouseEnter={(e) => { e.stopPropagation() }}
          onMouseLeave={(e) => { e.stopPropagation() }}
          onMouseOver={(e) => { e.stopPropagation() }}
        >
          <input type='text' placeholder='add a name' value={nodeName} onChange={(e) => setNodeName(e.target.value)} />
          <hr className='text-lg border-[1px] w-full  border-slate-500'></hr>
          <div className='w-full flex justify-between items-center gap-2'>
            <button className=' bg-slate-200 text-slate-700 rounded-sm  text-center hover:bg-slate-300 transition-all duration-200' onClick={handleCancel}>
              <RxCross2 className='text-xl' />
            </button>
            <button className=' bg-slate-200 text-slate-700 rounded-sm text-center hover:bg-slate-300 transition-all duration-200' onClick={handleSave}>
              <IoIosSave className='text-xl' />
            </button>
          </div>
        </div>
        <div className='absolute top-10 -left-[4rem] underline text-sm bg-slat3-200 text-slate-600 min-w-16 max-w-20 break-words text-right'>
          {nodeName}
        </div>
        <button className={`p-1 flex justify-center items-center rounded-sm bg-red-400 text-slate-600 absolute -top-3 -left-4 transition-all duration-2000 text-lg font-semibold ${showCancelBtn ? 'block' : 'hidden'}`}
          onClick={handleNodeRemove}
        >
          <RxCross2 className='hover:rotate-90 transition-all text-slate-100 duration-300' />
        </button>
      </div>
      {/* <Handle type="source" position={Position.Bottom} id="a" /> */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
      // style={handleStyle}
      />
    </>
  );
}