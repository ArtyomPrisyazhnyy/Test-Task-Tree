import React, { useCallback, useEffect, useState } from 'react'
import {deleteTreeNode, getTreeNode} from './http/treeAPI'
import CreateNode from './modals/createNode';
import RenameNode from './modals/RenameNode';
import BTN from "./assets/images/BTN.svg"
import ADD from './assets/images/ADD.svg'
import PEN from './assets/images/pen.svg'
import DELETE from './assets/images/delete.svg'

interface TaskNode {
    id: string;
    name: string;
    children?: TaskNode[];
    onUpdateData: () =>  void
}

const Tree: React.FC<TaskNode> = ({id, name, children, onUpdateData}: TaskNode) => {
  
    const [showChildren, setShowChildren] = useState<boolean>(false);
    
    const [addVisible, setAddVisible] = useState<boolean>(false);
    const [renameVisible, setRenameVisible] = useState<boolean>(false)
  
    const handleClick = useCallback(() => {
        setShowChildren(!showChildren);
    }, [showChildren, setShowChildren]);

    const deleteNode = async (nodeId: string) => {
        try{
            await deleteTreeNode(nodeId);
            onUpdateData()
        } catch (e){
            alert("You have to delete all children nodes first")
        }
    }


    return (
        <div  onClick={(event: any) => {
            event.stopPropagation()
        }}>
            <span onClick={handleClick}>
                <div className="nodeLine">
                    {children && children.length > 0 && 
                        <img src={BTN}
                        className="open_btn"
                        style={{ 
                            transform: showChildren ? 'rotate(90deg)' : 'rotate(0deg)' ,
                            transition: 'transform 0.3s ease'
                        }}
                        alt="" />
                    }
                    
                    <h2>{name}</h2>
                    <div 
                        className="btn btn_add"
                        onClick={(event) => {
                            event.stopPropagation();
                            setAddVisible(true)}
                        }
                    >
                      <img src={ADD} alt="ADD" className='btns' />  
                    </div> 
                    <div 
                        className="btn btn_add"
                        onClick={(event) => {
                            event.stopPropagation();
                            setRenameVisible(true)}
                        }
                    >
                        <img src={PEN} alt="rename" className='btns' /> 
                    </div> 
                    <div 
                        className="btn btn_delete" 
                        onClick={(event) => {
                            event.stopPropagation()
                            deleteNode(id)
                        }}>
                        <img src={DELETE} alt="delete" className='btns' /> 
                    </div>
                </div>
                
                <div key={id} style={{ position: 'relative', display: 'flex', flexDirection: 'column', left: 25, borderLeft: '1px solid', paddingLeft: 15 }}>
                    {showChildren && (children ?? []).map((node: TaskNode) => <Tree key={node.id} {...node} onUpdateData={onUpdateData}/>)}
                </div>
            </span>
            <CreateNode
                show={addVisible}
                onHide={() => setAddVisible(false)}
                id={id}
                onUpdateData={onUpdateData} />
            <RenameNode
                show={renameVisible}
                onHide={() => setRenameVisible(false)}
                id={id}
                oldName={name}
                onUpdateData={onUpdateData}
                 />
        </div>
  )
}
const App = () => {
    const [node, setNode] = useState<any>(null);

    function updateData() {
        getTreeNode()
        .then(data => {
        setNode(data.data)
        })
    }

    useEffect(() => {
        updateData()
    }, [])
  
    return (
        <div>
            <Tree {...node} onUpdateData={updateData} />
        </div>
    )
}

export default App