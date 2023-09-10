import React, {FC, useState} from 'react'
import { createTreeNode, getTreeNode } from '../http/treeAPI';

interface TaskCreateNode {
    show: boolean;
    onHide: (data: boolean) => void;
    id: string;
    onUpdateData: () =>  void;
}

const CreateNode: FC<TaskCreateNode> = ({show, onHide, id, onUpdateData}: TaskCreateNode) => {
    const [value, setValue] = useState("");

    const addNode = async () => {
        await createTreeNode(id, value).then(data => {
            setValue('');
            onHide(false);
        });
        onUpdateData()
    }
    return (
        <>
            {show &&
                  <div className="modal"
                  onClick={(event) => {
                    event.stopPropagation()
                  }}
                  >
                  <div className="modal__content">
                      <div className="modal__title">add Node</div>
                      <form action="/" method="post">
                          <input
                              className="form__cont"
                              type="text"
                              placeholder="type Node"
                              value={value}
                              onChange={e => setValue(e.target.value)}></input>
                      </form>

                      <div className="modal__buttons">
                          <div className="modal__btn modal__add"
                              onClick={() => onHide(false)}>
                              close
                          </div>
                          <div className="modal__btn modal__close"
                              onClick={addNode}>add</div>
                      </div>
                  </div>
              </div>   
            }
        </>
    )
}

export default CreateNode